import React from 'react';
import {Button} from '@0bie/pattern-lib-react';
import {CompanyItem, Sidebar} from '../components';
import connect from '../store/connect';
import {
  handleCompanyAdd,
  handleCompanyDelete,
  handleCompanyOffer
} from './company/utils';
import {sortObjects} from '../utils';
import CompanyPlaceholder from '../components/placeholder/companies';

const Company = ({state, actions}) => {

  const {companies} = state.company;
  const {toggleFlyout} = actions.flyout;
  companies && sortObjects(companies, 'name');
  return (
    <div className="content--company">
      <header className="header--panel header--company">
        <h3 className="title--panel">Companies</h3>
        <div className="company-add">
          <Button
            size="xs"
            label="new company"
            classNames={['btn--primary']}
            onClick={handleCompanyAdd.bind(null, toggleFlyout)}
          />
        </div>
      </header>
      <section className="company-section">
        <ul className="list--company">
          {companies.length > 0 && companies.map((company) =>
            <CompanyItem
              key={company.id}
              company={company}
              handleOffer={handleCompanyOffer.bind(null, toggleFlyout, company)}
              handleDelete={handleCompanyDelete.bind(null, toggleFlyout, company)}
            />)}
          {!companies || companies.length <= 0 &&
            <CompanyPlaceholder />}
        </ul>
      </section>
      <Sidebar />
    </div>
  );

};

export default connect(Company);
