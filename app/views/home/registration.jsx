// Vendor Libraries
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import 'whatwg-fetch'
import jwt from 'jsonwebtoken'

// Local Libraries
import Input from '~/app/views/shared/input'
import TextInput from '~/app/views/shared/text_input'
import EmailInput from '~/app/views/shared/email_input'
import PasswordInput from '~/app/views/shared/password_input'

class Registration extends React.Component {
  static propTypes = {
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    email_confirm: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };
  SubmitForm = (event) => {
    event.preventDefault();
    const { email, email_confirm, first_name, last_name, password } = this.props;

    if (email === email_confirm) {
      fetch('https://geekbook-be.herokuapp.com/new_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Accept': '*/*'
        },
        body: JSON.stringify({ email, first_name, last_name, password })
      }).then(response => response.json()).then(response => ::this.login(response))
    }
  };

  login(response) {
    console.log(response);
    localStorage.setItem('geekbook_user', response.user);
    let user = jwt.decode(response.user);
    this.props.history.replaceState(null, `/${user.user.token}`)
  }

  valueChanged(ev) {
    const { name, value } = ev.target;
    this.props.dispatch({ type: 'updateFormValue', name, value })
  }

  render() {
    const { first_name, last_name, email, email_confirm, password} = this.props;
    return (
      <div className='registration'>
        <form className='registration-form' onSubmit={this.SubmitForm}>
          <h1>Sign </h1>
          <p>It's free!</p>
          <TextInput
              ref="firstName"
              name="first_name"
              onChange={::this.valueChanged}
              value={first_name}
              className="input-group half"
              placeholder="First Name"
              errorMessage="First name is required"
              required />
          <TextInput
              ref="lastName"
              name="last_name"
              onChange={::this.valueChanged}
              value={last_name}
              className="input-group half"
              placeholder="Last Name"
              errorMessage="First name is required"
              required/>
          <EmailInput
              ref="email"
              name="email"
              onChange={::this.valueChanged}
              value={email}
              type="email"
              className="input-group"
              placeholder="Email"
              errorMessage="A valid email is required"
              required />
          <EmailInput
              ref="emailConfirm"
              name="email_confirm"
              onChange={::this.valueChanged}
              value={email_confirm}
              validation={() => email === email_confirm}
              type="email"
              className="input-group"
              placeholder="Confirm Email"
              errorMessage="Emails must match"
              required />
          <PasswordInput
              ref="password"
              name="password"
              onChange={::this.valueChanged}
              value={password}
              type="password"
              className="input-group"
              placeholder="Password"
              errorMessage="Password is required"
              required />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    )
  };
}

export default connect(state => state)(Registration);