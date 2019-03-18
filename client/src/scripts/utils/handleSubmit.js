import {handleNoticeDismiss} from './index';

/**
 * Submit a contact form
 * @param {function} handleNotice - The notice toggle action
 * @param {number} duration - The minimum duration before dismissing a notice
 * @returns {undefined}
 */

export default function handleSubmit({handleNotice, duration, message}) {
  handleNotice({
    status: 'success',
    message
  });
  handleNoticeDismiss(handleNotice, duration);
}
