import {createStructuredSelector} from 'reselect';
import {
  getUser,
  getDrawer,
  getNotice,
  getFlyout,
  getContacts,
  getProducts,
  getCompanies,
} from '../data/getters';

/**
 * Map data state to component props
 */

export default function mapStateToProps() {
  return createStructuredSelector({
    user: getUser,
    drawer: getDrawer,
    notice: getNotice,
    flyout: getFlyout,
    contact: getContacts,
    company: getCompanies,
    product: getProducts
  });
}
