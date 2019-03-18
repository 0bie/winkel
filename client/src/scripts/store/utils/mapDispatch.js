import {
  setUser,
  editUser,
  initDrawer,
  toggleDrawer,
  toggleNotice,
  initFlyout,
  toggleFlyout,
  addContact,
  editContact,
  setContacts,
  deleteContact,
  setCompanies,
  addCompany,
  deleteCompany,
  setProducts
} from '../data/actions';

/**
 * Map data actions to component props
 * @param {function} dispatch - Redux dispatch method
 */

export default function mapDispatchToProps(dispatch) {
  return {
    user: {
      setUser: (user) => dispatch(setUser(user)),
      editUser: (user) => dispatch(editUser(user))
    },
    drawer: {
      initDrawer: (context) => dispatch(initDrawer(context)),
      toggleDrawer: (context) => dispatch(toggleDrawer(context))
    },
    notice: {
      toggleNotice: (message, duration) => dispatch(toggleNotice(message, duration))
    },
    flyout: {
      initFlyout: (context) => dispatch(initFlyout(context)),
      toggleFlyout: (context) => dispatch(toggleFlyout(context))
    },
    contact: {
      addContact: (contact) => dispatch(addContact(contact)),
      editContact: (contact) => dispatch(editContact(contact)),
      setContacts: (contacts) => dispatch(setContacts(contacts)),
      deleteContact: (contact) => dispatch(deleteContact(contact))
    },
    company: {
      addCompany: (company) => dispatch(addCompany(company)),
      deleteCompany: (company) => dispatch(deleteCompany(company)),
      setCompanies: (companies) => dispatch(setCompanies(companies))
    },
    product: {
      setProducts: (products) => dispatch(setProducts(products))
    }
  };
}
