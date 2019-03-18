import React, {Component} from 'react';
import connect from '../store/connect';
import {handleContent} from './utils';
import {emptyValue} from '../utils';
import {homeMenuData} from '../data';
import RouteContainer from './routeContainer';
import api from '../data/api';

class RouteOne extends Component {

  constructor(props) {
    super(props);
    this.init();
  }

  async init() {
    const {
      drawer: {initDrawer},
      flyout: {initFlyout},
      contact: {setContacts},
      company: {setCompanies},
      product: {setProducts}
    } = this.props.actions;
    let {contact, company, product} = this.props.state;
    initDrawer({context: 'main'});
    initFlyout({context: 'main'});
    try {
      if (emptyValue(contact) || emptyValue(company) || emptyValue(product)) {
        contact = await api.getContacts();
        company = await api.getCompanies();
        product = await api.getProducts();
      }
    }
    catch(error) {
      console.error(error); // eslint-disable-line no-console
    }
    setContacts({contacts: contact.data.data});
    setCompanies({companies: company.data.data});
    setProducts({
      products: product.data.data
    });
  }

  handleMenuItem = (evt) => {
    evt.preventDefault();
    const content = evt.target.dataset.content || evt.target.parentElement.dataset.content;
    const mainContent = this.handleMainContent(content);
    this.setState(() => ({mainContent}));
    const vw = document.documentElement.clientWidth;
    if (vw <= 759) {
      const {drawer} = this.props.actions;
      drawer.toggleDrawer({context: 'home'});
    }
  }

  handleContentUpdate = (content) => {
    this.setState(() => ({
      mainContent: content
    }));
  }

  handleMainContent = (content) => {
    return handleContent(content, this.handleContentUpdate);
  }

  state = {mainContent: this.handleMainContent()}

  render() {
    return (
      <RouteContainer
        menuContent={homeMenuData}
        mainContent={this.state.mainContent}
        handleMenuItem={this.handleMenuItem}
      />
    );
  }

}

export default connect(RouteOne);
