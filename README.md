# ACAS Dhristi - Aadhaar Capacity Advisory System

![ACAS Dhristi Banner](https://img.shields.io/badge/UIDAI-ACAS%20Dhristi-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Project Overview

**ACAS Dhristi** (Aadhaar Capacity Advisory System) is a **pilot predictive governance framework** developed for **Tamil Nadu** to proactively manage Aadhaar center capacity and prevent service disruptions before they occur.

### 🏆 Key Highlights
- **Proactive vs Reactive**: Predicts operational stress before citizen complaints
- **Real-time Intelligence**: Live backend metadata stream from n8n automation
- **Spatial Visualization**: Interactive map with 173,225+ Tamil Nadu center coordinates
- **Multi-factor Engine**: Analyzes risk index, biometric demand, and demographic patterns
- **State-Agnostic**: Can be deployed anywhere by recalculating baseline

---

## 🚀 Features

### 1. **Spatial Stress Map**
- 🗺️ Interactive Leaflet.js map with OpenStreetMap tiles
- 🎨 Color-coded markers (Red/Orange/Amber/Green) based on risk scores
- 📍 GeoJSON integration with precise Tamil Nadu center coordinates
- 💡 Interactive popups showing AI reasoning, priority, and recommended actions
- ⚡ Auto-refresh every 30 seconds

### 2. **Real-Time Intelligence Log**
- 📊 Full-width responsive table with 9 key columns
- 🔍 Prominent display of Pincode, AI Reasoning, and Request ID
- 🎯 Priority-based color coding (P1-P5)
- ✅ Verification status tracking
- 🔄 Live backend stream integration

### 3. **Force-Detection Engine**
Multi-factor decision engine with 5 priority levels:
- **P5 - EMERGENCY**: Risk > 50, Bio Demand > 100 → Deploy Mobile Vans
- **P4 - SATURATED**: Risk > 30 OR Bio Demand > 150 → Activate 2nd Shift
- **P3 - MISSION**: Student Lead > 2.5 → Dedicate Counter #1
- **P2 - MONITOR**: Risk > 15 → Monitor Wait Times
- **P1 - STABLE**: Risk < 15 → Standard Maintenance

### 4. **Bilingual Support**
- 🌐 English and Tamil (தமிழ்) language toggle
- 🎨 Government-appropriate professional design
- 📱 Fully responsive (Desktop/Tablet/Mobile)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.0.4 | React framework with SSR |
| **React** | 18.2.0 | UI library |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS |
| **Framer Motion** | 10.16.16 | Animations |
| **Leaflet.js** | 1.9.4 | Interactive maps |
| **Axios** | 1.6.2 | HTTP client |
| **TypeScript** | 5.3.3 | Type safety |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Srevarshan05/UIDAI-Acas.git
cd UIDAI-Acas/acas-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~200MB). Expected time: 2-3 minutes.

### 3. Run Development Server

```bash
npm run dev
```

The application will start on **http://localhost:3000**

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📁 Project Structure

```
acas-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout with metadata
│   │   ├── page.js            # Main dashboard page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── AuditLog.js        # Real-time intelligence log table
│   │   ├── SpatialMap.js      # Interactive stress map
│   │   ├── LandingPage.js     # Explainer section
│   │   ├── SystemFlow.js      # Animated pipeline
│   │   └── LoadingState.js    # Loading skeletons
│   └── lib/
│       ├── dataFetcher.js     # Google Sheets API integration
│       ├── constants.js       # Bilingual content & config
│       └── utils.js           # Helper functions
├── public/
│   └── tamil_nadu_centers.geojson  # 173,225 center coordinates
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── next.config.js             # Next.js configuration
└── README.md                  # This file
```

---

## 🔧 Configuration

### Google Sheets API Setup

The system fetches real-time data from Google Sheets:

**Sheet ID**: `1zmKUeplCU7AWkdqgfsKEhEUzjiqpGP0obepV0_iGyQ0`  
**Range**: `ACAS Dhristi LOG`

