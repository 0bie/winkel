import {errorIcon, infoIcon, successIcon} from '../data';

/**
 * Dismiss a notice message
 * @param {function} callback - The notice toggle action
 * @param {number} duration - The minimum duration before dismissing a notice
 * @returns {number} The timeout id
 */

export default function handleNotice(callback, duration) {
  return setTimeout(() => {
    const noticeContainer = document.querySelector('.notice-container');
    if (!noticeContainer) return null;
    noticeContainer.classList.add('notice-container--hidden');
    noticeContainer.addEventListener('transitionend', (evt) => {
      if (evt.propertyName !== 'visibility') return;
      callback({
        status: '',
        message: ''
      });
    });
  }, duration);
}

/**
 * Return properties for a notice icon
 * @param {string} status - The notice status
 * @returns {object} The icon properties
 */

export function getNoticeIcon(status) {
  if (status === 'error') {
    return errorIcon;
  } else if (status === 'warn') {
    return infoIcon;
  }
  return successIcon;
}
