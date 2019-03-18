import api from '../../data/api';
import {getFullName} from './index';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleDeleteContact(actions, evt) {

  evt.preventDefault();
  const form = document.getElementById('contact_delete');
  if (!form) {
    throw new Error('handleDeleteContact requires a valid form element');
  }

  const contactInfo = {};
  const contactInfoData = new FormData(form);
  for (const [key, value] of contactInfoData .entries()) {
    if (value.length > 0) {
      contactInfo[key] = value;
    }
  }

  if (evt.target.closest('.panel-action')) {
    if (emptyValue(contactInfo)) return;
    const response = await api.deleteContact(contactInfo);
    if (!emptyValue(response.data.data)) {
      const {removeContact: contactData} = response.data.data;
      actions.contact.deleteContact(contactData);
      handleSubmit({
        duration: 5000,
        handleNotice: actions.notice.toggleNotice,
        message: `${getFullName(contactData.firstName, contactData.lastName)} was deleted successfully.`,
      });
      form.reset();
    } else {
      // handle notice error
    }
  }

}
