import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            birthdate: '',

            username: '',
            password: '',

            drivingLicense: '',
            email: '',
            bankAccountNumber: '',
            phoneNumber: '',
            creditCardNumber: ''
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://rentsee.krist7599555.ml/api/register', {
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
                    alert('Request is fucked up');
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
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>
                            Fullname
                            <input
                                className='form-control'
                                name='fullname'
                                onChange={this.handleFormChange}
                                placeholder='Fullname'
                            />
                        </label>
                        <label>
                            Date of Birth
                            <input
                                className='form-control'
                                name='birthdate'
                                onChange={this.handleFormChange}
                                type='date'
                                placeholder='Date of Birth'
                            />
                        </label>
                    </div>
                    <label>
                        Username:
                        <input
                            className='form-control'
                            onChange={this.handleFormChange}
                            name='username'
                            placeholder='username'
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            className='form-control'
                            onChange={this.handleFormChange}
                            name='password'
                            type='password'
                            placeholder='password'
                        />
                    </label>
                    <label>
                        Driving License:
                        <input
                            className='form-control-file'
                            onChange={this.handleFormChange}
                            name='drivingLicense'
                            type='file'
                            accept='image/*'
                        />
                    </label>
                    <label>
                        E-Mail:
                        <input
                            className='form-control'
                            onChange={this.handleFormChange}
                            name='email'
                            type='text'
                            placeholder='e-mail address'
                        />
                    </label>
                    <label>
                        Bank Account Number:
                        <input
                            className='form-control'
                            name='bankAccoutNumber'
                            onChange={this.handleFormChange}
                            type='number'
                            placeholder='bank account number'
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            className='form-control'
                            name='phoneNumber'
                            onChange={this.handleFormChange}
                            type='number'
                            placeholder='phone number'
                        />
                    </label>
                    <label>
                        Credit Card Number:
                        <input
                            className='form-control'
                            name='creditCardNumber'
                            onChange={this.handleFormChange}
                            type='number'
                            placeholder='credit card number'
                        />
                    </label>
                    <input className='btn mt-4' type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}

export default Register;
