import React, { Component } from 'react';

class Register extends Component {
    state = {};
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form method='post'>
                    <div>
                        Username:
                        <input placeholder='username' />
                    </div>
                    <div>
                        Password:
                        <input type='password' placeholder='password' />
                    </div>
                    <div>
                        Driving License:
                        <input type='file' name='pic' accept='image/*' />
                    </div>
                    <div>
                        E-Mail:
                        <input type='text' placeholder='e-mail address' />
                    </div>
                    <div>
                        Bank Account Number:
                        <input type='number' placeholder='bank account number' />
                    </div>
                    <div>
                        Phone Number:
                        <input type='number' placeholder='phone number' />
                    </div>
                    <div>
                        Credit Card Number:
                        <input type='number' placeholder='credit card number' />
                    </div>
                    <input type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}

export default Register;
