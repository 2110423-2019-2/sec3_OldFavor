import React, { Component } from 'react';
import './AddCar.css';
import FormInput from '../Components/FormInput';
import utils from '../utils.js';
import Header from '../Components/Header';
import addCarBg from './images/AddCar-bg.png';
import FormUpload from '../Components/FormUpload';
import { withRouter } from 'react-router-dom';

class AddCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            licensePlate: '',
            capacity: '',
            photoOfCar: '',
            photoOfCarDocument: '',
            price: '',
            carModel: '',
            carType: '',
            carDescription: '',

            accpet: false
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

    handleFormUpload(event) {
        const target = event.target.files[0];
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.accpet) {
            alert('Please Accept Term !!!!!!');
        } else {
            fetch('https://hueco.ml/rentsee/api/cars', {
                method: 'POST',
                headers: utils.authHeader(),
                body: JSON.stringify({
                    licensePlate: this.state.licensePlate,
                    capacity: this.state.capacity,
                    photoOfCar: this.state.photoOfCar,
                    photoOfCarDocument: this.state.photoOfCarDocument,
                    price: this.state.price,
                    carModel: this.state.carModel,
                    carType: this.state.carType,
                    carDescription: this.state.carDescription
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        alert('Failed');
                    }
                })
                .then(resJson => {
                    if (resJson) {
                        console.log(resJson);
                        this.props.history.push('/');
                    }
                })
                .catch(error => {
                    console.log('error: ', error);
                });
        }
    }
    handleFormUploadChange = (name, url) => {
        this.setState({ [name]: url });
    };
    render() {
        return (
            <React.Fragment>
                <div
                    className='container-fluid full-screen'
                    style={{
                        backgroundImage: `url(${addCarBg})`,
                        backgroundSize: 'cover'
                    }}
                >
                    <Header />
                    <div className='addcar-card shadow-lg p-5 mb-5 bg-white rounded'>
                        <div className='mb-4'>
                            <h1>
                                Add Your{' '}
                                <span style={{ color: '#545372' }}>Car</span>
                            </h1>
                            <label>Please fill all the information</label>
                        </div>
                        <form onSubmit={this.handleSubmit}>
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
                                        name='carType'
                                        handleFormChange={this.handleFormChange}
                                        placeholder='Car Type'
                                        icon='M7 13.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm9 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm4-1c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-17.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2zm19.318 3.168c-.761-1.413-1.699-3.17-2.684-4.812-.786-1.312-1.37-1.938-2.751-2.187-1.395-.25-2.681-.347-4.585-.347s-3.19.097-4.585.347c-1.381.248-1.965.875-2.751 2.187-.981 1.637-1.913 3.382-2.684 4.812-.687 1.273-.98 2.412-.98 3.806 0 1.318.42 2.415 1 3.817v2.209c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-1h13v1c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-2.209c.58-1.403 1-2.499 1-3.817 0-1.394-.293-2.533-.98-3.806zm-15.641-3.784c.67-1.117.852-1.149 1.39-1.246 1.268-.227 2.455-.316 4.231-.316s2.963.088 4.231.316c.538.097.72.129 1.39 1.246.408.681.81 1.388 1.195 2.081-1.456.22-4.02.535-6.816.535-3.048 0-5.517-.336-6.805-.555.382-.686.779-1.386 1.184-2.061zm11.595 10.616h-11.948c-1.671 0-3.026-1.354-3.026-3.026 0-1.641.506-2.421 1.184-3.678 1.041.205 3.967.704 7.816.704 3.481 0 6.561-.455 7.834-.672.664 1.231 1.166 2.01 1.166 3.646 0 1.672-1.355 3.026-3.026 3.026zm5.526-10c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202z'
                                    />
                                </div>

                                <div className='col'>
                                    <FormInput
                                        name='capacity'
                                        type='number'
                                        handleFormChange={this.handleFormChange}
                                        placeholder='Seats'
                                        icon='M22.548 9l.452-2h-5.364l1.364-6h-2l-1.364 6h-5l1.364-6h-2l-1.364 6h-6.184l-.452 2h6.182l-1.364 6h-5.36l-.458 2h5.364l-1.364 6h2l1.364-6h5l-1.364 6h2l1.364-6h6.185l.451-2h-6.182l1.364-6h5.366zm-8.73 6h-5l1.364-6h5l-1.364 6z'
                                    />
                                </div>
                            </div>
                            <FormInput
                                name='carModel'
                                handleFormChange={this.handleFormChange}
                                placeholder='Car Model'
                                icon='M7 13.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm9 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm4-1c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-17.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2zm19.318 3.168c-.761-1.413-1.699-3.17-2.684-4.812-.786-1.312-1.37-1.938-2.751-2.187-1.395-.25-2.681-.347-4.585-.347s-3.19.097-4.585.347c-1.381.248-1.965.875-2.751 2.187-.981 1.637-1.913 3.382-2.684 4.812-.687 1.273-.98 2.412-.98 3.806 0 1.318.42 2.415 1 3.817v2.209c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-1h13v1c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-2.209c.58-1.403 1-2.499 1-3.817 0-1.394-.293-2.533-.98-3.806zm-15.641-3.784c.67-1.117.852-1.149 1.39-1.246 1.268-.227 2.455-.316 4.231-.316s2.963.088 4.231.316c.538.097.72.129 1.39 1.246.408.681.81 1.388 1.195 2.081-1.456.22-4.02.535-6.816.535-3.048 0-5.517-.336-6.805-.555.382-.686.779-1.386 1.184-2.061zm11.595 10.616h-11.948c-1.671 0-3.026-1.354-3.026-3.026 0-1.641.506-2.421 1.184-3.678 1.041.205 3.967.704 7.816.704 3.481 0 6.561-.455 7.834-.672.664 1.231 1.166 2.01 1.166 3.646 0 1.672-1.355 3.026-3.026 3.026zm5.526-10c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202z'
                            />

                            <FormInput
                                name='carDescription'
                                handleFormChange={this.handleFormChange}
                                placeholder='Car Description'
                                icon='M0 1h24v2h-24v-2zm0 7h24v-2h-24v2zm0 5h24v-2h-24v2zm0 5h24v-2h-24v2zm0 5h24v-2h-24v2z'
                            />
                            <br />
                            <label>Photo of Car</label>
                            <FormUpload
                                handleFormUploadChange={
                                    this.handleFormUploadChange
                                }
                                name='photoOfCar'
                                photoUrl={this.state.photoOfCar}
                            />
                            <label>Photo of Car Document</label>
                            <FormUpload
                                handleFormUploadChange={
                                    this.handleFormUploadChange
                                }
                                name='photoOfCarDocument'
                                photoUrl={this.state.photoOfCarDocument}
                            />
                            <br />
                            <div className='ml-4'>
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

                            <input
                                className='btn mt-5'
                                type='submit'
                                onSubmit={this.handleSubmit}
                                value='Submit'
                            />
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(AddCar);
