'use client';

import { motion } from 'framer-motion';
import { BILINGUAL_CONTENT } from '@/lib/constants';

export default function SystemFlow({ language = 'en' }) {
  const content = BILINGUAL_CONTENT[language].systemFlow;
  const nodes = content.nodes;

  return (
    <div className="bg-white rounded-gov shadow-gov-card p-8 border border-gray-200">
      <h3 className="text-xl font-black text-gov-blue uppercase tracking-wide mb-6 text-center">
        {content.title}
      </h3>

      {/* Horizontal Pipeline */}
      <div className="relative">
        {/* Nodes Container */}
        <div className="flex items-center justify-between gap-4">
          {nodes.map((node, index) => (
            <div key={index} className="flex items-center flex-1">
              {/* Node */}
              <motion.div
                className="relative flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-gov-blue text-white px-4 py-3 rounded-gov text-center font-bold text-sm shadow-md">
                  {node}
                </div>
              </motion.div>

              {/* Arrow */}
              {index < nodes.length - 1 && (
                <div className="relative mx-2">
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    className="text-gray-400"
                  >
                    <path
                      d="M0 10 L30 10 M30 10 L25 5 M30 10 L25 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Animated Pulse */}
                  <motion.div
                    className="absolute top-1/2 left-0 w-3 h-3 bg-safety-orange rounded-full -translate-y-1/2"
                    animate={{
                      x: [0, 40],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "linear"
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-safety-orange rounded-full animate-pulse"></div>
            <span>Metadata Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gov-blue rounded-full"></div>
            <span>Processing Node</span>
          </div>
        </div>
      </div>

      {/* Mobile View - Vertical Layout */}
      <div className="md:hidden mt-8">
        <div className="space-y-4">
          {nodes.map((node, index) => (
            <div key={index}>
              <motion.div
                className="bg-gov-blue text-white px-4 py-3 rounded-gov text-center font-bold text-sm shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {node}
              </motion.div>
              {index < nodes.length - 1 && (
                <div className="flex justify-center my-2">
                  <svg
                    width="20"
                    height="30"
                    viewBox="0 0 20 30"
                    fill="none"
                    className="text-gray-400"
                  >
                    <path
                      d="M10 0 L10 20 M10 20 L5 15 M10 20 L15 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
