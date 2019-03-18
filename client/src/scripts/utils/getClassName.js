/**
 * Check the component state
 * @param {boolean} isActive - True if toggle initiatied
 * @returns {string} The active className
 */

export default function getClassName(isActive) {
  let activeClassName = '';
  if (isActive) activeClassName = 'is-active';
  return activeClassName;
}
