import React, { Component } from 'react';
import './AddCar.css';
import FormInput from '../Components/FormInput';
import utils from '../utils.js';
import Header from '../Components/Header';
import addCarBg from './images/AddCar-bg.png';
import CarDealModal from '../Components/CarDealModal';
class AddCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pickup: '',
            dropdown: '',
            startdate: '',
            enddate: '',
            cartype: '',
            seats: '',

            frontViewURL: '',
            carDocURL: '',
            price: '',
            accept: '',
            carModel: '',
            carDescription: ''
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //console.log('change: ' + [name] + ' ' + value);
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
                pickup: this.state.pickup,
                dropdown: this.state.dropdown,
                startdate: this.state.startdate,
                enddate: this.state.enddate,
                cartype: this.state.cartype,
                seats: this.state.seats,

                inview: this.state.inview,
                lview: this.state.lview,
                price: this.state.price,
                accept: this.state.accept,

                carDocURL: this.state.carDocURL,
                frontViewURL: this.state.frontViewURL,
                carModel: this.state.carModel
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert('Please Accept Term !!!!!!');
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
            <React.Fragment>
                <img
                    style={{
                        width: '100vw',
                        height: '100vh',
                        right: 10,
                        zIndex: -100,
                        position: 'absolute',
                        top: 0,
                        left: -10
                    }}
                    src={addCarBg}
                    alt=''
                />
                <div className='container-fluid full-screen'>
                    <Header />
                    <div className='addcar-card shadow-lg p-3 mb-5 bg-white rounded'>
                        <form onSubmit={this.handleSubmit}>
                            <div className='mb-4 ml-4'>
                                <h1>
                                    Add Your{' '}
                                    <span style={{ color: '#545372' }}>
                                        Car
                                    </span>
                                </h1>
                                <a>Please fill all the information</a>
                            </div>

                            <div className=' mb-3 ml mt-3'>
                                <h5>
                                    Rental{' '}
                                    <span style={{ color: '#545372' }}>
                                        Details
                                    </span>
                                </h5>
                            </div>

                            <FormInput
                                name='pickup'
                                handleFormChange={this.handleFormChange}
                                placeholder='Pick-up Area'
                                icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                            />
                            <FormInput
                                name='dropdown'
                                handleFormChange={this.handleFormChange}
                                placeholder='Return Area'
                                icon='M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z'
                            />

                            <div className='row mt-3'>
                                <div className='col-6 text-label'>
                                    Pick-up Date:
                                    <FormInput
                                        name='startdate'
                                        handleFormChange={this.handleFormChange}
                                        placeholder='birthdate'
                                        type='date'
                                        value={this.state.birthdate}
                                    />
                                </div>
                                <div className='col-6 text-label'>
                                    Return Date:
                                    <FormInput
                                        name='enddate'
                                        handleFormChange={this.handleFormChange}
                                        placeholder='Fullname'
                                        type='date'
                                        value={this.state.fullname}
                                    />
                                </div>
                            </div>
                            <FormInput
                                name='price'
                                handleFormChange={this.handleFormChange}
                                placeholder='Price'
                                icon='M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z'
                            />
                            <div className=' mb-1  mt-3'>
                                <h5>
                                    Car{' '}
                                    <span style={{ color: '#545372' }}>
                                        Details
                                    </span>
                                </h5>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <FormInput
                                        name='cartype'
                                        handleFormChange={this.handleFormChange}
                                        placeholder='CarType'
                                        icon='M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z'
                                    />
                                </div>

                                <div className='col'>
                                    <FormInput
                                        name='seats'
                                        handleFormChange={this.handleFormChange}
                                        placeholder='Seats'
                                        icon='M10 17c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3 0c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm2-7v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.795-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z'
                                    />
                                </div>
                            </div>
                            <FormInput
                                name='carModel'
                                handleFormChange={this.handleFormChange}
                                placeholder='Car Model'
                                icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                            />

                            <FormInput
                                name='carDescription'
                                handleFormChange={this.handleFormChange}
                                placeholder='Car Description'
                                icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                            />

                            <div className='row mt-3 ml-3'>
                                <FormInput
                                    name='frontViewURL'
                                    handleFormChange={this.handleFormChange}
                                    placeholder='Front View'
                                    icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                                />

                                <FormInput
                                    name='carDocURL'
                                    handleFormChange={this.handleFormChange}
                                    placeholder='Car Document'
                                    icon='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z'
                                />

                                <div className='modal-body'>
                                    <div className='ml-5'>
                                        <input
                                            type='checkbox'
                                            className='form-check-input'
                                            name='accept'
                                            onChange={this.handleFormChange}
                                        />
                                        <label className='form-check-label'>
                                            I Accept Terms and Agreement
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div
                                className=''
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                <input
                                    className='btn mt'
                                    type='submit'
                                    value='Submit'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddCar;
