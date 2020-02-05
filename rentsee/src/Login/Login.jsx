import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    state = {};
    render() {
        return (
            <div className='container-fluid full-screen'>
                <div className='row'>
                    <div className='col-lg-6 col-xs-0'>
                        <div className='row login-banner'>
                            <div className='login-inner-banner'></div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-xs-4'>
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
                </div>
            </div>
        );
    }
}

export default Login;
