// ACAS Dhristi - Utility Functions
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { STRESS_THRESHOLDS } from './constants';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Get stress level category based on score
 * @param {number} score - Stress score (0-100)
 * @returns {Object} Stress level info
 */
export function getStressLevel(score) {
  if (score >= STRESS_THRESHOLDS.CRITICAL.min) {
    return STRESS_THRESHOLDS.CRITICAL;
  } else if (score >= STRESS_THRESHOLDS.WARNING.min) {
    return STRESS_THRESHOLDS.WARNING;
  } else {
    return STRESS_THRESHOLDS.STABLE;
  }
}

/**
 * Format timestamp to readable format
 * @param {string} timestamp - ISO timestamp or date string
 * @returns {string} Formatted date and time
 */
export function formatTimestamp(timestamp) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return timestamp;
  }
}

/**
 * Get status badge color based on acknowledgment status
 * @param {string} status - Acknowledgment status
 * @returns {string} Tailwind color classes
 */
export function getStatusBadgeColor(status) {
  const normalizedStatus = (status || '').toLowerCase();
  
  if (normalizedStatus.includes('acknowledged') || normalizedStatus.includes('verified')) {
    return 'bg-green-100 text-green-800 border-green-300';
  }
  
  return 'bg-red-100 text-red-800 border-red-300 animate-pulse';
}

/**
 * Get priority level color
 * @param {number} priority - Priority level (1-5)
 * @returns {string} Tailwind color classes
 */
export function getPriorityColor(priority) {
  switch (priority) {
    case 5:
      return 'text-red-700 bg-red-50';
    case 4:
      return 'text-orange-700 bg-orange-50';
    case 3:
      return 'text-yellow-700 bg-yellow-50';
    case 2:
      return 'text-blue-700 bg-blue-50';
    default:
      return 'text-green-700 bg-green-50';
  }
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
