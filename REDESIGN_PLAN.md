# ACAS Dhristi - Complete Redesign Plan

## User Requirements Summary
1. **Professional Dashboard UI** - Not a landing page, but a real dashboard
2. **UIDAI Logo** in header
3. **Footer** with pilot framework message
4. **Better Color Palette** - More professional
5. **Bigger Navigation Buttons** with descriptions
6. **Use GeoJSON** for accurate map visualization
7. **All Sheet Columns** properly displayed in audit log
8. **Different Fonts** for better aesthetics
9. **Highly Professional** - 1st prize quality

## Implementation Checklist

### Phase 1: Core Infrastructure ✅
- [x] Update constants with actual sheet columns
- [x] Update dataFetcher with live API
- [x] Add SHEET_COLUMNS configuration

### Phase 2: Enhanced Audit Log (IN PROGRESS)
- [ ] Display ALL columns from sheets (Timestamp, Pincode, District, Status, Priority, Reasoning, Pathway, Risk_Score, Identity, Request_ID, Ack_Status)
- [ ] Better table layout with proper column widths
- [ ] Color-coded priority levels
- [ ] Expandable rows for full reasoning/pathway text
- [ ] Export functionality

### Phase 3: Improved Map Visualization
- [ ] Load and use tamil_nadu_centers.geojson
- [ ] Match pincodes from sheets to GeoJSON coordinates
- [ ] Cluster markers for better performance
- [ ] Heat map overlay option
- [ ] Click on marker shows full details from sheet

### Phase 4: Dashboard Redesign
- [ ] Add UIDAI logo to header
- [ ] Redesign navigation with large cards
- [ ] Add descriptions to navigation buttons
- [ ] Better color scheme throughout
- [ ] Professional footer

### Phase 5: Typography & Styling
- [ ] Import Google Fonts (Poppins for headings, Inter for body)
- [ ] Update all text to be simple and clear
- [ ] Consistent spacing and sizing
- [ ] Professional shadows and borders

### Phase 6: Responsive Design
- [ ] Mobile-first approach
- [ ] Tablet optimization
- [ ] Desktop full experience

## Color Palette (Updated)
- Primary: #1E40AF (Deep Blue)
- Secondary: #7C3AED (Purple)
- Accent: #F97316 (Orange)
- Success: #10B981 (Emerald)
- Warning: #F59E0B (Amber)
- Danger: #EF4444 (Red)
- Background: #F8FAFC
- Card: #FFFFFF

## Typography
- Headings: Poppins (Bold, 600-700 weight)
- Body: Inter (Regular, 400-500 weight)
- Monospace: JetBrains Mono (for data/codes)
