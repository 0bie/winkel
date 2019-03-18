import React, {Fragment} from 'react';
import {Button, Input} from '@0bie/pattern-lib-react';
import connect from '../../store/connect';

const NewCompany = ({actions, handleAddCompany}) => {

  return (
    <Fragment>
      <form id="company_add" className="panel-form">
        <div>
          <div className="panel-input mb--sm">
            <label className="input-label">company name</label>
            <Input
              size="xs"
              name="name"
              classNames={['input--full']}
            />
          </div>
          <div className="panel-input mb--sm">
            <label className="input-label">location</label>
            <Input
              size="xs"
              name="location"
              classNames={['input--full']}
            />
          </div>
          <div className="panel-input mb--sm">
            <label className="input-label">image URL</label>
            <Input
              size="xs"
              name="image"
              classNames={['input--full']}
            />
          </div>
          <div className="panel-input mb--sm">
            <label className="input-label">supply quantity</label>
            <select name="quantity" className="input input--xs input--full">
              <option value="">Choose a quantity</option>
              <option value="wholesale">Wholesale</option>
              <option value="retail">Retail</option>
            </select>
          </div>
        </div>
        <div className="panel-action">
          <Button
            size="xs"
            label="create company"
            onClick={handleAddCompany.bind(null, actions)}
            classNames={['btn--primary', 'btn--raised', 'btn--full']}
          />
        </div>
      </form>
    </Fragment>
  );

};

export default connect(NewCompany);
