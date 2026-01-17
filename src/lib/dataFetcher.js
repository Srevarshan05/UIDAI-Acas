// ACAS Dhristi - Google Sheets Data Fetcher
const SPREADSHEET_ID = '1zmKUeplCU7AWkdqgfsKEhEUzjiqpGP0obepV0_iGyQ0';
const API_KEY = 'AIzaSyAYJOLTMligFmJmJRv8aKHaGSqW9TLxFfI'; 
const RANGE = 'ACAS Dhristi LOG';

/**
 * Fetches live alerts from Google Sheets
 * @returns {Promise<Array>} Array of audit log entries
 */
export const getLiveAlerts = async () => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    if (!data.values) return [];
    
    // Pro-Tip: Mapping headers to objects prevents "Undefined" errors in your UI
    const [headers, ...rows] = data.values;
    return rows.map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i] || "N/A");
      return obj;
    });
  } catch (error) {
    console.error("Dashboard Data Error:", error);
    return []; // Return empty array so the UI doesn't crash
  }
};

/**
 * Fetches data from Google Sheets API (alias for compatibility)
 * @returns {Promise<Array>} Array of audit log entries
 */
export async function fetchAuditLog() {
  return getLiveAlerts();
}

/**
 * Fetches spatial stress data for map visualization
 * @returns {Promise<Array>} Array of location data with stress levels
 */
export async function fetchSpatialData() {
  try {
    const auditData = await fetchAuditLog();
    
    // Transform audit data into spatial data with coordinates
    const spatialData = auditData.map(entry => {
      const stressScore = extractStressScore(entry);
      const coordinates = getDistrictCoordinates(entry.District || entry.district);
      
      return {
        pincode: entry.Pincode || entry.pincode || 'N/A',
        district: entry.District || entry.district || 'Unknown',
        stressLevel: stressScore,
        intelligence: entry['Intelligence & Reasoning'] || entry.ai_recommendation || 'No data',
        status: entry['Ack_Status'] || entry.status || 'Pending',
        coordinates: coordinates,
        timestamp: entry.Timestamp || entry.timestamp || new Date().toISOString()
      };
    });

    return spatialData.filter(item => item.coordinates);
  } catch (error) {
    console.error('Error fetching spatial data:', error);
    return getMockSpatialData();
  }
}

/**
 * Extract stress score from intelligence text or status
 * @param {Object} entry - Audit log entry
 * @returns {number} Stress score (0-100)
 */
function extractStressScore(entry) {
  const status = entry['Status'] || entry.operational_status || '';
  const intelligence = entry['Intelligence & Reasoning'] || entry.ai_recommendation || '';
  
  // Extract from status tier
  if (status.includes('LEVEL 5') || status.includes('EMERGENCY')) return 85;
  if (status.includes('LEVEL 4') || status.includes('SATURATED')) return 65;
  if (status.includes('LEVEL 3') || status.includes('MISSION')) return 45;
  if (status.includes('LEVEL 2') || status.includes('MONITOR')) return 25;
  if (status.includes('LEVEL 1') || status.includes('STABLE')) return 10;
  
  // Try to extract numeric risk score
  const riskMatch = intelligence.match(/risk[:\s]+(\d+\.?\d*)/i);
  if (riskMatch) return parseFloat(riskMatch[1]);
  
  return 15; // Default low stress
}

/**
 * Get coordinates for Tamil Nadu districts
 * @param {string} district - District name
 * @returns {Array|null} [latitude, longitude] or null
 */
