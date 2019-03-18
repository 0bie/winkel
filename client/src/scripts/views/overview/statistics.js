import React, {Fragment} from 'react';
import {
  CompanyChart,
  ContactChart,
  ProductChart
} from '../../components/chart';
import connect from '../../store/connect';
import {formatNumber, pluralize} from '../../utils';

const Statistics = ({state}) => {

  return (
    /* eslint-disable react/no-unescaped-entities */
    <section className="overview-stats">
      <ul className="stats-list">
        <li className="stats-item width-50--small">
          {state.contact.contacts &&
            <Fragment>
              <header className="stats-header">
                <h3>
                  <span className="stats-title">contacts</span>
                  {(state.user.messages > 0) &&
                    <small>
                      You've messaged {state.user.messages} {pluralize('contact', state.user.messages.length)}
                    </small>}
                </h3>
              </header>
              <div className="stats-content">
                <span className="stats-value">
                  {formatNumber(state.contact.contacts.length)}
                </span>
              </div>
            </Fragment>}
          <footer className="stats-footer">
            <ContactChart />
          </footer>
        </li>
        <li className="stats-item width-50--small">
          {state.product.products &&
            <Fragment>
              <header className="stats-header">
                <h3>
                  <span className="stats-title">products</span>
                  {(state.user.orders > 0) &&
                    <small>
                      You've ordered {state.user.orders} {pluralize('product', state.user.orders.length)}
                    </small>}
                </h3>
              </header>
              <div className="stats-content">
                <span className="stats-value">
                  {formatNumber(state.product.products.length)}
                </span>
              </div>
            </Fragment>}
          <footer className="stats-footer">
            <ProductChart />
          </footer>
        </li>
        <li className="stats-item">
          {state.company.companies &&
            <Fragment>
              <header className="stats-header">
                <h3>
                  <span className="stats-title">companies</span>
                  {(state.user.offers > 0) &&
                    <small>
                      You've inquired on {state.user.offers} {pluralize('offer', state.user.offers.length)}
                    </small>}
                </h3>
              </header>
              <div className="stats-content">
                <span className="stats-value">
                  {formatNumber(state.company.companies.length)}
                </span>
              </div>
            </Fragment>}
          <footer className="stats-footer">
            <CompanyChart />
          </footer>
        </li>
      </ul>
    </section>
  );

};

export default connect(Statistics);
