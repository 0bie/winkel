import api from '../../data/api';
import {emptyValue, handleSubmit} from '../../utils';

export default async function handleOrder(actions, state, evt) {

  evt.preventDefault();
  const form = document.getElementById('form_order');
  if (!form) {
    throw new Error('handleOrder requires a valid form element');
  }
  const order = {};
  const orderData = new FormData(form);
  for (const [key, value] of orderData.entries()) {
    if (key === 'units') {
      order[key] = parseInt(value);
    } else {
      if (value.length > 0) {
        order[key] = value;
      }
    }
  }
  const productIndex = state.product.products.findIndex((product) => {
    return product.id === order.product;
  });

  const companyIndex = state.company.companies.findIndex((company) => {
    return company.name === order.company;
  });

  const {id, ...productInfo} = state.product.products[productIndex]; // eslint-disable-line no-unused-vars
  if (!order.id) {
    var {id: companyId, ...companyInfo} = state.company.companies[companyIndex]; // eslint-disable-line no-unused-vars
  }
  const orderDetails = Object.assign({}, order, {
    id: order.id || companyId,
    input: {
      units: order.units,
      products: [productInfo],
      delivery: order.delivery
    }
  });

  if (evt.target.closest('.panel-action')) {
    if (emptyValue(orderDetails)) return;
    const response = await api.sendOrder(orderDetails);
    if (!emptyValue(response.data.data)) {
      handleSubmit({
        duration: 5000,
        message: 'Your order has been sent.',
        handleNotice: actions.notice.toggleNotice
      });
      form.reset();
    } else {
      // handle error notice
    }
  }

}