function getDistrictCoordinates(district) {
  const coordinates = {
    'Chennai': [13.0827, 80.2707],
    'Coimbatore': [11.0168, 76.9558],
    'Madurai': [9.9252, 78.1198],
    'Tiruchirappalli': [10.7905, 78.7047],
    'Salem': [11.6643, 78.1460],
    'Tirunelveli': [8.7139, 77.7567],
    'Tiruppur': [11.1085, 77.3411],
    'Erode': [11.3410, 77.7172],
    'Vellore': [12.9165, 79.1325],
    'Thoothukudi': [8.7642, 78.1348],
    'Thanjavur': [10.7870, 79.1378],
    'Dindigul': [10.3673, 77.9803],
    'Kanchipuram': [12.8342, 79.7036],
    'Cuddalore': [11.7480, 79.7714],
    'Karur': [10.9601, 78.0766],
    'Ramanathapuram': [9.3639, 78.8370],
    'Virudhunagar': [9.5810, 77.9624],
    'Pudukkottai': [10.3833, 78.8000],
    'Nagapattinam': [10.7672, 79.8449],
    'Namakkal': [11.2189, 78.1677],
    'Krishnagiri': [12.5186, 78.2137],
    'Dharmapuri': [12.1211, 78.1582],
    'Sivaganga': [9.8433, 78.4809],
    'Theni': [10.0104, 77.4977],
    'Ariyalur': [11.1401, 79.0782],
    'Perambalur': [11.2324, 78.8798],
    'Nilgiris': [11.4102, 76.6950],
    'Tiruvannamalai': [12.2253, 79.0747],
    'Villupuram': [11.9401, 79.4861],
    'Kallakurichi': [11.7380, 78.9597],
    'Ranipet': [12.9249, 79.3308],
    'Tirupattur': [12.4961, 78.5719],
    'Tenkasi': [8.9579, 77.3152],
    'Chengalpattu': [12.6819, 79.9760],
    'Mayiladuthurai': [11.1025, 79.6542],
    'Tiruvallur': [13.1432, 79.9074]
  };
  
  return coordinates[district] || null;
}

/**
 * Mock data for development/demo purposes
 * @returns {Array} Mock audit log entries
 */
function getMockData() {
  return [
    {
      Timestamp: new Date().toLocaleString(),
      Pincode: '600001',
      District: 'Chennai',
      'Intelligence & Reasoning': 'LEVEL 3: MISSION MODE - Student enrolment surge detected (Lead: 3.2). Dedicate Counter #1 for Student Enrolment mission.',
      Status: 'LEVEL 3: MISSION MODE',
      Ack_Status: 'Acknowledged',
      priority_level: 3,
      risk_score: '45.00'
    },
    {
      Timestamp: new Date(Date.now() - 3600000).toLocaleString(),
      Pincode: '641001',
      District: 'Coimbatore',
      'Intelligence & Reasoning': 'LEVEL 2: ACTIVE MONITOR - Low-level network pressure detected from neighboring nodes. Monitor token wait times and prepare surge protocols.',
      Status: 'LEVEL 2: ACTIVE MONITOR',
      Ack_Status: 'Pending',
      priority_level: 2,
      risk_score: '25.00'
    },
    {
      Timestamp: new Date(Date.now() - 7200000).toLocaleString(),
      Pincode: '625001',
      District: 'Madurai',
      'Intelligence & Reasoning': 'LEVEL 4: SATURATED OPS - Center is operating at peak physical capacity limits. Activate 2nd-Shift Verifiers immediately.',
      Status: 'LEVEL 4: SATURATED OPS',
      Ack_Status: 'Acknowledged',
      priority_level: 4,
      risk_score: '68.00'
    },
    {
      Timestamp: new Date(Date.now() - 10800000).toLocaleString(),
      Pincode: '620001',
      District: 'Tiruchirappalli',
      'Intelligence & Reasoning': 'LEVEL 1: STABLE - Operations aligned with regional baseline pulse. Standard operational maintenance.',
      Status: 'LEVEL 1: STABLE',
      Ack_Status: 'Acknowledged',
      priority_level: 1,
      risk_score: '12.00'
    },
    {
      Timestamp: new Date(Date.now() - 14400000).toLocaleString(),
      Pincode: '636001',
      District: 'Salem',
      'Intelligence & Reasoning': 'LEVEL 5: EMERGENCY LOAD - Critical infrastructure failure. High regional spillover. Immediate deployment of Mobile Aadhaar Vans required.',
      Status: 'LEVEL 5: EMERGENCY LOAD',
      Ack_Status: 'Pending',
      priority_level: 5,
      risk_score: '87.00'
    }
  ];
}

/**
 * Mock spatial data for development/demo
 * @returns {Array} Mock spatial data
 */
function getMockSpatialData() {
  return getMockData().map(entry => ({
    pincode: entry.Pincode,
    district: entry.District,
    stressLevel: parseFloat(entry.risk_score),
    intelligence: entry['Intelligence & Reasoning'],
    status: entry.Ack_Status,
    coordinates: getDistrictCoordinates(entry.District),
    timestamp: entry.Timestamp
  }));
}
