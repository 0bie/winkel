import client from './client';
import {
  getUser,
  getProducts,
  getContacts,
  getCompanies
} from '../queries';
import {
  editUser,
  sendOrder,
  addContact,
  addCompany,
  editContact,
  deleteContact,
  deleteCompany,
  messageContact
} from '../mutations';

export default {

  /**
   * Get current user
   * @returns {Promise}
   */
  getUser() {
    return client.post('', {query: getUser});
  },

  /**
   * Edit user info
   * @returns {Promise}
   */
  editUser(variables) {
    return client.post('', {query: editUser, variables});
  },

  /**
   * Get all contacts
   * @returns {Promise}
   */
  getContacts() {
    return client.post('', {query: getContacts});
  },

  /**
   * Get all products
   * @returns {Promise}
   */
  getProducts() {
    return client.post('', {query: getProducts});
  },

  /**
   * Get all companies
   * @returns {Promise}
   */
  getCompanies() {
    return client.post('', {query: getCompanies});
  },

  /**
   * Create a new contact
   * @returns {Promise}
   */
  addContact(variables) {
    return client.post('', {query: addContact, variables});
  },

  /**
   * Edit a contact
   * @returns {Promise}
   */
  editContact(variables) {
    return client.post('', {query: editContact, variables});
  },

  /**
   * Delete a contact
   * @returns {Promise}
   */
  deleteContact(variables) {
    return client.post('', {query: deleteContact, variables});
  },

  /**
   * Message a contact
   * @returns {Promise}
   */
  messageContact(variables) {
    return client.post('', {query: messageContact, variables});
  },

  /**
   * Create a new company
   * @returns {Promise}
   */
  addCompany(variables) {
    return client.post('', {query: addCompany, variables});
  },

  /**
   * Delete a company
   * @returns {Promise}
   */
  deleteCompany(variables) {
    return client.post('', {query: deleteCompany, variables});
  },

  /**
   * Send a new order
   * @returns {Promise}
   */
  sendOrder(variables) {
    return client.post('', {query: sendOrder, variables});
  }

};
