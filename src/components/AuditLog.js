'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAuditLog } from '@/lib/dataFetcher';
import { BILINGUAL_CONTENT, SHEET_COLUMNS } from '@/lib/constants';
import { formatTimestamp, getStatusBadgeColor } from '@/lib/utils';
import { TableSkeleton } from './LoadingState';

export default function AuditLog({ language = 'en' }) {
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const content = BILINGUAL_CONTENT[language].auditLog;

  useEffect(() => {
    loadAuditData();
    const interval = setInterval(loadAuditData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAuditData = async () => {
    try {
      setError(null);
      const data = await fetchAuditLog();
      setAuditData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const p = parseInt(priority) || 0;
    if (p === 5) return 'bg-red-100 text-red-900 border-red-400';
    if (p === 4) return 'bg-orange-100 text-orange-900 border-orange-400';
    if (p === 3) return 'bg-amber-100 text-amber-900 border-amber-400';
    if (p === 2) return 'bg-blue-100 text-blue-900 border-blue-400';
    return 'bg-green-100 text-green-900 border-green-400';
  };

  const getPriorityLabel = (priority) => {
    const p = parseInt(priority) || 0;
    const labels = {
      5: 'EMERGENCY',
      4: 'SATURATED',
      3: 'MISSION',
      2: 'MONITOR',
      1: 'STABLE'
    };
    return labels[p] || 'UNKNOWN';
  };

  return (
    <div className="space-y-6">
      {/* Main Audit Log Card - Full Width */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary-700 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-1">
                Real-Time Intelligence Log
              </h2>
              <p className="text-purple-100">Backend operational metadata stream from ACAS Dhristi engine</p>
            </div>
            <div className="flex items-center gap-3 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold">LIVE BACKEND STREAM</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <TableSkeleton rows={5} />
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-red-600 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-700 mb-2">Connection Error</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={loadAuditData}
                className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Retry Connection
              </button>
            </div>
          ) : auditData.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-lg font-semibold">No audit entries available</p>
            </div>
          ) : (
            <>
              {/* Full-Width Responsive Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
                      <th className="text-left py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        Time
                      </th>
                      <th className="text-left py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        📍 Pincode
                      </th>
                      <th className="text-left py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        District
                      </th>
                      <th className="text-center py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        Priority
                      </th>
                      <th className="text-center py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        Risk
                      </th>
                      <th className="text-left py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        🧠 AI Reasoning
                      </th>
                      <th className="text-left py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        🎯 Action
                      </th>
                      <th className="text-left py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        🆔 Request ID
                      </th>
                      <th className="text-center py-4 px-3 font-heading font-bold text-gray-900 text-xs">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {auditData.map((entry, index) => {
                      const timestamp = entry[SHEET_COLUMNS.TIMESTAMP] || entry.Timestamp || '';
                      const pincode = entry[SHEET_COLUMNS.PINCODE] || entry.Pincode || 'N/A';
                      const district = entry[SHEET_COLUMNS.DISTRICT] || entry.District || 'Unknown';
                      const status = entry[SHEET_COLUMNS.STATUS] || entry.Status || 'N/A';
                      const priority = entry[SHEET_COLUMNS.PRIORITY] || entry.Priority || '0';
                      const reasoning = entry[SHEET_COLUMNS.REASONING] || entry.Reasoning || 'No reasoning provided';
                      const pathway = entry[SHEET_COLUMNS.PATHWAY] || entry.Pathway || 'No pathway specified';
                      const riskScore = entry[SHEET_COLUMNS.RISK_SCORE] || entry.Risk_Score || '0';
                      const requestId = entry[SHEET_COLUMNS.REQUEST_ID] || entry.Request_ID || 'N/A';
                      const ackStatus = entry[SHEET_COLUMNS.ACK_STATUS] || entry.Ack_Status || 'Pending';
                      
                      const isVerified = ackStatus.toLowerCase().includes('acknowledged') || 
                                        ackStatus.toLowerCase().includes('verified');

                      return (
                        <motion.tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-blue-50 transition-all duration-200"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <td className="py-4 px-3 text-xs text-gray-600 font-mono">
                            {formatTimestamp(timestamp)}
                          </td>
                          <td className="py-4 px-3">
                            <span className="font-bold text-sm text-primary bg-blue-50 px-2 py-1 rounded">
                              {pincode}
                            </span>
                          </td>
                          <td className="py-4 px-3">
                            <span className="font-semibold text-sm text-gray-900">{district}</span>
                          </td>
                          <td className="py-4 px-3 text-center">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-extrabold border-2 ${getPriorityColor(priority)}`}>
                              P{priority}
                            </span>
                          </td>
                          <td className="py-4 px-3 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300">
                              <span className="font-black text-base text-orange-900">
                                {parseFloat(riskScore).toFixed(1)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-3 max-w-xs">
                            <div className="text-xs text-gray-800 leading-relaxed bg-amber-50 p-2 rounded border border-amber-200">
                              {reasoning}
                            </div>
                          </td>
                          <td className="py-4 px-3 max-w-xs">
                            <div className="text-xs text-gray-800 leading-relaxed bg-blue-50 p-2 rounded border border-blue-200">
                              {pathway}
                            </div>
                          </td>
                          <td className="py-4 px-3">
                            <span className="font-mono text-xs text-gray-700 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                              {requestId}
                            </span>
                          </td>
                          <td className="py-4 px-3 text-center">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold border-2 ${getStatusBadgeColor(ackStatus)}`}>
                              {isVerified ? '✓' : '⏳'}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer Info */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{auditData.length}</span> intelligence entries from backend log
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Auto-refresh: 30s</span>
                  </div>
                  <button
                    onClick={loadAuditData}
                    className="text-sm font-semibold text-primary hover:text-primary-700 transition-colors"
                  >
                    Refresh Now
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Priority Calculation Explanation Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg border-2 border-blue-200 p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
              ACAS Dhristi Force-Detection Engine
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Multi-factor decision engine analyzing spatial risk index, biometric demand, and demographic patterns to predict operational stress levels
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Priority 5 */}
          <div className="bg-white rounded-lg p-4 border-2 border-red-300 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 bg-red-100 text-red-900 rounded-lg flex items-center justify-center font-black text-lg border-2 border-red-400">
                P5
              </span>
              <div>
                <div className="font-bold text-red-900 text-sm">EMERGENCY</div>
                <div className="text-xs text-red-700">Critical Load</div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Risk Index <strong>{"> 50"}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-600">•</span>
                <span>Bio Demand <strong>{"> 100"}</strong></span>
              </div>
              <div className="mt-3 pt-3 border-t border-red-200">
                <strong className="text-red-900">Action:</strong>
                <p className="mt-1 text-gray-600">Deploy Mobile Vans</p>
              </div>
            </div>
          </div>

          {/* Priority 4 */}
          <div className="bg-white rounded-lg p-4 border-2 border-orange-300 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 bg-orange-100 text-orange-900 rounded-lg flex items-center justify-center font-black text-lg border-2 border-orange-400">
                P4
              </span>
              <div>
                <div className="font-bold text-orange-900 text-sm">SATURATED</div>
                <div className="text-xs text-orange-700">Peak Capacity</div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-orange-600">•</span>
                <span>Risk Index <strong>{"> 30"}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600">•</span>
                <span>OR Bio Demand <strong>{"> 150"}</strong></span>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-200">
                <strong className="text-orange-900">Action:</strong>
                <p className="mt-1 text-gray-600">Activate 2nd Shift</p>
              </div>
            </div>
          </div>

          {/* Priority 3 */}
          <div className="bg-white rounded-lg p-4 border-2 border-amber-300 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 bg-amber-100 text-amber-900 rounded-lg flex items-center justify-center font-black text-lg border-2 border-amber-400">
                P3
              </span>
              <div>
                <div className="font-bold text-amber-900 text-sm">MISSION</div>
                <div className="text-xs text-amber-700">Surge Mode</div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Student Lead <strong>{"> 2.5"}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Demographic Spike</span>
              </div>
              <div className="mt-3 pt-3 border-t border-amber-200">
                <strong className="text-amber-900">Action:</strong>
                <p className="mt-1 text-gray-600">Dedicate Counter #1</p>
              </div>
            </div>
          </div>

          {/* Priority 2 */}
          <div className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 bg-blue-100 text-blue-900 rounded-lg flex items-center justify-center font-black text-lg border-2 border-blue-400">
                P2
              </span>
              <div>
                <div className="font-bold text-blue-900 text-sm">MONITOR</div>
                <div className="text-xs text-blue-700">Active Watch</div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Risk Index <strong>{"> 15"}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Network Pressure</span>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <strong className="text-blue-900">Action:</strong>
                <p className="mt-1 text-gray-600">Monitor Wait Times</p>
              </div>
            </div>
          </div>

          {/* Priority 1 */}
          <div className="bg-white rounded-lg p-4 border-2 border-green-300 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 bg-green-100 text-green-900 rounded-lg flex items-center justify-center font-black text-lg border-2 border-green-400">
                P1
              </span>
              <div>
                <div className="font-bold text-green-900 text-sm">STABLE</div>
                <div className="text-xs text-green-700">Normal Ops</div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Risk Index <strong>{"< 15"}</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>Baseline Aligned</span>
              </div>
              <div className="mt-3 pt-3 border-t border-green-200">
                <strong className="text-green-900">Action:</strong>
                <p className="mt-1 text-gray-600">Standard Maintenance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t-2 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">ℹ️</span>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Engine Logic:</strong> The system analyzes <strong>Spatial Risk Index</strong> (network stress), 
              <strong> Total Biometric Demand</strong> (queue pressure), and <strong>Student Demographic Lead</strong> (7-day trend) 
              to calculate priority levels. Each pincode receives a unique <strong>Request ID</strong> for tracking and verification.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
