// Vendor Libraries
import React from 'react'

// Local Libraries
import Input from '~/app/views/shared/input'
import TextInput from '~/app/views/shared/text_input'
import EmailInput from '~/app/views/shared/email_input'
import PasswordInput from '~/app/views/shared/password_input'

export default class Registration extends React.Component {
  SubmitForm = (event) => {
    event.preventDefault();
    const { email, emailConfirm } = this.refs;

    if (email.refs.input.value === emailConfirm.refs.input.value) {
      alert('Yay')
    }
    else {
      alert('Boo')
    }
  };

  render() {
    return (
      <div className='registration'>
        <form className='registration-form' onSubmit={this.SubmitForm}>
          <h1>Sign </h1>
          <p>It's free!</p>
          <TextInput
              ref="firstName"
              name="first_name"
              className="input-group half"
              placeholder="First Name"
              errorMessage="First name is required"
              required />
          <TextInput
              ref="lastName"
              name="last_name"
              className="input-group half"
              placeholder="Last Name"
              errorMessage="First name is required"
              required/>
          <EmailInput
              ref="email"
              name="email"
              type="email"
              className="input-group"
              placeholder="Email"
              errorMessage="A valid email is required"
              required />
          <EmailInput
              ref="emailConfirm"
              name="email_confirm"
              type="email"
              className="input-group"
              placeholder="Confirm Email"
              errorMessage="Emails must match"
              required />
          <PasswordInput
              ref="password"
              name="password"
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
