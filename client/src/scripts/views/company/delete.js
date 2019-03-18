import React, {Component, Fragment} from 'react';
import {Button, Notice} from '@0bie/pattern-lib-react';
import connect from '../../store/connect';

class DeleteCompany extends Component {

  state = {
    ...this.props.company
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.company !== prevProps.company) {
      this.setState({...this.props.company});
    }
  }

  render() {
    return (
      <Fragment>
        <form id="company_delete" className="panel-form">
          <input name="id" value={this.state.id} type="hidden" />
          <Notice
            state="warn"
            iconPosition="left"
            classNames={['mb--md']}
            icon={{id: 'warning', size: 'sm', title: `delete ${this.state.name}`}}
            message={`You're about to delete ${this.state.name} from companies.`}
          />
          <div className="panel-action">
            <Button
              size="xs"
              label="delete company"
              classNames={['btn--primary', 'btn--raised', 'btn--full']}
              onClick={this.props.handleDeleteCompany.bind(null, this.props.actions)}
            />
          </div>
        </form>
      </Fragment>
    );
  }

}

export default connect(DeleteCompany);
