import React, {Component, Fragment} from 'react';
import {Input, Button} from '@0bie/pattern-lib-react';
import connect from '../../store/connect';

class EditContact extends Component {

  state = {
    ...this.props.contact
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.contact !== prevProps.contact) {
      this.setState({...this.props.contact});
    }
  }

  handleInputChange = (inputField, evt) => {
    this.setState({
      [inputField]: evt.target.value
    });
  }

  render() {
    return (
      <Fragment>
        <form id="contact_edit" className="panel-form">
          <input name="id" value={this.state.id} type="hidden" />
          <div className="panel-input mb--xs">
            <label className="input-label">first name</label>
            <Input
              size="xs"
              name="firstName"
              value={this.state.firstName}
              classNames={['input--full']}
              onChange={this.handleInputChange.bind(null, 'firstName')}
            />
          </div>
          <div className="panel-input mb--xs">
            <label className="input-label">last name</label>
            <Input
              size="xs"
              name="lastName"
              value={this.state.lastName}
              classNames={['input--full']}
              onChange={this.handleInputChange.bind(null, 'lastName')}
            />
          </div>
          <div className="panel-input mb--xs">
            <label className="input-label">email</label>
            <Input
              size="xs"
              name="email"
              classNames={['input--full']}
              value={this.state.email || ''}
              onChange={this.handleInputChange.bind(null, 'email')}
            />
          </div>
          <div className="panel-input mb--xs">
            <label className="input-label">role</label>
            <Input
              size="xs"
              name="role"
              classNames={['input--full']}
              value={this.state.role || ''}
              onChange={this.handleInputChange.bind(null, 'role')}
            />
          </div>
          <div className="panel-input mb--xs">
            <label className="input-label">biography</label>
            <Input
              rows="8"
              cols="5"
              size="xs"
              name="bio"
              type="textField"
              value={this.state.bio || ''}
              inputClassNames={['input--note']}
              classNames={['input--full']}
              onChange={this.handleInputChange.bind(null, 'bio')}
            />
          </div>
          <div className="panel-action">
            <Button
              size="xs"
              label="edit contact"
              classNames={['btn--primary', 'btn--raised', 'btn--full']}
              onClick={this.props.handleEditContact.bind(null, this.props.actions)}
            />
          </div>
        </form>
      </Fragment>
    );
  }

}

export default connect(EditContact);
