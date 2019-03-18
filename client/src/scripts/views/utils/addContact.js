import api from '../../data/api';
import {getFullName} from './index';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleAddContact(actions, evt) {

  evt.preventDefault();
  const form = document.getElementById('contact_add');
  if (!form) {
    throw new Error('handleAddContact requires a valid form element');
  }

  const info = {};
  const infoData = new FormData(form);
  for (const [key, value] of infoData.entries()) {
    if (value.length > 0) {
      info[key] = value;
    }
  }

  if (evt.target.closest('.panel-action')) {
    if (emptyValue(info)) return;
    const response = await api.addContact(info);
    if (!emptyValue(response.data.data)) {
      const {newContact} = response.data.data;
      const contactData = Object.assign({}, newContact, {
        createdAt: new Date().toISOString(),
      });
      actions.contact.addContact(contactData);
      handleSubmit({
        duration: 5000,
        handleNotice: actions.notice.toggleNotice,
        message: `${getFullName(contactData.firstName, contactData.lastName)} was added successfully.`,
      });
      form.reset();
    }
  }

}
