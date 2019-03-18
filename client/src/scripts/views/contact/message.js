import React, {Component, Fragment} from 'react';
import {Input, Button} from '@0bie/pattern-lib-react';
import connect from '../../store/connect';

class MessageContact extends Component {

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
        <form id="contact_message" className="panel-form">
          <input name="id" value={this.state.id} type="hidden" />
          <div>
            <div className="panel-input mb--sm">
              <label className="input-label">subject</label>
              <Input
                size="xs"
                name="subject"
                placeholder="Message Subject"
                classNames={['input--full']}
              />
            </div>
            <div className="panel-input mb--sm">
              <label className="input-label">message</label>
              <Input
                size="xs"
                rows="15"
                cols="20"
                name="text"
                type="textField"
                inputClassNames={['input--note']}
                placeholder="Compose a message..."
                classNames={['input--full']}
              />
            </div>
          </div>
          <div className="panel-action">
            <Button
              size="xs"
              label="send message"
              classNames={['btn--primary', 'btn--raised', 'btn--full']}
              onClick={this.props.handleMessageContact.bind(null, this.props.actions)}
            />
          </div>
        </form>
      </Fragment>
    );
  }

}

export default connect(MessageContact);
