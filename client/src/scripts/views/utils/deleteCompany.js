import api from '../../data/api';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleDeleteCompany(actions, evt) {

  evt.preventDefault();
  const form = document.getElementById('company_delete');
  if (!form) {
    throw new Error('handleDeleteCompany requires a valid form element');
  }

  const companyInfo = {};
  const companyInfoData = new FormData(form);
  for (const [key, value] of companyInfoData .entries()) {
    if (value.length > 0) {
      companyInfo[key] = value;
    }
  }

  if (evt.target.closest('.panel-action')) {
    if (emptyValue(companyInfo)) return;
    const response = await api.deleteCompany(companyInfo);
    if (!emptyValue(response.data.data)) {
      const {removeCompany: companyData} = response.data.data;
      actions.company.deleteCompany(companyData);
      handleSubmit({
        duration: 5000,
        handleNotice: actions.notice.toggleNotice,
        message: `${companyData.name} was deleted successfully.`,
      });
      form.reset();
    } else {
      // handle notice error
    }
  }

}
