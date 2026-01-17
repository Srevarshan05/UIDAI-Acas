# 🚀 How to Run ACAS Dhristi Tomorrow (Quick Start)

## ✅ Yes, Your Project is Already on Your System!

Since the project is already in your VS Code on this computer, you just need to:

---

## 📋 Tomorrow's Startup Steps (3 Simple Steps)

### **Step 1: Open VS Code**
```bash
# Open VS Code in the project folder
cd C:\Users\Srevarshan\OneDrive\Desktop\UIDAI\acas-dashboard
code .
```

Or just open VS Code and navigate to:
`C:\Users\Srevarshan\OneDrive\Desktop\UIDAI\acas-dashboard`

---

### **Step 2: Make Sure .env.local Has Your API Key**

Check if file `.env.local` exists in the `acas-dashboard` folder:

**If it EXISTS:**
- ✅ You're good! Just proceed to Step 3

**If it DOESN'T EXIST:**
- Create a new file called `.env.local` in the `acas-dashboard` folder
- Add this content:
```env
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key_here
NEXT_PUBLIC_SHEET_ID=1zmKUeplCU7AWkdqgfsKEhEUzjiqpGP0obepV0_iGyQ0
NEXT_PUBLIC_SHEET_RANGE=ACAS Dhristi LOG
```
- Replace `your_api_key_here` with your actual Google API key

---

### **Step 3: Run the Application**

Open terminal in VS Code (Ctrl + `) and run:

```bash
npm run dev
```

**That's it!** 🎉

The application will start at: **http://localhost:3000**

---

## 🔑 About the API Key

### **Where is it stored?**
- Your API key is in the `.env.local` file
- This file is **only on your computer** (not on GitHub)
- It's protected by `.gitignore` so it won't be uploaded

### **Do I need to enter it every time?**
- ❌ **NO!** Once you create `.env.local` with your API key, it stays there
- You only need to run `npm run dev` tomorrow

### **What if I lost my API key?**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Navigate to **APIs & Services** → **Credentials**
- Copy your existing API key or create a new one

---

## 🖥️ Complete Tomorrow Workflow

```bash
# 1. Open terminal in the project folder
cd C:\Users\Srevarshan\OneDrive\Desktop\UIDAI\acas-dashboard

# 2. (Optional) Check if .env.local exists
dir .env.local

# 3. Run the application
npm run dev

# 4. Open browser
# Go to: http://localhost:3000
```

**Time needed:** Less than 1 minute! ⚡

---

## 🔄 If You Need to Pull Latest Changes from GitHub

If you made changes on another computer and pushed to GitHub:

```bash
# 1. Navigate to project
cd C:\Users\Srevarshan\OneDrive\Desktop\UIDAI\acas-dashboard

# 2. Pull latest changes
git pull origin main

# 3. Install any new dependencies (if package.json changed)
npm install

# 4. Run the application
npm run dev
```

---

## 🛑 Common Issues & Solutions

### **Issue 1: "Port 3000 is already in use"**
**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001

# Then open: http://localhost:3001
```

### **Issue 2: "Cannot find module"**
**Solution:**
```bash
# Reinstall dependencies
npm install

# Then run again
npm run dev
```

### **Issue 3: "API key not found"**
**Solution:**
- Check if `.env.local` file exists
- Make sure it has: `NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_key`
- Restart the server: Stop (Ctrl+C) and run `npm run dev` again

### **Issue 4: "Google Sheets data not loading"**
**Solution:**
- Verify your API key is correct in `.env.local`
- Check if the Google Sheet is accessible
- Make sure API key has Google Sheets API enabled

---

## 📂 Your Project Location

**Full Path:**
```
C:\Users\Srevarshan\OneDrive\Desktop\UIDAI\acas-dashboard\
```

**Important Files:**
- `.env.local` - Your API key (create if missing)
- `package.json` - Project dependencies
- `src/` - All source code
- `public/` - GeoJSON data (173,225 centers)

---

## 🎯 Quick Reference Card

| Action | Command |
|--------|---------|
| **Start app** | `npm run dev` |
| **Stop app** | `Ctrl + C` |
| **Open browser** | http://localhost:3000 |
| **Check API key** | Open `.env.local` file |
| **Pull updates** | `git pull origin main` |
| **Reinstall** | `npm install` |

---

## ✅ Checklist for Tomorrow

- [ ] Open VS Code in project folder
- [ ] Verify `.env.local` exists with API key
- [ ] Run `npm run dev` in terminal
- [ ] Open http://localhost:3000 in browser
- [ ] Test Spatial Map and Audit Log

---

## 💡 Pro Tips

1. **Keep VS Code Open**: If you keep VS Code open, the terminal session stays active
2. **Bookmark localhost:3000**: Quick access in browser
3. **Use Ctrl + `**: Quick terminal toggle in VS Code
4. **Auto-refresh**: The app auto-refreshes data every 30 seconds

---

## 🆘 Need Help?

**Check these files:**
- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Detailed setup guide
- `SECURITY_FIX.md` - API key security info

**GitHub Repository:**
https://github.com/Srevarshan05/UIDAI-Acas

---

## 🎉 Summary

**Tomorrow, you just need to:**
1. Open VS Code in the project folder
2. Run `npm run dev`
3. Open http://localhost:3000

**Your API key is already saved in `.env.local` on your computer!**

No need to enter it again unless you delete the file or move to a different computer.

---

**Last Updated:** 2024
**Status:** ✅ Ready for tomorrow!
