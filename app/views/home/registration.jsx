// Vendor Libraries
import React, {Component} from 'react';

// Components

export default class Registration extends Component {
    render () {
        return (
            <div className="registration">
                <form className="registration-form">
                    <div className="input-group">
                        <input type="text" name="first_name" placeholder="First Name" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="last_name" placeholder="Last Name" />
                    </div>
                    <div className="input-group">
                        <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="input-group">
                        <input type="email" name="email_confirm" placeholder="Confirm Email" />
                    </div>
                    <div className="input-group">
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        )
    }
}