import React, { Component } from 'react';
import Header from '../Components/Header';
import utils from '../utils.js';
import Footer from '../Components/Footer';
import BarStatus from '../Components/BarStatus';
import CarCar from '../Components/CarCard';
import FormInput from '../Components/FormInput';
import './AddDeal.css';

class AddDeal extends Component {
    state = {
        pickUpDateTime: '',
        pickUpLocation: '',
        returnDateTime: '',
        returnLocation: '',
        pricePerDay: '',
        policy: '',

        rentableCars: [],
        state: 1,
        selectedCarId: ''
    };
    componentDidMount() {
        fetch('https://hueco.ml/rentsee/api/cars/me/rent', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                this.setState({ rentableCars: resJson });
            });
    }
    handleSelectCar = _id => {
        this.setState({
            state: 2,
            selectedCarId: _id
        });
    };
    handleSubmitAddDeal = () => {
        fetch(
            `https://hueco.ml/rentsee/api/rents/${this.state.selectedCarId}`,
            {
                method: 'POST',
                headers: utils.authHeader(),
                body: JSON.stringify({
                    returnLocation: this.state.returnLocation,
                    pickUpLocation: this.state.pickUpLocation,
                    returnDateTime: this.state.returnDateTime,
                    pickUpDateTime: this.state.pickUpDateTime,
                    pricePerDay: this.state.pricePerDay,
                    policy: this.state.policy
                })
            }
        );
    };
    handleFormChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    };
    renderState1 = () => {
        return (
            <React.Fragment>
                {this.state.rentableCars.toString()}
                <CarCar
                    _id='0'
                    handleOnClick={this.handleSelectCar}
                    carModel='NISSAN'
                    carType='ALMERA 1.2 E CVT or similar'
                    photoOfCar='https://cors-anywhere.herokuapp.com/https://i.picsum.photos/id/1071/3000/1996.jpg'
                    capacity='5'
                />
            </React.Fragment>
        );
    };
    renderState2 = () => {
        return (
            <React.Fragment>
                <div className='px-5 mt-5'>
                    <div className='row'>
                        <div className='col-6 text-label'>
                            Pick-up Location:
                            <FormInput
                                type='text'
                                name='pickUpLocation'
                                handleFormChange={this.handleFormChange}
                                placeholder='Pick-up Location'
                                icon='M6.974 22.957c-10.957-11.421 2.326-20.865 10.384-13.309l-2.464 2.352h9.106v-8.947l-2.232 2.229c-14.794-13.203-31.51 7.051-14.794 17.675z'
                            />
                        </div>
                        <div className='col-6 text-label'>
                            Return Location:
                            <FormInput
                                type='text'
                                name='returnLocation'
                                handleFormChange={this.handleFormChange}
                                placeholder='Return Location'
                                icon='M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 text-label'>
                            Pick-up Date:
                            <FormInput
                                type='date'
                                name='pickUpDateTime'
                                handleFormChange={this.handleFormChange}
                                icon='M20 19h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm16-14v22h-24v-22h24zm-2 6h-20v14h20v-14zm-8 8h-4v4h4v-4zm-6-6h-4v4h4v-4z'
                            />
                        </div>
                        <div className='col-6 text-label'>
                            Return Date:
                            <FormInput
                                type='date'
                                name='returnDateTime'
                                handleFormChange={this.handleFormChange}
                                icon='M20 19h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm16-14v22h-24v-22h24zm-2 6h-20v14h20v-14zm-8 8h-4v4h4v-4zm-6-6h-4v4h4v-4z'
                            />
                        </div>
                    </div>
                    <div className='row text-label px-3'>
                        Policy:
                        <textarea
                            className='w-100'
                            name='policy'
                            onChange={this.handleFormChange}
                            value={this.state.policy}
                        />
                    </div>
                    <div className='row'>
                        <div className='col-4 text-label' />
                        <div className='col-4 text-label' />
                        <div className='col-4 text-label'>
                            Price Per Day:
                            <FormInput
                                type='number'
                                name='pricePerDay'
                                handleFormChange={this.handleFormChange}
                                icon='M17 12c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm.5 8.474v.526h-.5v-.499c-.518-.009-1.053-.132-1.5-.363l.228-.822c.478.186 1.114.383 1.612.27.574-.13.692-.721.057-1.005-.465-.217-1.889-.402-1.889-1.622 0-.681.52-1.292 1.492-1.425v-.534h.5v.509c.362.01.768.073 1.221.21l-.181.824c-.384-.135-.808-.257-1.222-.232-.744.043-.81.688-.29.958.856.402 1.972.7 1.972 1.773.001.858-.672 1.315-1.5 1.432zm1.624-10.179c1.132-.223 2.162-.626 2.876-1.197v.652c0 .499-.386.955-1.007 1.328-.581-.337-1.208-.6-1.869-.783zm-2.124-5.795c2.673 0 5-1.007 5-2.25s-2.327-2.25-5-2.25c-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.334-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.116.342c-.221-.051-.467-.099-.708-.099l-.072.001c-.482.02-.521.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.328-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.369-.053.443-.3.035-.418zm-11.093 13.009c1.445 0 2.775-.301 3.705-.768.311-.69.714-1.329 1.198-1.899-.451-1.043-2.539-1.833-4.903-1.833-2.672 0-5 1.007-5 2.25s2.328 2.25 5 2.25zm.093-2.009c-.299-.09-1.214-.166-1.214-.675 0-.284.335-.537.958-.593v-.223h.321v.211c.234.005.494.03.784.09l-.117.342c-.22-.051-.466-.099-.707-.099l-.072.001c-.482.02-.52.287-.188.399.547.169 1.267.292 1.267.74 0 .357-.434.548-.967.596v.22h-.321v-.208c-.329-.003-.676-.056-.962-.152l.147-.343c.244.063.552.126.828.126l.208-.014c.368-.053.443-.3.035-.418zm4.003 8.531c-.919.59-2.44.978-4.096.978-2.672 0-5-1.007-5-2.25v-.652c1.146.918 3.109 1.402 5 1.402 1.236 0 2.499-.211 3.549-.611.153.394.336.773.547 1.133zm-9.096-3.772v-.651c1.146.917 3.109 1.401 5 1.401 1.039 0 2.094-.151 3.028-.435.033.469.107.926.218 1.37-.888.347-2.024.565-3.246.565-2.672 0-5-1.007-5-2.25zm0-2.5v-.652c1.146.918 3.109 1.402 5 1.402 1.127 0 2.275-.176 3.266-.509-.128.493-.21 1.002-.241 1.526-.854.298-1.903.483-3.025.483-2.672 0-5-1.007-5-2.25zm11-11v-.652c1.146.918 3.109 1.402 5 1.402 1.892 0 3.854-.484 5-1.402v.652c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25zm0 5v-.652c.713.571 1.744.974 2.876 1.197-.661.183-1.287.446-1.868.783-.622-.373-1.008-.829-1.008-1.328zm0-2.5v-.651c1.146.917 3.109 1.401 5 1.401 1.892 0 3.854-.484 5-1.401v.651c0 1.243-2.327 2.25-5 2.25-2.672 0-5-1.007-5-2.25z'
                            />
                        </div>
                    </div>
                    <div
                        className='my-4'
                        style={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <button
                            style={{
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                            className='btn header'
                            onClick={this.handleSubmitAddDeal}
                        >
                            Add Deal
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    };
    renderByState = () => {
        switch (this.state.state) {
            case 1:
                return this.renderState1();
            case 2:
                return this.renderState2();
            default:
                return this.renderState1();
        }
    };
    render() {
        var state = this.state.state;
        return (
            <React.Fragment>
                <Header />
                <div className='body-content'>
                    <button
                        onClick={() => {
                            this.setState({
                                state: state - 1 < 1 ? 1 : state - 1
                            });
                        }}
                    >
                        BACK
                    </button>
                    <div className='container'>
                        <BarStatus count={4} current={state} />
                        {this.renderByState()}
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default AddDeal;
