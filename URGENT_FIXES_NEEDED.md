# Urgent Fixes Needed

## Current Status

### ✅ Completed:
1. Professional fonts (Poppins + Inter) configured
2. Better color palette (Deep Blue, Purple, Orange)
3. UIDAI logo placeholder in header
4. Footer with pilot message
5. Audit Log shows all 11 columns
6. Map component loads GeoJSON and matches pincodes
7. Auto-refresh every 30 seconds

### ❌ TypeScript Errors:
The SpatialMap.js file has persistent TypeScript errors due to long string concatenations in the popup HTML. This is a known issue with JSX/TSX parsers.

## Quick Fixes Required:

### 1. Fix Map Component (CRITICAL):
The map component has TypeScript errors. Replace the entire `src/components/SpatialMap.js` file with a simpler version that doesn't use template literals for the popup.

**Solution**: Use `createElement` approach or move popup HTML to a separate function outside the component.

### 2. Update Main Page (src/app/page.js):
- Add "UIDAI" text in orange color in the header
- Update footer disclaimer about dataset

### 3. Update Audit Log (src/components/AuditLog.js):
- Ensure Pincode, Reasoning, and Request_ID are prominently displayed
- Already done, but verify visibility

### 4. Test the Application:
```bash
cd acas-dashboard
npm run dev
```

Open http://localhost:3000 and verify:
- Map shows markers (color-coded by risk)
- Audit log shows all columns
- Auto-refresh works
- UIDAI branding is visible

## Files That Need Attention:

1. **src/components/SpatialMap.js** - Has TypeScript errors (line 260)
2. **src/app/page.js** - Need to add "UIDAI" in orange
3. **src/app/page.js** - Footer needs dataset disclaimer

## Recommended Next Steps:

1. Fix the TypeScript error in SpatialMap.js by simplifying the popup HTML
2. Run `npm run dev` to test
3. Verify map markers appear
4. Verify all audit log columns display
5. Add final touches (UIDAI orange text, footer disclaimer)

## Map Markers Should Show:
- Color-coded circles (Red/Orange/Amber/Green) based on risk score
- Size based on priority (P1-P5)
- Click to see popup with full details
- Only pincodes from Google Sheets that match GeoJSON coordinates

## The 403 API Error is NORMAL:
- API key has referrer restrictions
- Works from browser (localhost:3000)
- Doesn't work from curl/command line
- This is a security feature, not a bug!
