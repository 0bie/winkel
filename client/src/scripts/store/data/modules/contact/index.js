const initialState = {};

function defineAction(name) {
  return `app/contact/${name}`;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CONTACT:
      return Object.assign({}, state, {
        contacts: [...state.contacts, action.payload]
      });
    case EDIT_CONTACT:
      const contactId = action.payload.id;
      const contactsEdit = [].concat(state.contacts);
      const contactIndex = contactsEdit.findIndex((contact) => contact.id === contactId);
      const updatedContact = Object.assign({}, contactsEdit[contactIndex], {...action.payload});
      contactsEdit[contactIndex] = updatedContact;
      return {contacts: contactsEdit};
    case DELETE_CONTACT:
      const contactEmail = action.payload.email;
      const contactsDelete = [].concat(state.contacts);
      const contactDeleteIndex = contactsDelete.findIndex((contact) => contact.email === contactEmail);
      contactsDelete.splice(contactDeleteIndex, 1);
      return {contacts: contactsDelete};
    case SET_CONTACTS:
      return Object.assign({}, state, {...action.payload.contacts});
    default:
      return state;
  }
}

export function getContacts(state) {
  return state.contact;
}

const ADD_CONTACT = defineAction('ADD_CONTACT');
const EDIT_CONTACT = defineAction('EDIT_CONTACT');
const SET_CONTACTS = defineAction('SET_CONTACTS');
const DELETE_CONTACT = defineAction('DELETE_CONTACT');

export function addContact(payload) {
  return {payload, type: ADD_CONTACT};
}

export function editContact(payload) {
  return {payload, type: EDIT_CONTACT};
}

export function setContacts(payload) {
  return {payload, type: SET_CONTACTS};
}

export function deleteContact(payload) {
  return {payload, type: DELETE_CONTACT};
}

