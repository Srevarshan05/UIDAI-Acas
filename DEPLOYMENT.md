# 🚀 ACAS Dhristi - Deployment Guide

## ✅ Successfully Pushed to GitHub!

Your code is now safely stored at:
**https://github.com/Srevarshan05/UIDAI-Acas**

---

## 📦 How to Clone and Use on Another System

### Method 1: Clone from GitHub (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/Srevarshan05/UIDAI-Acas.git

# 2. Navigate to project directory
cd UIDAI-Acas/acas-dashboard

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev
```

**Access at**: http://localhost:3000

---

### Method 2: Download ZIP

1. Go to https://github.com/Srevarshan05/UIDAI-Acas
2. Click **Code** → **Download ZIP**
3. Extract the ZIP file
4. Open terminal in `acas-dashboard` folder
5. Run:
```bash
npm install
npm run dev
```

---

## 🔧 System Requirements

### Minimum Requirements:
- **OS**: Windows 10/11, macOS 10.15+, or Linux
- **Node.js**: v18.0.0 or higher
- **RAM**: 4GB minimum
- **Storage**: 500MB free space

### Recommended:
- **Node.js**: v20.0.0+
- **RAM**: 8GB+
- **Storage**: 1GB free space

---

## 📋 Step-by-Step Setup for New System

### Step 1: Install Node.js

**Windows:**
1. Download from https://nodejs.org/
2. Run installer
3. Verify: `node --version` (should show v18+)

**macOS:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 2: Clone Repository

```bash
git clone https://github.com/Srevarshan05/UIDAI-Acas.git
cd UIDAI-Acas/acas-dashboard
```

### Step 3: Install Dependencies

```bash
npm install
```

**Expected output:**
```
added 312 packages in 45s
```

### Step 4: Run Application

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.3s
```

### Step 5: Open Browser

Navigate to **http://localhost:3000**

---

## 🌐 Production Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub (already done ✓)
2. Go to https://vercel.com
3. Click **Import Project**
4. Select your GitHub repository
5. Click **Deploy**

**Live URL**: `https://your-project.vercel.app`

### Option 2: Netlify

```bash
npm run build
```

Upload the `.next` folder to Netlify.

### Option 3: Self-Hosted Server

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔑 Environment Variables

Create `.env.local` file:

```env
# Google Sheets Configuration
NEXT_PUBLIC_SHEET_ID=1zmKUeplCU7AWkdqgfsKEhEUzjiqpGP0obepV0_iGyQ0
NEXT_PUBLIC_SHEET_RANGE=ACAS Dhristi LOG

# Optional: Custom API endpoint
NEXT_PUBLIC_API_ENDPOINT=https://your-api.com
```

---

## 🐛 Troubleshooting

### Issue 1: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 2: Port 3000 already in use

**Solution:**
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue 3: Module not found errors

**Solution:**
```bash
# Reinstall dependencies
npm install

# If still fails, check Node.js version
node --version  # Should be v18+
```

### Issue 4: GeoJSON file not loading

**Solution:**
- Ensure `tamil_nadu_centers.geojson` is in `/public` folder
- Check file size (should be ~217MB)
- Verify file path in `SpatialMap.js`

---

## 📊 Performance Optimization

### For Production:

1. **Enable Compression:**
```bash
npm install compression
```

2. **Optimize Images:**
- Use Next.js Image component
- Enable image optimization in `next.config.js`

3. **Enable Caching:**
```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600',
        },
      ],
    },
  ],
}
```

---

## 🔄 Updating the Application

### Pull Latest Changes:

```bash
cd UIDAI-Acas/acas-dashboard
git pull origin main
npm install
npm run dev
```

---

## 📱 Mobile Testing

### Test on Mobile Device:

1. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Run dev server:
```bash
npm run dev
```

3. On mobile, navigate to:
```
http://YOUR_IP_ADDRESS:3000
```

Example: `http://192.168.1.100:3000`

---

## 🎯 Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Check code quality |
| `git pull` | Update from GitHub |

---

## 📞 Support

**Issues?** Open an issue on GitHub:
https://github.com/Srevarshan05/UIDAI-Acas/issues

**Email:** support@uidai.gov.in

---

## ✅ Deployment Checklist

- [x] Code pushed to GitHub
- [x] README.md created
- [x] Dependencies documented
- [x] Environment variables configured
- [x] GeoJSON file included
- [x] Build tested locally
- [ ] Deploy to production (Vercel/Netlify)
- [ ] Configure custom domain
- [ ] Set up monitoring
- [ ] Enable analytics

---

**🎉 Your ACAS Dhristi dashboard is now ready for deployment!**

Repository: https://github.com/Srevarshan05/UIDAI-Acas
