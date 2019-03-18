import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {
  drawer,
  user,
  notice,
  flyout,
  contact,
  company,
  product
} from './modules';

export default (history) => combineReducers({
  drawer,
  user,
  notice,
  flyout,
  contact,
  company,
  product,
  router: connectRouter(history)
});
