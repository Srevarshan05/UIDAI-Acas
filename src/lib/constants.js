// ACAS Dhristi - Constants and Bilingual Content

export const GOOGLE_SHEETS_CONFIG = {
  SHEET_ID: '1zmKUeplCU7AWkdqgfsKEhEUzjiqpGP0obepV0_iGyQ0',
  RANGE: 'ACAS Dhristi LOG',
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY || '',
};

// Actual Sheet Columns from Google Sheets
export const SHEET_COLUMNS = {
  TIMESTAMP: 'Timestamp',
  PINCODE: 'Pincode',
  DISTRICT: 'District',
  STATUS: 'Status',
  PRIORITY: 'Priority',
  REASONING: 'Reasoning',
  PATHWAY: 'Pathway',
  RISK_SCORE: 'Risk_Score',
  IDENTITY: 'Identity',
  REQUEST_ID: 'Request_ID',
  ACK_STATUS: 'Ack_Status'
};

export const COLORS = {
  STABLE: '#10B981',      // Emerald Green
  WARNING: '#F59E0B',     // Amber
  CRITICAL: '#EF4444',    // Red
  PRIMARY: '#1E40AF',     // Deep Blue
  SECONDARY: '#7C3AED',   // Purple
  ACCENT: '#F97316',      // Orange
};

export const STRESS_THRESHOLDS = {
  STABLE: { min: 0, max: 30, color: COLORS.STABLE, label: 'Stable' },
  WARNING: { min: 31, max: 60, color: COLORS.WARNING, label: 'Warning' },
  CRITICAL: { min: 61, max: 100, color: COLORS.CRITICAL, label: 'Critical' },
};

