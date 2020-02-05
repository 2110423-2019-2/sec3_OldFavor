import React, { Component } from 'react';
import './Login.css';
import loginCar from './images/login-car.svg';
import rentseeLogo from './images/logo-rentsee.svg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://rentsee.krist7599555.ml/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                console.log(resJson);
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className='container-fluid full-screen'>
                <div className='row h-100'>
                    <div className='col-lg-6 col-md-6 d-none d-lg-block h-100'>
                        <img className='logo' src={rentseeLogo} alt=''></img>
                        <div className='image-container h-100'>
                            <img className='login-car' src={loginCar} alt=''></img>
                        </div>
                        <div className='login-banner'></div>
                        <div className='login-inner-banner'></div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-4 h-100 login-form-container'>
                        <div className='login-form form-group ml-5'>
                            <h1 className='mb-4'>Login</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className='input-with-icon mt-4'>
                                    <input
                                        className='form-control'
                                        type='text'
                                        name='username'
                                        placeholder='Username'
                                        value={this.state.username}
                                        onChange={this.handleFormChange}
                                    />
                                    <i>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='#C4C4C4'
                                        >
                                            <path d='M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z' />
                                        </svg>
                                    </i>
                                </div>
                                <div className='input-with-icon mt-4'>
                                    <input
                                        className='form-control'
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                        value={this.state.password}
                                        onChange={this.handleFormChange}
                                    />
                                    <i>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='#C4C4C4'
                                        >
                                            <path d='M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z' />
                                        </svg>
                                    </i>
                                </div>
                                <a className='d-block my-3' href='/login'>
                                    Forget password?
                                </a>
                                <input type='submit' className='btn mt-4' value='Login' />
                            </form>
                            <div className='mt-5'>
                                Don’t have an account yet?{' '}
                                <a href='/register' style={{ fontWeight: 'bold' }}>
                                    Register
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
