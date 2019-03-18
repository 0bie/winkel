import api from '../../data/api';
import {getFullName} from './index';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleEditUser(actions, evt) {

  evt.preventDefault();
  const form = document.getElementById('user_edit');
  if (!form) {
    throw new Error('handleEditUser requires a valid form element');
  }

  const userInfo = {};
  const userInfoData = new FormData(form);
  for (const [key, value] of userInfoData .entries()) {
    if (value.length > 0) {
      userInfo[key] = value;
    }
  }

  const userInput = {
    input: userInfo
  };

  if (evt.target.closest('.panel-action')) {
    if (emptyValue(userInfo)) return;
    const response = await api.editUser(userInput);
    if (!emptyValue(response.data.data)) {
      const {updateMe: userData} = response.data.data;
      actions.user.editUser(userData);
      handleSubmit({
        duration: 5000,
        handleNotice: actions.notice.toggleNotice,
        message: `${getFullName(userData.firstName, userData.lastName)} was updated successfully.`,
      });
      form.reset();
    } else {
      // handle notice error
    }
  }

}
