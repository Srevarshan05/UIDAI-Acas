'use client';

import { motion } from 'framer-motion';
import { BILINGUAL_CONTENT } from '@/lib/constants';
import SystemFlow from './SystemFlow';

export default function LandingPage({ language = 'en', onNavigate }) {
  const content = BILINGUAL_CONTENT[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section with Action Buttons */}
      <motion.div
        className="bg-gradient-to-r from-gov-blue to-gov-blue-700 text-white rounded-gov shadow-gov-card p-8"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide mb-4">
            {content.title}
          </h1>
          <p className="text-xl font-bold mb-2">{content.subtitle}</p>
          <p className="text-gov-blue-100 mb-8">{content.tagline}</p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('map')}
              className="bg-safety-orange hover:bg-safety-orange-600 text-white font-black uppercase tracking-wide px-8 py-4 rounded-gov shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              {content.viewMap}
            </button>
            <button
              onClick={() => onNavigate('logs')}
              className="bg-white text-gov-blue hover:bg-gray-100 font-black uppercase tracking-wide px-8 py-4 rounded-gov shadow-lg transition-all hover:shadow-xl hover:scale-105"
            >
              {content.viewLog}
            </button>
          </div>
        </div>
      </motion.div>

      {/* What is ACAS Dhristi */}
      <motion.div
        className="bg-white rounded-gov shadow-gov-card p-8 border border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-black text-gov-blue uppercase tracking-wide mb-4 border-l-4 border-safety-orange pl-4">
          {content.whatIsAcas.title}
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {content.whatIsAcas.content}
        </p>
      </motion.div>

      {/* Proactive vs Reactive */}
      <motion.div
        className="bg-white rounded-gov shadow-gov-card p-8 border border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-black text-gov-blue uppercase tracking-wide mb-6 border-l-4 border-safety-orange pl-4">
          {content.proactiveVsReactive.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Reactive */}
          <div className="border-2 border-red-300 rounded-gov p-6 bg-red-50">
            <h3 className="text-xl font-black text-red-700 uppercase mb-4 flex items-center gap-2">
              <span className="text-2xl">❌</span>
              {content.proactiveVsReactive.reactive.title}
            </h3>
            <ul className="space-y-2">
              {content.proactiveVsReactive.reactive.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Proactive */}
          <div className="border-2 border-green-300 rounded-gov p-6 bg-green-50">
            <h3 className="text-xl font-black text-green-700 uppercase mb-4 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              {content.proactiveVsReactive.proactive.title}
            </h3>
            <ul className="space-y-2">
              {content.proactiveVsReactive.proactive.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Baseline Concept */}
      <motion.div
        className="bg-white rounded-gov shadow-gov-card p-8 border border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-black text-gov-blue uppercase tracking-wide mb-4 border-l-4 border-safety-orange pl-4">
          {content.baselineConcept.title}
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {content.baselineConcept.content}
        </p>
      </motion.div>

      {/* Stress Triggers */}
      <motion.div
        className="bg-white rounded-gov shadow-gov-card p-8 border border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-black text-gov-blue uppercase tracking-wide mb-2 border-l-4 border-safety-orange pl-4">
          {content.stressTriggers.title}
        </h2>
        <p className="text-sm text-gray-600 mb-6 pl-4 font-semibold">
          {content.stressTriggers.subtitle}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.stressTriggers.triggers.map((trigger, idx) => (
            <motion.div
              key={idx}
              className="border border-gray-300 rounded-gov p-4 hover:shadow-md transition-shadow bg-gray-50"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-4xl mb-3 text-center">{trigger.icon}</div>
              <h4 className="font-black text-gov-blue text-center mb-2 uppercase text-sm">
                {trigger.title}
              </h4>
              <p className="text-gray-600 text-sm text-center">{trigger.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Privacy & Compliance */}
      <motion.div
        className="bg-white rounded-gov shadow-gov-card p-8 border-2 border-green-300"
        variants={itemVariants}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-green-100 text-green-800 font-black uppercase text-xs px-3 py-1 rounded-gov border border-green-300">
            {content.privacyCompliance.badge}
          </div>
          <h2 className="text-2xl font-black text-gov-blue uppercase tracking-wide flex-1">
            {content.privacyCompliance.title}
          </h2>
        </div>
        <ul className="space-y-3">
          {content.privacyCompliance.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-700">
              <span className="text-green-600 text-xl mt-0.5">🔒</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* System Flow */}
      <motion.div variants={itemVariants}>
        <SystemFlow language={language} />
      </motion.div>
    </motion.div>
  );
}
