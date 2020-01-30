import React, { Component } from 'react';

class Login extends Component {
    state = {};
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form method='post'>
                    <div>
                        Username:
                        <input type='text' name='username' />
                    </div>
                    <div>
                        Password:
                        <input type='password' name='password' />
                    </div>
                    <input type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}

export default Login;
