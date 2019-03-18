import api from '../../data/api';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleAddContact(actions, evt) {

  evt.preventDefault();
  const form = document.getElementById('company_add');
  if (!form) {
    throw new Error('handleAddCompany requires a valid form element');
  }

  const info = {};
  const infoData = new FormData(form);
  for (const [key, value] of infoData.entries()) {
    if (value.length > 0) {
      if (key === 'image') {
        info[key] = {src: value, alt: 'alternate image text'};
      } else {
        info[key] = value;
      }
    }
  }

  if (evt.target.closest('.panel-action')) {
    if (emptyValue(info)) return;
    const response = await api.addCompany(info);
    if (!emptyValue(response.data.data)) {
      const {newCompany: companyData} = response.data.data;
      actions.company.addCompany(companyData);
      handleSubmit({
        duration: 5000,
        handleNotice: actions.notice.toggleNotice,
        message: `${companyData.name} was added successfully.`,
      });
      form.reset();
    }
  }

}
