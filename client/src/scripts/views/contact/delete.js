import React, {Component, Fragment} from 'react';
import {Button, Notice} from '@0bie/pattern-lib-react';
import connect from '../../store/connect';

class DeleteContact extends Component {

  state = {
    ...this.props.contact
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.contact !== prevProps.contact) {
      this.setState({...this.props.contact});
    }
  }

  render() {
    const fullName = this.state.firstName + ' ' + this.state.lastName;
    return (
      <Fragment>
        <form id="contact_delete" className="panel-form">
          <input name="id" value={this.state.id} type="hidden" />
          <Notice
            state="warn"
            iconPosition="left"
            classNames={['mb--md']}
            icon={{id: 'warning', size: 'sm', title: `delete ${fullName}`}}
            message={`You're about to delete ${fullName} from contacts.`}
          />
          <div className="panel-action">
            <Button
              size="xs"
              label="delete contact"
              onClick={this.props.handleDeleteContact.bind(null, this.props.actions)}
              classNames={['btn--primary', 'btn--raised', 'btn--full']}
            />
          </div>
        </form>
      </Fragment>
    );
  }

}

export default connect(DeleteContact);
