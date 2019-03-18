import React, {Fragment} from 'react';
import {Button, Input} from '@0bie/pattern-lib-react';
import {renderSelectOptions} from './utils';
import connect from '../../store/connect';

const CompanyOffer = ({state, actions, company, handleCompanyOffer}) => {

  return (
    <Fragment>
      <form id="form_order" className="panel-form">
        <input name="id" value={company.id} type="hidden" />
        <div>
          <div className="panel-input mb--sm">
            <label className="input-label">choose a product</label>
            <select name="product" className="input input--xs input--full">
              <option value="">Choose a product</option>
              {company && company.products.length > 0 && company.products.map(renderSelectOptions)}
            </select>
          </div>
          <div className="panel-input mb--sm">
            <label className="input-label">quantity</label>
            <Input
              size="xs"
              min="0"
              max="20"
              name="units"
              type="number"
              classNames={['input--full']}
            />
          </div>
        </div>
        <div className="panel-action">
          <Button
            size="xs"
            label="send offer"
            onClick={handleCompanyOffer.bind(null, actions, state)}
            classNames={['btn--primary', 'btn--raised', 'btn--full']}
          />
        </div>
      </form>
    </Fragment>
  );

};

export default connect(CompanyOffer);
