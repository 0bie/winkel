const initialState = {};

function defineAction(name) {
  return `app/company/${name}`;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COMPANY:
      return Object.assign({}, state, {
        companies: [...state.companies, action.payload]
      });
    case DELETE_COMPANY:
      const companyName = action.payload.name;
      const companiesDelete = [].concat(state.companies);
      const companiesDeleteIndex = companiesDelete.findIndex((company) => company.name === companyName);
      companiesDelete.splice(companiesDeleteIndex, 1);
      return {companies: companiesDelete};
    case SET_COMPANIES:
      return Object.assign({}, state, {...action.payload.companies});
    default:
      return state;
  }
}

export function getCompanies(state) {
  return state.company;
}

const ADD_COMPANY = defineAction('ADD_COMPANY');
const SET_COMPANIES = defineAction('SET_COMPANIES');
const DELETE_COMPANY = defineAction('DELETE_COMPANY');

export function addCompany(payload) {
  return {payload, type: ADD_COMPANY};
}

export function setCompanies(payload) {
  return {payload, type: SET_COMPANIES};
}

export function deleteCompany(payload) {
  return {payload, type: DELETE_COMPANY};
}
