import api from '../../data/api';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleMessageContact(actions, evt) {

  evt.preventDefault();
  const form = document.getElementById('contact_message');
  if (!form) {
    throw new Error('handleMessageContact requires a valid form element');
  }
  const message = {};
  const messageData = new FormData(form);
  for (const [key, value] of messageData.entries()) {
    if (value.length > 0) {
      message[key] = value;
    }
  }
  if (evt.target.closest('.panel-action')) {
    if (emptyValue(message)) return;
    if (!message.id) return;
    const response = await api.messageContact(message);
    if (!emptyValue(response.data.data)) {
      handleSubmit({
        duration: 5000,
        handleNotice: actions.notice.toggleNotice,
        message: 'Your message has been sent.',
      });
      form.reset();
    }
  }

}
