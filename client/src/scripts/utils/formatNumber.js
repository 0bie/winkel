/**
 * Format numbers using `Intl.NumberFormat` constructor
 * @param {number} value
 * @returns {string}
 */

export default function formatNumber(value) {
  if (window.Intl && window.Intl.NumberFormat) {
    return new Intl.NumberFormat().format(value);
  }
  return value;
}