export const BILINGUAL_CONTENT = {
  en: {
    // Header
    title: 'ACAS Dhristi',
    subtitle: 'Aadhaar Capacity Advisory System',
    tagline: 'Predictive Governance Framework - Tamil Nadu Pilot',
    
    // Navigation
    viewMap: 'VIEW SPATIAL STRESS MAP',
    viewLog: 'VIEW REAL-TIME AUDIT LOG',
    backToOverview: 'BACK TO OVERVIEW',
    
    // Landing Page Sections
    whatIsAcas: {
      title: 'What is ACAS Dhristi?',
      content: 'ACAS Dhristi is a decision-support framework that predicts operational stress in Aadhaar enrollment centers before service disruptions occur. It enables proactive capacity management through real-time intelligence and predictive analytics.'
    },
    
    proactiveVsReactive: {
      title: 'Proactive vs. Reactive Governance',
      reactive: {
        title: 'REACTIVE (Current)',
        points: [
          'Action taken after citizen complaints',
          'Service disruptions already occurred',
          'Long queues and wait times',
          'Citizen dissatisfaction'
        ]
      },
      proactive: {
        title: 'PROACTIVE (ACAS)',
        points: [
          'Predict stress before it occurs',
          'Pre-emptive resource deployment',
          'Prevent queue formation',
          'Enhanced citizen experience'
        ]
      }
    },
    
    baselineConcept: {
      title: 'Understanding Baseline',
      content: 'The "Baseline" represents normal operational behavior patterns of a state. ACAS Dhristi is state-agnostic and can be deployed anywhere by recalculating the baseline for that region. The Tamil Nadu pilot establishes the methodology for nationwide scalability.'
    },
    
    stressTriggers: {
      title: 'Stress Triggers Identified (Tamil Nadu)',
      subtitle: 'Managed by ELCOT/UIDAI',
      triggers: [
        {
          icon: '🎓',
          title: 'Student MBU Cycles',
          desc: 'Mandatory Biometric Updates for educational institutions'
        },
        {
          icon: '🚶',
          title: 'Migration Surges',
          desc: 'Seasonal workforce movement patterns'
        },
        {
          icon: '💰',
          title: 'Welfare Deadlines',
          desc: 'Government scheme enrollment periods'
        },
        {
          icon: '📅',
          title: 'Year-End Rush',
          desc: 'Financial year-end documentation requirements'
        }
      ]
    },
    
    privacyCompliance: {
      title: 'Privacy & Compliance',
      badge: 'ZERO CIDR ACCESS',
      points: [
        'Uses aggregated operational metadata only',
        'No access to CIDR central repositories',
        'No private resident identity data processed',
        'Compliant with UIDAI data protection guidelines',
        'State-level operational intelligence only'
      ]
    },
    
    systemFlow: {
      title: 'System Architecture',
      nodes: [
        'UIDAI Open APIs',
        'ML Core: XGBoost/GNN',
        'n8n Automation',
        'Global Audit Log',
        'Dashboard'
      ]
    },
    
    // Audit Log
    auditLog: {
      title: 'Real-Time Audit Log',
      subtitle: 'Live Intelligence Feed from ACAS Dhristi System',
      columns: {
        timestamp: 'Timestamp',
        district: 'District',
        intelligence: 'Intelligence & Reasoning',
        status: 'Verification Status'
      },
      statusVerified: 'Verified',
      statusPending: 'Pending Action',
      loading: 'Loading audit entries...',
      error: 'System Offline - Checking Regional Node',
      noData: 'No audit entries available'
    },
    
    // Spatial Map
    spatialMap: {
      title: 'Spatial Stress Map',
      subtitle: 'Geographic Distribution of Operational Stress',
      legend: 'Stress Level Legend',
      stable: 'Stable (0-30)',
      warning: 'Warning (31-60)',
      critical: 'Critical (61-100)',
      loading: 'Loading map data...',
      error: 'Unable to load map data'
    },
    
    // Loading States
    loading: {
      initializing: 'Verifying Metadata Baseline...',
      fetchingData: 'Fetching Real-Time Intelligence...',
      processingMap: 'Processing Spatial Data...'
    }
  },
  
  ta: {
    // Header (Tamil)
    title: 'ACAS திருஷ்டி',
    subtitle: 'ஆதார் திறன் ஆலோசனை அமைப்பு',
    tagline: 'முன்கணிப்பு ஆளுமை கட்டமைப்பு - தமிழ்நாடு பைலட்',
    
    // Navigation
    viewMap: 'இடஞ்சார் அழுத்த வரைபடத்தைக் காண்க',
    viewLog: 'நேரடி தணிக்கை பதிவைக் காண்க',
    backToOverview: 'மேலோட்டத்திற்குத் திரும்பு',
    
    // Landing Page Sections
    whatIsAcas: {
      title: 'ACAS திருஷ்டி என்றால் என்ன?',
      content: 'ACAS திருஷ்டி என்பது சேவை இடையூறுகள் ஏற்படுவதற்கு முன்பே ஆதார் பதிவு மையங்களில் செயல்பாட்டு அழுத்தத்தை முன்கணிக்கும் ஒரு முடிவெடுக்கும் ஆதரவு கட்டமைப்பாகும். இது நேரடி நுண்ணறிவு மற்றும் முன்கணிப்பு பகுப்பாய்வு மூலம் செயலூக்கமான திறன் மேலாண்மையை செயல்படுத்துகிறது.'
    },
    
    proactiveVsReactive: {
      title: 'செயலூக்கமான vs எதிர்வினை ஆளுமை',
      reactive: {
        title: 'எதிர்வினை (தற்போதைய)',
        points: [
          'குடிமக்கள் புகார்களுக்குப் பிறகு நடவடிக்கை',
          'சேவை இடையூறுகள் ஏற்கனவே நிகழ்ந்தன',
          'நீண்ட வரிசைகள் மற்றும் காத்திருப்பு நேரங்கள்',
          'குடிமக்கள் அதிருப்தி'
        ]
      },
      proactive: {
        title: 'செயலூக்கமான (ACAS)',
        points: [
          'அழுத்தம் ஏற்படுவதற்கு முன் முன்கணிக்கவும்',
          'முன்கூட்டிய வள பயன்பாடு',
          'வரிசை உருவாக்கத்தைத் தடுக்கவும்',
          'மேம்படுத்தப்பட்ட குடிமக்கள் அனுபவம்'
        ]
      }
    },
    
    baselineConcept: {
      title: 'அடிப்படையைப் புரிந்துகொள்வது',
      content: '"அடிப்படை" என்பது ஒரு மாநிலத்தின் சாதாரண செயல்பாட்டு நடத்தை முறைகளைக் குறிக்கிறது. ACAS திருஷ்டி மாநில-அஞ்ஞானமானது மற்றும் அந்த பகுதிக்கான அடிப்படையை மீண்டும் கணக்கிடுவதன் மூலம் எங்கும் பயன்படுத்தலாம். தமிழ்நாடு பைலட் நாடு தழுவிய அளவிடுதலுக்கான வழிமுறையை நிறுவுகிறது.'
    },
    
    stressTriggers: {
      title: 'அழுத்த தூண்டுதல்கள் அடையாளம் காணப்பட்டன (தமிழ்நாடு)',
      subtitle: 'ELCOT/UIDAI ஆல் நிர்வகிக்கப்படுகிறது',
      triggers: [
        {
          icon: '🎓',
          title: 'மாணவர் MBU சுழற்சிகள்',
          desc: 'கல்வி நிறுவனங்களுக்கான கட்டாய உயிரியல் புதுப்பிப்புகள்'
        },
        {
          icon: '🚶',
          title: 'இடம்பெயர்வு அதிகரிப்பு',
          desc: 'பருவகால பணியாளர் இயக்க முறைகள்'
        },
        {
          icon: '💰',
          title: 'நலன்புரி காலக்கெடு',
          desc: 'அரசாங்க திட்ட பதிவு காலங்கள்'
        },
        {
          icon: '📅',
          title: 'ஆண்டு இறுதி அவசரம்',
          desc: 'நிதியாண்டு இறுதி ஆவண தேவைகள்'
        }
      ]
    },
    
    privacyCompliance: {
      title: 'தனியுரிமை மற்றும் இணக்கம்',
      badge: 'பூஜ்ஜிய CIDR அணுகல்',
      points: [
        'ஒருங்கிணைக்கப்பட்ட செயல்பாட்டு மெட்டாடேட்டாவை மட்டுமே பயன்படுத்துகிறது',
        'CIDR மத்திய களஞ்சியங்களுக்கு அணுகல் இல்லை',
        'தனியார் குடியிருப்பாளர் அடையாள தரவு செயலாக்கப்படவில்லை',
        'UIDAI தரவு பாதுகாப்பு வழிகாட்டுதல்களுக்கு இணங்குகிறது',
        'மாநில அளவிலான செயல்பாட்டு நுண்ணறிவு மட்டுமே'
      ]
    },
    
    systemFlow: {
      title: 'அமைப்பு கட்டமைப்பு',
      nodes: [
        'UIDAI திறந்த APIகள்',
        'ML கோர்: XGBoost/GNN',
        'n8n தன்னியக்கம்',
        'உலகளாவிய தணிக்கை பதிவு',
        'டாஷ்போர்டு'
      ]
    },
    
    // Audit Log
    auditLog: {
      title: 'நேரடி தணிக்கை பதிவு',
      subtitle: 'ACAS திருஷ்டி அமைப்பிலிருந்து நேரடி நுண்ணறிவு ஊட்டம்',
      columns: {
        timestamp: 'நேர முத்திரை',
        district: 'மாவட்டம்',
        intelligence: 'நுண்ணறிவு மற்றும் காரணம்',
        status: 'சரிபார்ப்பு நிலை'
      },
      statusVerified: 'சரிபார்க்கப்பட்டது',
      statusPending: 'நடவடிக்கை நிலுவையில்',
      loading: 'தணிக்கை உள்ளீடுகளை ஏற்றுகிறது...',
      error: 'அமைப்பு ஆஃப்லைன் - பிராந்திய முனையை சரிபார்க்கிறது',
      noData: 'தணிக்கை உள்ளீடுகள் இல்லை'
    },
    
    // Spatial Map
    spatialMap: {
      title: 'இடஞ்சார் அழுத்த வரைபடம்',
      subtitle: 'செயல்பாட்டு அழுத்தத்தின் புவியியல் விநியோகம்',
      legend: 'அழுத்த நிலை புராணம்',
      stable: 'நிலையான (0-30)',
      warning: 'எச்சரிக்கை (31-60)',
      critical: 'முக்கியமான (61-100)',
      loading: 'வரைபட தரவை ஏற்றுகிறது...',
      error: 'வரைபட தரவை ஏற்ற முடியவில்லை'
    },
    
    // Loading States
    loading: {
      initializing: 'மெட்டாடேட்டா அடிப்படையை சரிபார்க்கிறது...',
      fetchingData: 'நேரடி நுண்ணறிவைப் பெறுகிறது...',
      processingMap: 'இடஞ்சார் தரவை செயலாக்குகிறது...'
    }
  }
};
