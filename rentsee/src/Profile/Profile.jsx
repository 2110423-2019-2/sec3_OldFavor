import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import utils from '../utils.js';
//import loginCar from './images/login-car.svg';
import rentseeLogo from '../images/logo-rentsee.svg';



class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            drivingLisense : "",
            email : "",
            bankAccountNumber : "",
            address : "",
            phoneNumber : "",
            creditCardNumber : "",

        };

    }
    componentDidMount(){
        fetch('http://rentsee.krist7599555.ml/api/profile',{
            method: 'GET',
            headers: utils.authHeader()
        })
        .then(response => {
            return response.json();
        })
        .then(resJson => {
            console.log(resJson);
            this.setState({ 
                username: resJson.username,
                password : resJson.password,
                drivingLisense : resJson.drivingLisense,
                email : resJson.email,
                bankAccountNumber : resJson.bankAccountNumber,
                address : resJson.address,
                phoneNumber : resJson.phoneNumber,
                creditCardNumber : resJson.creditCardNumber

            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    render(){
        return(
            <div className='container-fluid full-screen'>
                <div>
                    <p>wows</p>
                </div>
                
                <a href='/'>
                    <img className='logo' src={rentseeLogo} alt=''></img>
                </a>
                <p></p>
                <div className='login-form ml-5'>
                            <h1 className='mb-4'>Profile</h1>
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

        );
    }
}

export default withRouter(Profile);