// Test script to verify Google Sheets API data fetching
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'YOUR_API_KEY_HERE';
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || '1zmKUeplCU7AWkdqgfsKEhEUzjiqpGP0obepV0_iGyQ0';
const RANGE = process.env.NEXT_PUBLIC_SHEET_RANGE || 'ACAS Dhristi LOG';

async function testGoogleSheetsAPI() {
  console.log('🔍 Testing Google Sheets API Connection...\n');
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?key=${API_KEY}`;
  
  try {
    console.log('📡 Fetching data from Google Sheets...');
    console.log('URL:', url);
    console.log('');
    
    const response = await axios.get(url);
    
    if (response.data && response.data.values) {
      const rows = response.data.values;
      
      console.log('✅ SUCCESS! Data fetched successfully\n');
      console.log('📊 Data Summary:');
      console.log('─'.repeat(60));
      console.log(`Total Rows: ${rows.length}`);
      console.log(`Header Row: ${rows[0] ? rows[0].join(' | ') : 'No header'}`);
      console.log('');
      
      if (rows.length > 1) {
        console.log('📋 Column Details:');
        console.log('─'.repeat(60));
        const headers = rows[0];
        headers.forEach((header, index) => {
          console.log(`  ${index + 1}. ${header}`);
        });
        console.log('');
        
        console.log('📝 Sample Data (First 3 rows):');
        console.log('─'.repeat(60));
        for (let i = 1; i < Math.min(4, rows.length); i++) {
          console.log(`\nRow ${i}:`);
          const row = rows[i];
          headers.forEach((header, index) => {
            console.log(`  ${header}: ${row[index] || 'N/A'}`);
          });
        }
        console.log('');
        
        // Test column mapping
        console.log('🔗 Column Mapping Test:');
        console.log('─'.repeat(60));
        const expectedColumns = [
          'Timestamp',
          'Pincode',
          'District',
          'Status',
          'Priority',
          'Reasoning',
          'Pathway',
          'Risk_Score',
          'Identity',
          'Request_ID',
          'Ack_Status'
        ];
        
        expectedColumns.forEach(col => {
          const index = headers.indexOf(col);
          if (index !== -1) {
            console.log(`  ✓ ${col} found at index ${index}`);
          } else {
            console.log(`  ✗ ${col} NOT FOUND`);
          }
        });
        
      } else {
        console.log('⚠️  No data rows found (only header)');
      }
      
    } else {
      console.log('❌ ERROR: No data in response');
      console.log('Response:', JSON.stringify(response.data, null, 2));
    }
    
  } catch (error) {
    console.log('❌ ERROR: Failed to fetch data\n');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

// Run the test
testGoogleSheetsAPI();
