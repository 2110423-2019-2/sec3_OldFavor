import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import utils from '../utils.js';
import FormInput from '../Components/FormInput';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

class Profile extends Component {

    constructor(props) {
        super(props);
        var d = new Date();
        this.state = {
            email: '',
            emailVerified: '',
            licenseVerified: '',
            username: '',
            password: '',
            fullname: '',
            dateOfBirth: '',
            phoneNumber: '',
            drivingLicense: '',
            address: '',

            bankOwner: '',
            bankAccountNumber: '',

            creditCardName: '',
            creditCardNumber: '',
            creditCardEXP_M: '',
            creditCardEXP_Y: '',
            creditCardPas: '',

            thisYear: d.getFullYear()

        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLicense = this.handleLicense.bind(this);
        //this.getLicense = this.getLicense.bind(this);
    }
    componentDidMount() {
        fetch('https://rentsee.poomrokc.services/rentsee/api/profile', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                console.log(resJson);
                this.setState({
                    email: resJson.email,
                    emailVerified: resJson.emailVerified,
                    licenseVerified: resJson.licenseVerified,
                    username: resJson.username,
                    password: resJson.password,
                    fullname: resJson.fullname,
                    dateOfBirth: resJson.birthdate,
                    phoneNumber: resJson.phoneNumber,
                    drivingLicense: resJson.drivingLicense,
                    address: resJson.address,

                    bankOwner: resJson.bankOwner,
                    bankAccountNumber: resJson.bankAccountNumber,

                    creditCardName: resJson.creditCardName,
                    creditCardNumber: resJson.creditCardNumber,
                    creditCardEXP_M: resJson.creditCardEXP_M,
                    creditCardEXP_Y: resJson.creditCardEXP_Y,
                    creditCardPas: resJson.creditCardPas
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    handleSubmit(event) {
        event.preventDefault();
        fetch('https://rentsee.poomrokc.services/rentsee/api/users/me', {
            method: 'PATCH',
            headers: utils.authHeader(),
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                fullname: this.state.fullname,
                dateOfBirth: this.state.dateOfBirth,
                phoneNumber: this.state.phoneNumber,
                drivingLicense: this.state.drivingLicense,
                address: this.state.address,

                bankOwner: this.state.bankOwner,
                bankAccountNumber: this.state.bankAccountNumber,

                creditCardName: this.state.creditCardName,
                creditCardNumber: this.state.creditCardNumber,
                creditCardEXP_M: this.state.creditCardEXP_M,
                creditCardEXP_Y: this.state.creditCardEXP_Y,
                creditCardPas: this.state.creditCardPas,

                emailVerified: this.state.emailVerified,
                licenseVerified: this.state.licenseVerified
            })
        })
            .then(response => {
                if (response.status === 200) {
                    alert('Profile Updated');
                } else {
                    alert('Request is fucked up');
                }
            })
            .catch(error => {
                console.log('error: ', error);
            });
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    }
    handleLicense(event) {
        const target = event.target.files[0];
        //const value = target.value;
        const name = target.name;
        let formData = new FormData();
        formData.append('file', target);
        console.log('change: ' + [name] + ' ' + target);
        //this.setState({ [name]: value });
        fetch('https://hueco.ml/temppic/upload.php', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                Accept: '*/*'
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: formData
        })
            .then(response => {
                if (response.status === 200) {
                    //alert("License Uploaded");
                    //console.log(response.success);
                    return response.json();
                } else {
                    alert('Request is fucked up');
                }
            })
            .then(resJson => {
                console.log(resJson);
                this.setState({
                    drivingLicense: resJson.url
                });
            })
            .catch(error => {
                console.log('error: ', error);
            });
    }
    verify(verifier) {
        if (verifier) {
            return (
                <p style={{ textAlign: 'right', color: 'green' }}>Verified</p>
            );
        } else {
            return (
                <p style={{ textAlign: 'right', color: 'red' }}>Not Verified</p>
            );
        }
    }
    render() {
        return (
            <React.Fragment>
                <div class="container-fluid">
                    <Header />
                    <div className='row mb-4'></div>
                    <div className='row mb-4'></div>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col'>
                            <h1 className='ml-0'>Edit Profile</h1>
                        </div>
                        <div className='col'></div>
                        <form className='col' onSubmit={this.handleSubmit}>
                            <input
                                className='btn d-flex float-right '
                                type='submit'
                                value='Edt Profile'
                            />
                        </form>
                        <div className='col-2'></div>
                    </div>
                    <div className='row mb-4'></div>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col h-100 d-flex'>
                            <form className='row'>
                                <div className='col'>
                                    <div class='row'>
                                        <div class='col'>
                                            <p>E-mail</p>
                                        </div>
                                        <div class='col'>
                                            {this.verify(
                                                this.state.emailVerified
                                            )}
                                        </div>
                                    </div>
                                    <FormInput
                                        name='email'
                                        type='text'
                                        handleFormChange={this.handleFormChange}
                                        value={this.state.email}
                                        placeholder='Email'
                                        icon='M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z'
                                    />
                                </div>
                                <div className='col'>
                                    <p>Password</p>
                                    <FormInput
                                        name='password'
                                        type='password'
                                        handleFormChange={this.handleFormChange}
                                        value={this.state.password}
                                        placeholder='Password'
                                        icon='M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z'
                                    />
                                </div>

                                <div class='w-100'></div>
                                <div className='row mb-4'></div>
                                <div class='w-100 border-top'></div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Fullname
                                    </p>
                                    <div className='input-with-icon mt-4'>
                                        <FormInput
                                            name='fullname'
                                            type='text'
                                            handleFormChange={this.handleFormChange}
                                            value={this.state.fullname}
                                            placeholder='Fullname'
                                            icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                                        />
                                    </div>
                                </div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 7px 0px' }}>
                                        Date of Birth
                                    </p>
                                    <FormInput
                                        name='dateOfBirth'
                                        type='date'
                                        handleFormChange={this.handleFormChange}
                                        value={this.state.dateOfBirth}
                                        placeholder='DateOfBirth'
                                        icon='M17 1c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-12 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm13 5v10h-16v-10h16zm2-6h-2v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-8v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-2v18h20v-18zm4 3v19h-22v-2h20v-17h2zm-17 7h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z'
                                    />
                                </div>
                                <div class='w-100'></div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Phone Number
                                    </p>
                                    <div className='input-with-icon mt-4'>
                                        <FormInput
                                            name='phoneNumber'
                                            type='text'
                                            handleFormChange={this.handleFormChange}
                                            value={this.state.phoneNumber}
                                            placeholder='PhoneNumber'
                                            icon='M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z'
                                        />
                                    </div>
                                </div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Driving Lisense
                                    </p>
                                    <div class='row'>
                                        <div class='col-6'>
                                            <img
                                                src={this.state.drivingLicense}
                                                width='192'
                                                height='108'
                                                alt=''
                                            ></img>
                                        </div>
                                        <div class='col'>
                                            <div class='row'>
                                                {this.verify(
                                                    this.state.licenseVerified
                                                )}
                                            </div>

                                            <div class='row'>
                                                <form id='getLicense'>
                                                    <input
                                                        class='form-control-file'
                                                        type='file'
                                                        name='drivingLisense'
                                                        placeholder='DrivingLisense'
                                                        //value={this.state.drivingLisense}
                                                        onChange={
                                                            this.handleLicense
                                                        }
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class='w-100'></div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Address
                                    </p>
                                    <div className='input-with-icon mt-4'>
                                        <FormInput
                                            name='address'
                                            type='text'
                                            handleFormChange={this.handleFormChange}
                                            value={this.state.address}
                                            placeholder='Address'
                                            icon='M12 3c2.131 0 4 1.73 4 3.702 0 2.05-1.714 4.941-4 8.561-2.286-3.62-4-6.511-4-8.561 0-1.972 1.869-3.702 4-3.702zm0-2c-3.148 0-6 2.553-6 5.702 0 3.148 2.602 6.907 6 12.298 3.398-5.391 6-9.15 6-12.298 0-3.149-2.851-5.702-6-5.702zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm8 6h-3.135c-.385.641-.798 1.309-1.232 2h3.131l.5 1h-4.264l-.344.544-.289.456h.558l.858 2h-7.488l.858-2h.479l-.289-.456-.343-.544h-2.042l-1.011-1h2.42c-.435-.691-.848-1.359-1.232-2h-3.135l-4 8h24l-4-8zm-12.794 6h-3.97l1.764-3.528 1.516 1.528h1.549l-.859 2zm8.808-2h3.75l1 2h-3.892l-.858-2z'
                                        />
                                    </div>
                                </div>
                                <div class='w-100'></div>
                                <div className='row mb-4'></div>
                                <div class='w-100 border-top'></div>
                                <div className='row mb-4'></div>
                                <div class='col'>
                                    <h3 class='ml-0'>Bank Account Details</h3>
                                </div>
                                <div class='w-100'></div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Bank Owner
                                    </p>
                                    <div className='input-with-icon mt-4'>
                                        <FormInput
                                            name='bankOwner'
                                            type='text'
                                            handleFormChange={this.handleFormChange}
                                            value={this.state.bankOwner}
                                            placeholder='BankOwner'
                                            icon='M7 21h-4v-11h4v11zm7-11h-4v11h4v-11zm7 0h-4v11h4v-11zm2 12h-22v2h22v-2zm-23-13h24l-12-9-12 9z'
                                        />
                                    </div>
                                </div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Bank Account Number
                                    </p>
                                    <div className='input-with-icon mt-4'>
                                        <FormInput
                                            name='bankAccountNumber'
                                            type='text'
                                            handleFormChange={this.handleFormChange}
                                            value={this.state.bankAccountNumber}
                                            placeholder='BankAccountNumber'
                                            icon='M7 21h-4v-11h4v11zm7-11h-4v11h4v-11zm7 0h-4v11h4v-11zm2 12h-22v2h22v-2zm-23-13h24l-12-9-12 9z'
                                        />
                                    </div>
                                </div>
                                <div class='w-100'></div>
                                <div className='row mb-4'></div>
                                <div class='w-100 border-top'></div>
                                <div className='row mb-4'></div>
                                <div class='col'>
                                    <h3 class='ml-0'>Credit Card Details</h3>
                                </div>
                                <div class='w-100'></div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Credit Card Name
                                    </p>
                                    <div className='input mt-4'>
                                        <input
                                            className='form-control'
                                            type='text'
                                            name='creditCardName'
                                            placeholder='CreditcardName'
                                            value={this.state.creditCardName}
                                            onChange={this.handleFormChange}
                                        />
                                    </div>
                                </div>
                                <div className='col'>
                                    <p style={{ padding: '20px 0px 0px 0px' }}>
                                        Credit Card Number
                                    </p>
                                    <div className='input mt-4'>
                                        <input
                                            className='form-control'
                                            type='text'
                                            name='creditCardNumber'
                                            placeholder='CreditcardNumber'
                                            value={this.state.creditCardNumber}
                                            onChange={this.handleFormChange}
                                        />
                                    </div>
                                </div>
                                <div class='w-100'></div>
                                <div class='col'>
                                    <div class='row'>
                                        <p
                                            class='col'
                                            style={{
                                                padding: '20px 0px 0px 12px'
                                            }}
                                        >
                                            Expiration Date
                                        </p>
                                        <div class='w-100'></div>
                                        <div className='col'>
                                            <div className='input'>
                                                <input
                                                    className='form-control'
                                                    type='number'
                                                    name='creditCardEXP_M'
                                                    placeholder='Month'
                                                    value={
                                                        this.state
                                                            .creditCardEXP_M
                                                    }
                                                    onChange={
                                                        this.handleFormChange
                                                    }
                                                    maxLength='2'
                                                    max="12"
                                                    min="1"
                                                />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='input'>
                                                <input
                                                    className='form-control'
                                                    type='number'
                                                    name='creditCardEXP_Y'
                                                    placeholder='Year'
                                                    value={
                                                        this.state
                                                            .creditCardEXP_Y
                                                    }
                                                    onChange={
                                                        this.handleFormChange
                                                    }
                                                    maxLength='4'
                                                    min={this.state.thisYear}
                                                    max={this.state.thisYear + 20}
                                                />
                                            </div>
                                        </div>
                                        <div class='col'></div>
                                    </div>
                                </div>
                                <div class='col'>
                                    <div class='row'>
                                        <p
                                            class='col'
                                            style={{
                                                padding: '20px 0px 0px 12px'
                                            }}
                                        >
                                            CCV/CVC
                                        </p>
                                        <div class='w-100'></div>
                                        <div className='col'>
                                            <div className='input'>
                                                <input
                                                    className='form-control'
                                                    type='password'
                                                    name='creditCardPas'
                                                    placeholder='CreditcardPas'
                                                    value={
                                                        this.state.creditCardPas
                                                    }
                                                    onChange={
                                                        this.handleFormChange
                                                    }
                                                    maxLength='3'
                                                />
                                            </div>
                                        </div>
                                        <div class='col'></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='col-2'></div>
                    </div>
                    <div className='row mb-4'></div>
                    <div className='row'><Footer/></div>

                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(Profile);
