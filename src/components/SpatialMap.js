'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fetchAuditLog } from '@/lib/dataFetcher';
import { BILINGUAL_CONTENT, SHEET_COLUMNS } from '@/lib/constants';
import { MapSkeleton } from './LoadingState';

export default function SpatialMap({ language = 'en' }) {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  
  const content = BILINGUAL_CONTENT[language].spatialMap;

  // Load Leaflet library
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ Leaflet loaded successfully');
        setLeafletLoaded(true);
      };
      document.head.appendChild(script);
    } else if (window.L) {
      setLeafletLoaded(true);
    }
  }, []);

  // Load map data
  useEffect(() => {
    loadMapData();
    const interval = setInterval(loadMapData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (leafletLoaded && mapData.length > 0 && !mapInstanceRef.current && mapRef.current) {
      initializeMap();
    } else if (mapInstanceRef.current && mapData.length > 0) {
      updateMarkers();
    }
  }, [leafletLoaded, mapData]);

  const loadMapData = async () => {
    try {
      setError(null);
      console.log('🗺️ Loading audit data for map...');
      const auditData = await fetchAuditLog();
      
      // Process and load GeoJSON to get coordinates
      const response = await fetch('/tamil_nadu_centers.geojson');
      const geoJson = await response.json();
      
      // Create pincode to coordinates map
      const pincodeCoords = {};
      geoJson.features.forEach(feature => {
        const pincode = feature.properties.pincode;
        const [lng, lat] = feature.geometry.coordinates;
        pincodeCoords[pincode] = { lat, lng, district: feature.properties.district };
      });
      
      console.log(`✅ Loaded ${Object.keys(pincodeCoords).length} pincode coordinates`);
      
      // Match audit data with coordinates
      const processedData = auditData
        .map(entry => {
          const pincode = entry[SHEET_COLUMNS.PINCODE] || entry.Pincode || '';
          const coords = pincodeCoords[pincode];
          
          if (!coords) return null;
          
          return {
            pincode,
            lat: coords.lat,
            lng: coords.lng,
            district: entry[SHEET_COLUMNS.DISTRICT] || entry.District || coords.district,
            status: entry[SHEET_COLUMNS.STATUS] || entry.Status || '',
            priority: parseInt(entry[SHEET_COLUMNS.PRIORITY] || entry.Priority || 0),
            riskScore: parseFloat(entry[SHEET_COLUMNS.RISK_SCORE] || entry.Risk_Score || 0),
            reasoning: entry[SHEET_COLUMNS.REASONING] || entry.Reasoning || '',
            pathway: entry[SHEET_COLUMNS.PATHWAY] || entry.Pathway || '',
            requestId: entry[SHEET_COLUMNS.REQUEST_ID] || entry.Request_ID || '',
            timestamp: entry[SHEET_COLUMNS.TIMESTAMP] || entry.Timestamp || '',
            ackStatus: entry[SHEET_COLUMNS.ACK_STATUS] || entry.Ack_Status || '',
          };
        })
        .filter(item => item !== null);
      
      console.log(`✅ Matched ${processedData.length} centers with coordinates`);
      setMapData(processedData);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error loading map data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const initializeMap = () => {
    if (!window.L || !mapRef.current) return;

    console.log('🗺️ Initializing map with', mapData.length, 'markers');
    
    const map = window.L.map(mapRef.current, {
      center: [11.1271, 78.6569],
      zoom: 7,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    mapInstanceRef.current = map;
    markersLayerRef.current = window.L.layerGroup().addTo(map);
    
    updateMarkers();
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();
    console.log('📍 Adding', mapData.length, 'markers to map');

    mapData.forEach((data, index) => {
      const { lat, lng, pincode, district, riskScore, priority, status, reasoning, pathway, requestId, ackStatus } = data;
      
      const color = getMarkerColor(riskScore);
      const size = 20 + (priority * 4); // Size based on priority
      
      const icon = window.L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="width:${size}px;height:${size}px;background-color:${color};border:3px solid white;border-radius:50%;box-shadow:0 3px 10px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-weight:bold;color:white;font-size:11px;cursor:pointer;">
            P${priority}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = window.L.marker([lat, lng], { icon });
      
      const isVerified = ackStatus.toLowerCase().includes('acknowledged');
      const popupHTML = createPopupHTML(district, pincode, requestId, color, riskScore, priority, status, reasoning, pathway, isVerified);

      marker.bindPopup(popupHTML, {
        maxWidth: 380,
        className: 'custom-popup'
      });

      marker.addTo(markersLayerRef.current);
    });

    console.log(`✅ Successfully added ${mapData.length} markers`);
  };

  const createPopupHTML = (district, pincode, requestId, color, riskScore, priority, status, reasoning, pathway, isVerified) => {
    const vBg = isVerified ? '#D1FAE5' : '#FEE2E2';
    const vColor = isVerified ? '#065F46' : '#991B1B';
    const vText = isVerified ? '✓ VERIFIED' : '⏳ PENDING';
    const reasonShort = reasoning.length > 150 ? reasoning.substring(0, 150) + '...' : reasoning;
    const pathShort = pathway.length > 150 ? pathway.substring(0, 150) + '...' : pathway;
    
    const header = '<div style="font-family:Inter;min-width:280px;"><div style="background:linear-gradient(135deg,#F97316,#EA580C);color:white;padding:12px;margin:-10px -10px 10px;border-radius:8px 8px 0 0;"><h3 style="margin:0;font-size:16px;font-weight:bold;">' + district + '</h3><p style="margin:4px 0 0;font-size:12px;">📍 ' + pincode + ' | 🆔 ' + requestId + '</p></div>';
    const scores = '<div style="padding:8px;"><div style="display:flex;gap:8px;margin-bottom:10px;"><div style="flex:1;text-align:center;background:' + color + '20;padding:8px;border-radius:6px;border:2px solid ' + color + ';"><div style="font-size:24px;font-weight:bold;color:' + color + ';">' + riskScore.toFixed(1) + '</div><div style="font-size:10px;color:#666;">Risk</div></div><div style="flex:1;text-align:center;background:#F9731620;padding:8px;border-radius:6px;border:2px solid #F97316;"><div style="font-size:24px;font-weight:bold;color:#F97316;">P' + priority + '</div><div style="font-size:10px;color:#666;">Priority</div></div></div>';
    const statusBox = '<div style="background:#F3F4F6;padding:8px;border-radius:6px;margin-bottom:8px;"><div style="font-size:9px;color:#666;font-weight:600;">STATUS</div><div style="font-size:12px;font-weight:600;color:#1F2937;">' + status + '</div></div>';
    const reasonBox = '<div style="background:#FEF3C7;padding:8px;border-radius:6px;margin-bottom:8px;"><div style="font-size:9px;color:#92400E;font-weight:600;">⚠️ REASONING</div><div style="font-size:11px;color:#78350F;">' + reasonShort + '</div></div>';
    const actionBox = '<div style="background:#DBEAFE;padding:8px;border-radius:6px;margin-bottom:8px;"><div style="font-size:9px;color:#1E40AF;font-weight:600;">🎯 ACTION</div><div style="font-size:11px;color:#1E3A8A;">' + pathShort + '</div></div>';
    const footer = '<div style="text-align:center;padding:8px;background:#F9FAFB;border-radius:6px;"><span style="background:' + vBg + ';color:' + vColor + ';padding:4px 10px;border-radius:4px;font-size:10px;font-weight:700;">' + vText + '</span></div></div></div>';
    
    return header + scores + statusBox + reasonBox + actionBox + footer;
  };

  const getMarkerColor = (riskScore) => {
    if (riskScore >= 70) return '#EF4444';
    if (riskScore >= 50) return '#F97316';
    if (riskScore >= 30) return '#F59E0B';
    return '#10B981';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-1">Spatial Stress Map</h2>
            <p className="text-orange-100">Geographic distribution of predicted stress levels</p>
          </div>
          <div className="flex items-center gap-3 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold">LIVE MAP</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <MapSkeleton />
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-600 text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-red-700 mb-2">Map Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={loadMapData} className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Retry
            </button>
          </div>
        ) : (
          <>
            <div ref={mapRef} className="w-full h-[600px] rounded-lg border-2 border-gray-300 shadow-lg" style={{ zIndex: 1 }} />

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border-2 border-red-300">
                <div className="w-7 h-7 bg-red-500 rounded-full border-3 border-white shadow-lg"></div>
                <div>
                  <div className="font-bold text-sm text-red-900">Critical</div>
                  <div className="text-xs text-red-700">Risk &ge; 70</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border-2 border-orange-300">
                <div className="w-7 h-7 bg-orange-500 rounded-full border-3 border-white shadow-lg"></div>
                <div>
                  <div className="font-bold text-sm text-orange-900">High</div>
                  <div className="text-xs text-orange-700">Risk 50-69</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-lg border-2 border-amber-300">
                <div className="w-7 h-7 bg-amber-500 rounded-full border-3 border-white shadow-lg"></div>
                <div>
                  <div className="font-bold text-sm text-amber-900">Medium</div>
                  <div className="text-xs text-amber-700">Risk 30-49</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border-2 border-green-300">
                <div className="w-7 h-7 bg-green-500 rounded-full border-3 border-white shadow-lg"></div>
                <div>
                  <div className="font-bold text-sm text-green-900">Low</div>
                  <div className="text-xs text-green-700">{"Risk < 30"}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{mapData.length}</span> centers with stress predictions
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Auto-refresh: 30s</span>
                </div>
                <button onClick={loadMapData} className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                  Refresh Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
