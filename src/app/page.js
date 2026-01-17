'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BILINGUAL_CONTENT } from '@/lib/constants';
import LoadingState from '@/components/LoadingState';
import LandingPage from '@/components/LandingPage';
import AuditLog from '@/components/AuditLog';
import SpatialMap from '@/components/SpatialMap';

export default function Home() {
  const [currentView, setCurrentView] = useState('overview');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const content = BILINGUAL_CONTENT[language];

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingState message={content.loading.initializing} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Professional Header with UIDAI Logo */}
      <header className="bg-white border-b-2 border-primary shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Branding */}
            <div className="flex items-center gap-4">
              {/* UIDAI Logo */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-primary leading-tight">
                    ACAS Dhristi
                  </h1>
                  <p className="text-xs font-medium">
                    <span className="text-orange-600 font-bold">UIDAI</span> <span className="text-gray-600">Capacity Advisory System</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation and Language Toggle */}
            <div className="flex items-center gap-4">
              {currentView !== 'overview' && (
                <button
                  onClick={() => handleNavigate('overview')}
                  className="hidden md:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Dashboard
                </button>
              )}

              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-all ${
                    language === 'en'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ta')}
                  className={`px-3 py-1.5 rounded-md font-semibold text-sm transition-all ${
                    language === 'ta'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard Overview */}
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4">
                    Predictive Governance Dashboard
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Real-time intelligence for proactive Aadhaar center capacity management across Tamil Nadu
                  </p>
                </div>

                {/* Main Navigation Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {/* Spatial Map Card */}
                  <motion.button
                    onClick={() => handleNavigate('map')}
                    className="group relative bg-gradient-to-br from-primary to-primary-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-3">
                        Spatial Stress Map
                      </h3>
                      <p className="text-blue-100 mb-6 leading-relaxed">
                        View geographic distribution of predicted stress levels across all Aadhaar centers in Tamil Nadu with real-time updates
                      </p>
                      <div className="flex items-center text-sm font-semibold">
                        <span>Explore Map</span>
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>

                  {/* Audit Log Card */}
                  <motion.button
                    onClick={() => handleNavigate('logs')}
                    className="group relative bg-gradient-to-br from-secondary to-secondary-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-left overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-3">
                        Real-Time Audit Log
                      </h3>
                      <p className="text-purple-100 mb-6 leading-relaxed">
                        Access live intelligence feed showing predicted stress, recommended actions, and verification status for each center
                      </p>
                      <div className="flex items-center text-sm font-semibold">
                        <span>View Audit Log</span>
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Info Section */}
                <LandingPage language={language} onNavigate={handleNavigate} />
              </div>
            </motion.div>
          )}

          {currentView === 'logs' && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AuditLog language={language} />
            </motion.div>
          )}

          {currentView === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpatialMap language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Professional Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            {/* About */}
            <div>
              <h3 className="font-heading font-bold text-gray-900 mb-3">
                About ACAS Dhristi
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A pilot predictive governance framework developed by the National Informatics Centre (NIC) for proactive Aadhaar capacity management.
              </p>
            </div>

            {/* Data Source Notice */}
            <div>
              <h3 className="font-heading font-bold text-gray-900 mb-3">
                Data Source
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>Note:</strong> This system uses data from a provided bulk dataset. The Google Sheets API is configured with a 10-row fetch limit for demonstration purposes, enabling better predictions through comprehensive historical data analysis.
              </p>
            </div>

            {/* Managed By */}
            <div>
              <h3 className="font-heading font-bold text-gray-900 mb-3">
                Managed By
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>ELCOT / UIDAI Tamil Nadu</strong>
                <br />
                National Informatics Centre
                <br />
                Government of India
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 text-center md:text-left">
                © 2024 ACAS Dhristi - Predictive Governance Framework | Tamil Nadu Pilot
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
