# ACAS Dhristi - Complete Setup Guide

This guide will walk you through setting up the ACAS Dhristi Administrative Portal from scratch.

## 📦 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd acas-dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Leaflet & React-Leaflet
- Axios
- And other dependencies

### Step 3: Configure Google Sheets API (Optional)

#### Option A: Use Mock Data (Recommended for Testing)

The application works out-of-the-box with mock data. No configuration needed!

#### Option B: Connect to Live Google Sheets

1. **Get Google Sheets API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "Google Sheets API"
   - Create credentials (API Key)
   - Copy the API key

2. **Create Environment File**:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Edit `.env.local`**:
   ```env
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_SHEET_ID=1zmKUeplCU7AWkdqgfsKEhEUzjiqpGP0obepV0_iGyQ0
   NEXT_PUBLIC_SHEET_RANGE=ACAS Dhristi LOG
   ```

### Step 4: Run Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Step 5: Build for Production

```bash
npm run build
npm start
```

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🌐 Accessing the Application

Once running, you can access:

- **Main Dashboard**: http://localhost:3000
- **Landing Page**: Default view with overview
- **Audit Log**: Click "VIEW REAL-TIME AUDIT LOG" button
- **Spatial Map**: Click "VIEW SPATIAL STRESS MAP" button

## 🔧 Configuration Options

### Customizing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'gov-blue': {
    DEFAULT: '#0D47A1', // Change this
    // ... other shades
  },
  'safety-orange': {
    DEFAULT: '#EF6C00', // Change this
  }
}
```

### Customizing Content

Edit `src/lib/constants.js`:

```javascript
export const BILINGUAL_CONTENT = {
  en: {
    title: 'Your Custom Title',
    // ... other content
  }
}
```

### Changing Refresh Intervals

**Audit Log** (default: 30 seconds):
```javascript
// In src/components/AuditLog.js
const interval = setInterval(loadAuditData, 30000); // Change 30000
```

**Spatial Map** (default: 60 seconds):
```javascript
// In src/components/SpatialMap.js
const interval = setInterval(loadSpatialData, 60000); // Change 60000
```

## 📊 Data Structure

### Google Sheets Format

Your Google Sheet should have these columns:

| Timestamp | Pincode | District | Intelligence & Reasoning | Status | Ack_Status | priority_level | risk_score |
|-----------|---------|----------|-------------------------|--------|------------|----------------|------------|
| 2024-01-15 10:30 | 600001 | Chennai | LEVEL 3: MISSION MODE... | LEVEL 3 | Acknowledged | 3 | 45.00 |

### Mock Data

If not using Google Sheets API, the app uses mock data defined in `src/lib/dataFetcher.js`:

```javascript
function getMockData() {
  return [
    {
      Timestamp: new Date().toLocaleString(),
      Pincode: '600001',
      District: 'Chennai',
      // ... more fields
    }
  ];
}
```

## 🗺️ Adding New Districts

To add new Tamil Nadu districts to the map:

Edit `src/lib/dataFetcher.js`:

```javascript
function getDistrictCoordinates(district) {
  const coordinates = {
    'Chennai': [13.0827, 80.2707],
    'YourNewDistrict': [latitude, longitude], // Add here
    // ... existing districts
  };
  return coordinates[district] || null;
}
```

## 🎨 Styling Guidelines

### Government Design Principles

1. **Professional & Rigid**: Use 4px border radius, not rounded
2. **High Contrast**: Ensure text is readable
3. **Uppercase Labels**: Use for administrative authority
4. **Font Weight**: Use `font-black` for headings
5. **Colors**: Stick to government blue and safety orange

### Adding Custom Components

Create new component in `src/components/`:

```javascript
'use client';

import { motion } from 'framer-motion';

export default function MyComponent() {
  return (
    <div className="bg-white rounded-gov shadow-gov-card p-6">
      <h2 className="text-2xl font-black text-gov-blue uppercase">
        My Component
      </h2>
    </div>
  );
}
```

## 🐛 Common Issues & Solutions

### Issue: "Module not found" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Map not displaying

**Solution**:
1. Check browser console for errors
2. Ensure Leaflet CSS is loaded in `src/app/layout.js`
3. Verify coordinates are valid numbers

### Issue: TypeScript errors

**Solution**:
The project uses JavaScript, not TypeScript. You can safely ignore TypeScript config warnings. If needed, delete `tsconfig.json`.

### Issue: Build fails

**Solution**:
```bash
rm -rf .next
npm run build
```

### Issue: API rate limits

**Solution**:
- Use mock data for development
- Implement caching in production
- Consider using Google Sheets API quotas wisely

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

Set environment variables on your server.

## 📱 Mobile Responsiveness

The application is fully responsive:
- Desktop: Full layout with all features
- Tablet: Optimized grid layouts
- Mobile: Stacked components, touch-friendly

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Restrict API key** to specific domains in Google Cloud Console
3. **Use HTTPS** in production
4. **Implement rate limiting** for API calls
5. **Validate all user inputs**

## 📈 Performance Optimization

### Already Implemented

- ✅ Dynamic imports for Leaflet (SSR optimization)
- ✅ Image optimization with Next.js
- ✅ CSS purging with Tailwind
- ✅ Code splitting
- ✅ Lazy loading components

### Additional Optimizations

1. **Enable caching**:
   ```javascript
   // In next.config.js
   async headers() {
     return [
       {
         source: '/api/:path*',
         headers: [
           { key: 'Cache-Control', value: 'public, max-age=60' }
         ]
       }
     ];
   }
   ```

2. **Optimize images**: Use Next.js Image component
3. **Implement service worker**: For offline support

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Language toggle works (EN ↔ Tamil)
- [ ] Audit log displays data
- [ ] Map renders with markers
- [ ] Navigation between views works
- [ ] Responsive on mobile
- [ ] Loading states appear
- [ ] Error states handle gracefully

## 📞 Support & Resources

- **Documentation**: See README.md
- **Issues**: Check browser console
- **Updates**: Pull latest from repository

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Leaflet.js](https://leafletjs.com/)

---

**Ready to start?** Run `npm install && npm run dev` and visit http://localhost:3000! 🚀
