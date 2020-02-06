import React, { Component } from 'react';
import './Login.css';
import loginCar from './images/login-car.svg';
import rentseeLogo from './images/logo-rentsee.svg';
import { withRouter } from 'react-router-dom';

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
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert('Username or password is wrong');
                }
            })
            .then(resJson => {
                if (resJson) {
                    localStorage.setItem('userInfo', JSON.stringify(resJson));
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log('error: ', error);
            });
    }
    render() {
        return (
            <div className='container-fluid full-screen'>
                <div className='row h-100'>
                    <div className='col-lg-6 col-md-6 d-none d-lg-block h-100'>
                        <a href='/'>
                            <img className='logo' src={rentseeLogo} alt=''></img>
                        </a>
                        <div className='image-container h-100'>
                            <img className='login-car' src={loginCar} alt=''></img>
                        </div>
                        <div className='login-banner'></div>
                        <div className='login-inner-banner'></div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-4 h-100 login-form-container'>
                        <div className='login-form ml-5'>
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
                                            <path d='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z' />
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

export default withRouter(Login);
