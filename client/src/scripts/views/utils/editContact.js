import api from '../../data/api';
import {getFullName} from './index';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleEditContact(actions, evt) {

  evt.preventDefault();
  const form = document.getElementById('contact_edit');
  if (!form) {
    throw new Error('handleEditContact requires a valid form element');
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
    const response = await api.editContact(contactInfo);
    if (!emptyValue(response.data.data)) {
      const {updateContact: contactData} = response.data.data;
      actions.contact.editContact(contactData);
      handleSubmit({
        duration: 5000,
        handleNotice: actions.notice.toggleNotice,
        message: `${getFullName(contactData.firstName, contactData.lastName)} was updated successfully.`,
      });
      form.reset();
    } else {
      // handle notice error
    }
  }

}
