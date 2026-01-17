Log data # 🚀 ACAS Dhristi - Quick Start (5 Minutes)

Get the ACAS Dhristi portal running in just 5 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd acas-dashboard
npm install
```

Wait for all packages to install...

## Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

## Step 3: Open in Browser (10 seconds)

Visit: **http://localhost:3000**

## 🎉 That's It!

You should now see the ACAS Dhristi Administrative Portal with:

- ✅ Landing page with bilingual content
- ✅ Real-time audit log (using mock data)
- ✅ Interactive spatial stress map
- ✅ System architecture visualization

## 🔄 What You Can Do Now

### 1. Explore the Interface

- Click **"VIEW SPATIAL STRESS MAP"** to see the geographic visualization
- Click **"VIEW REAL-TIME AUDIT LOG"** to see the live intelligence feed
- Toggle between **EN** and **தமிழ்** (Tamil) languages

### 2. Test Features

- Navigate between different views
- Hover over map markers to see details
- Watch the auto-refresh indicators
- Check responsive design (resize browser)

### 3. (Optional) Connect Live Data

If you want to connect to Google Sheets:

1. Create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Google Sheets API key:
   ```env
   NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_key_here
   ```

3. Restart the server:
   ```bash
   npm run dev
   ```

## 📱 View on Mobile

The app is fully responsive! Access from your phone:

```
http://YOUR_COMPUTER_IP:3000
```

(Replace YOUR_COMPUTER_IP with your local IP address)

## 🛑 Stop the Server

Press `Ctrl + C` in the terminal

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## ❓ Having Issues?

### Port 3000 already in use?

```bash
# Use a different port
PORT=3001 npm run dev
```

### Dependencies not installing?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Map not showing?

- Check browser console (F12)
- Ensure you have internet connection (for map tiles)
- Try refreshing the page

## 📚 Need More Help?

- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Documentation**: See `README.md`
- **Progress Tracking**: See `TODO.md`

## 🎯 Key Features to Test

1. **Landing Page**
   - [ ] Bilingual content displays
   - [ ] Action buttons work
   - [ ] System flow animation plays

2. **Audit Log**
   - [ ] Table displays mock data
   - [ ] Status badges show colors
   - [ ] Auto-refresh indicator visible

3. **Spatial Map**
   - [ ] Map loads with Tamil Nadu view
   - [ ] Markers appear with colors
   - [ ] Popup shows on marker click
   - [ ] Statistics cards display counts

4. **Navigation**
   - [ ] Back to overview button works
   - [ ] Language toggle switches content
   - [ ] Smooth transitions between views

## 🎨 Customization Quick Tips

### Change Colors

Edit `tailwind.config.js`:
```javascript
'gov-blue': {
  DEFAULT: '#0D47A1', // Your color here
}
```

### Change Content

Edit `src/lib/constants.js`:
```javascript
title: 'Your Custom Title',
```

### Add Districts

Edit `src/lib/dataFetcher.js`:
```javascript
'YourDistrict': [latitude, longitude],
```

## 🚀 Deploy to Production

### Vercel (Easiest)

1. Push to GitHub
2. Import in Vercel
3. Deploy!

### Manual Server

```bash
npm run build
npm start
```

---

**Congratulations!** 🎉 You now have a fully functional ACAS Dhristi portal running!

**Next Steps**: Explore the code, customize as needed, and deploy to production.

**Questions?** Check the documentation files or browser console for errors.
