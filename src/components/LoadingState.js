'use client';

import { motion } from 'framer-motion';

export default function LoadingState({ message = 'Verifying Metadata Baseline...' }) {
  return (
    <div className="min-h-screen bg-gov-bg flex items-center justify-center">
      <div className="text-center">
        {/* Government Logo/Emblem Placeholder */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 border-4 border-gov-blue rounded-full flex items-center justify-center"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-16 h-16 border-4 border-t-safety-orange border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
        </motion.div>

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-black text-gov-blue uppercase tracking-wide mb-2">
            ACAS DHRISTI
          </h2>
          <p className="text-gray-600 font-medium">{message}</p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gov-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* System Status */}
        <motion.div
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded-gov w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-gov w-full"></div>
      <div className="h-4 bg-gray-200 rounded-gov w-5/6"></div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="h-32 bg-gray-200 rounded-gov"></div>
        <div className="h-32 bg-gray-200 rounded-gov"></div>
        <div className="h-32 bg-gray-200 rounded-gov"></div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-gov w-1/6"></div>
          <div className="h-12 bg-gray-200 rounded-gov w-1/6"></div>
          <div className="h-12 bg-gray-200 rounded-gov flex-1"></div>
          <div className="h-12 bg-gray-200 rounded-gov w-32"></div>
        </div>
      ))}
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[600px] bg-gray-200 rounded-lg mb-6"></div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}
