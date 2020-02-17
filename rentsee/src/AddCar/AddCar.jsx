import React, { Component } from 'react';
import './Register.css';
import rentseeLogo from '../images/logo-rentsee.svg';
import bannerImg from './images/register-banner.svg';
import FormInput from '../Components/FormInput';
import utils from '../utils.js';

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            birthdate: '',

            xxxxx: '',
            username: '',
            password: '',

            drivingLicense: '',
            email: '',
            bankAccountNumber: '',
            phoneNumber: '',
            creditCardNumber: '',

            licensePlate:'',
            capacity:'',
            photoOfCar:'',
            photoOfCarDocument:'',
            CarType:'',
            carDescription:'',
            photo:''
            

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

    handleFormUpload(event) {
        const target = event.target.files[0];
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    }

    

    handleSubmit(event) {
        event.preventDefault();
        fetch('https://hueco.ml/rentsee/api/cars', {
            method: 'POST',

            headers: utils.authHeader(),

            body: JSON.stringify({
                licensePlate: this.state.licensePlate,
                capacity: this.state.capacity,
                photoOfCar: this.state.photoOfCar,
                photoOfCarDocument:this.state.photoOfCarDocument,
                CarType:this.state.CarType,
                carDescription:this.state.carDescription,
                photo:this.state.photo


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
                    <div className='col-lg-6 col-md-6 d-none d-lg-block h-100' style={{ overflow: 'hidden' }}>
                        <a href='/'>
                            <img className='logo' src={rentseeLogo} alt=''></img>
                        </a>
                        <div className='image-container h-100'>
                            <img className='banner-img' src={bannerImg} alt=''></img>
                        </div>
                        <div className='background-banner'></div>
                        <div className='foreground-banner'></div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-xs-4 h-100 d-flex'>
                        <div className='form-group ml-5'>
                            <form onSubmit={this.handleSubmit}>
                                <div className='mb-3'>
                                    <h1>
                                        AddCar <span style={{ color: '#545372' }}></span>
                                    </h1>
                                    <h2>Please fill all of the information</h2>
                                </div>
                                <div className='row'>
                                    <div className='col'>
<<<<<<< HEAD
                                        <FormInput
                                            name='licensePlate'
                                            handleFormChange={this.handleFormChange}
                                            placeholder='LicensePlate'
                                            icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                                        />
                                        <input type='file' onChange={this.handleFormChange} />
=======
                                    <h></h>    
                                    <h1 >
                                        licensePlate <span style={{ color: '#545372' }}></span>
                                    </h1>
                                        <input type = "file" photo = {this.handleFormUpload}/>
>>>>>>> ba5865b551986054ff156c98898096b651e44884
                                        <FormInput
                                            name='capacity'
                                            handleFormChange={this.handleFormChange}
                                            placeholder='Capacity'
                                            icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                                        />

                                        <FormInput
                                            name='photoOfCar'
                                            handleFormChange={this.handleFormChange}
                                            placeholder='photoOfCar'
                                            icon='M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z'
                                        />
                                        <hr />
                                        <hr />
                                        <FormInput
                                            name='photoOfCarDocument'
                                            handleFormChange={this.handleFormChange}
                                            placeholder='photoOfCarDocumente'
                                            icon='M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-8v2h8v-2z'
                                        />
                                        <FormInput
                                            name='CarType'
                                            handleFormChange={this.handleFormChange}
                                            placeholder='CarType'
                                            icon='M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z'
                                        />
                                        <FormInput
                                            name='carDescription'
                                            handleFormChange={this.handleFormChange}
                                            placeholder='carDescription'
                                            icon='M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z'
                                        />
                                    </div>
                                </div>
                                <input className='btn mt-4 d-flex' type='submit' value='AddCar' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCar;