#### Columns:
1. Timestamp
2. Pincode
3. District
4. Status
5. Priority
6. Risk_Score
7. Reasoning
8. Pathway
9. Identity
10. Request_ID
11. Ack_Status

### Environment Variables (Optional)

Create `.env.local` for custom configuration:

```env
NEXT_PUBLIC_SHEET_ID=your_sheet_id_here
NEXT_PUBLIC_API_KEY=your_api_key_here
```

---

## 🎨 Color Scheme

Following **GIGW 3.0 Standards**:

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Government Blue** | `#0D47A1` | Primary authority color |
| **Safety Orange** | `#EF6C00` | Urgent action highlights |
| **Background** | `#F8FAFC` | Off-white background |
| **Card White** | `#FFFFFF` | Card backgrounds |

---

## 📊 Data Flow

```
UIDAI Open APIs
      ↓
ML Core (XGBoost/GNN)
      ↓
n8n Automation Engine
      ↓
Google Sheets (Audit Log)
      ↓
ACAS Dhristi Dashboard
```

---

## 🧪 Testing

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

---

## 📱 Responsive Design

| Device | Breakpoint | Layout |
|--------|------------|--------|
| **Mobile** | < 768px | Single column, stacked |
| **Tablet** | 768px - 1023px | 2-4 columns |
| **Desktop** | ≥ 1024px | Full grid layout |

---

## 🔒 Privacy & Compliance

- ✅ Uses **aggregated operational metadata only**
- ✅ **Zero contact** with CIDR central repositories
- ✅ **No private resident identity data** accessed
- ✅ Compliant with UIDAI data protection guidelines

---

## 🌟 Key Innovations

1. **Proactive Prediction**: Identifies stress before service disruptions
2. **Baseline Concept**: State-agnostic framework adaptable to any region
3. **Multi-factor Analysis**: Combines spatial risk, biometric demand, and demographics
4. **Real-time Automation**: n8n workflow integration for instant alerts
5. **Visual Intelligence**: Interactive map + tabular log for comprehensive insights

---

## 🤝 Contributing

This is a pilot project for Tamil Nadu. For contributions or deployment in other states:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewState`)
3. Commit changes (`git commit -m 'Add support for NewState'`)
4. Push to branch (`git push origin feature/NewState`)
5. Open a Pull Request

---

## 📄 License

This project is developed for **UIDAI Tamil Nadu** pilot program.  
Managed by **ELCOT / UIDAI Tamil Nadu** and **National Informatics Centre (NIC)**.

---

## 👥 Team

- **Developed by**: National Informatics Centre (NIC)
- **Managed by**: ELCOT / UIDAI Tamil Nadu
- **Framework**: Predictive Governance Initiative

---

## 📞 Support

For technical support or deployment queries:
- **Email**: support@uidai.gov.in
- **Website**: https://uidai.gov.in

---

## 🎯 Roadmap

- [x] Tamil Nadu pilot deployment
- [x] Real-time Google Sheets integration
- [x] Interactive spatial map
- [x] Priority-based alerting
- [ ] Multi-state expansion
- [ ] Advanced ML model integration
- [ ] Mobile app development
- [ ] API for third-party integration

---

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Overview)

### Spatial Stress Map
![Map](https://via.placeholder.com/800x400?text=Spatial+Stress+Map)

### Real-Time Intelligence Log
![Log](https://via.placeholder.com/800x400?text=Intelligence+Log)

---

## 🏆 Acknowledgments

- **UIDAI** for Aadhaar infrastructure
- **ELCOT Tamil Nadu** for operational support
- **NIC** for technical development
- **OpenStreetMap** for map tiles
- **Leaflet.js** for mapping library

---

## 📝 Version History

### v1.0.0 (Current)
- ✅ Initial Tamil Nadu pilot release
- ✅ Real-time Google Sheets integration
- ✅ Interactive Leaflet map with 173,225 centers
- ✅ Priority-based force detection engine
- ✅ Bilingual support (EN/TA)
- ✅ Full-screen responsive design

---

**Made with ❤️ for better governance in India**

**ACAS Dhristi** - Predicting stress, preventing disruptions.
