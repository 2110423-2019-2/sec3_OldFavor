import React, { Component } from 'react';
import Header from '../Components/Header';
import utils from '../utils.js';
import { findIndex } from 'lodash';
import BarStatus from '../Components/BarStatus';
import SearchPickUpReturn from '../Components/SearchPickUpReturn';
import FormInput from '../Components/FormInput';
import SortBy from '../Components/SortBy';
import CarItem from '../Components/CarItem';
import './Search.css';
import Footer from '../Components/Footer';

function formatNumber(num) {
    if (num){
        let numOut = num;
        if (numOut.toString().includes('.')) {
            return numOut
                .toFixed(2)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        } else {
            return numOut.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
    }
    return num;
}
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            searchRes: [],
            q: '',
            sort: 'created',
            sortWay: -1,
            pickUpDateTime: undefined,
            returnDateTime: undefined,
            pickUpLocation: '',
            returnLocation: '',

            state: 2,
            selectedRentId: '',
            selectedRent: '',
            totalCost: undefined,
            deposite: undefined,
            accepted: false
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.carResult = this.carResult.bind(this);
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
        this.search();
    }
    componentDidMount() {
        const query = 'getUrl=';
        const location = this.props.location.search.substring(1);
        const getUrl = location.substring(query.length);
        const params = getUrl.split('&');
        const q =
            params.length > 0
                ? params[0].substring(params[0].search('=') + 1)
                : undefined;
        const sort =
            params.length > 1
                ? params[1].substring(params[1].search('=') + 1)
                : undefined;
        const sortWay =
            params.length > 2
                ? params[2].substring(params[2].search('=') + 1)
                : undefined;
        const pickUpDateTime =
            params.length > 3
                ? params[3].substring(params[3].search('=') + 1)
                : undefined;
        const returnDateTime =
            params.length > 4
                ? params[4].substring(params[4].search('=') + 1)
                : undefined;
        const pickUpLocation =
            params.length > 5
                ? params[5].substring(params[5].search('=') + 1)
                : undefined;
        const returnLocation =
            params.length > 6
                ? params[6].substring(params[6].search('=') + 1)
                : undefined;
        this.setState({
            q,
            sort,
            sortWay,
            pickUpDateTime,
            returnDateTime,
            pickUpLocation,
            returnLocation
        });
        fetch(getUrl, {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                const searchRes = resJson;
                this.setState({ searchRes });
            })
            .catch(error => {
                console.log(error);
            });

        fetch('https://hueco.ml/rentsee/api/profile', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                console.log(resJson);
                this.setState({ username: resJson.username });
            })
            .catch(error => {
                console.log(error);
            });
    }
    search = () => {
        var getUrl = `https://hueco.ml/rentsee/api/rents/search?q=${
            this.state.q ? this.state.q : ''
        }&sort=${this.state.sort ? this.state.sort : ''}&sortWay=${
            this.state.sortWay ? this.state.sortWay : ''
        }&pickUpDateTime=${
            this.state.pickUpDateTime ? this.state.pickUpDateTime : ''
        }&returnDateTime=${
            this.state.returnDateTime ? this.state.returnDateTime : ''
        }&pickUpLocation=${
            this.state.pickUpLocation ? this.state.pickUpLocation : ''
        }&returnLocation=${
            this.state.returnLocation ? this.state.returnLocation : ''
        }`;
        this.props.history.push('/search?getUrl=' + getUrl);
        fetch(getUrl, {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                const searchRes = resJson;
                this.setState({ searchRes });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleSortChange = sort => {
        this.setState({ sort: sort });
        process.nextTick(() => {
            this.search();
        });
    };
    handleRent = _id => {
        var rent = findIndex(this.state.searchRes, ['_id', _id]);
        rent = this.state.searchRes[rent];

        const pickUpDateTime = new Date(this.state.pickUpDateTime);
        const returnDateTime = new Date(this.state.returnDateTime);
        const delta = returnDateTime - pickUpDateTime;
        const days = delta / 86400000;
        const totalCost = days * rent.pricePerDay;
        const deposite = totalCost * 0.4;

        this.setState({
            selectedRentId: _id,
            state: 3,
            selectedRent: rent,
            pickUpLocation: rent.pickUpLocation,
            returnLocation: rent.returnLocation,
            totalCost: totalCost,
            deposite: deposite
        });
    };
    handleConfirm = () => {
        if (!this.state.accepted) {
            alert('Please, accept the terms and conditions before proceeding');
        } else {
            this.setState({ state: 4 });
        }
    };
    handlePayment = () => {
        fetch(
            `https://hueco.ml/rentsee/api/rents/confirm/${this.state.selectedRentId}`,
            {
                method: 'PATCH',
                headers: utils.authHeader(),
                body: JSON.stringify({
                    pickUpDateTime: this.state.pickUpDateTime,
                    pickUpLocation: this.state.pickUpLocation,
                    returnDateTime: this.state.returnDateTime,
                    returnLocation: this.state.returnLocation
                })
            }
        )
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                console.log(resJson);
                this.setState({ success: true });
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    };
    carResult() {
        const rents = this.state.searchRes;
        return rents.map(rent => {
            return (
                <CarItem
                    key={rent._id}
                    brand={rent.car.carModel}
                    type={rent.car.carType}
                    cost={rent.pricePerDay}
                    photoOfCar={rent.car.photoOfCar}
                    capacity={rent.car.capacity}
                    policy={rent.policy}
                    _id={rent._id}
                    handleRent={this.handleRent}
                />
            );
        });
    }
    renderState2 = () => {
        return (
            <React.Fragment>
                <div className='container'>
                    <SearchPickUpReturn
                        pickUpLocation={this.state.pickUpLocation}
                        pickUpDateTime={this.state.pickUpDateTime}
                        returnLocation={this.state.returnLocation}
                        returnDateTime={this.state.returnDateTime}
                    />
                    <hr className='my-3' />
                    <div className='row'>
                        <div className='col'>
                            <div className='float-left'>
                                <FormInput
                                    type='text'
                                    name='q'
                                    handleFormChange={this.handleFormChange}
                                    value={this.state.q}
                                    placeholder='Search'
                                    icon='M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z'
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='float-right'>
                                <SortBy
                                    sort={this.state.sort}
                                    options={['created', 'price', 'rating']}
                                    handleSortChange={this.handleSortChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mt-3'>{this.carResult()}</div>
            </React.Fragment>
        );
    };
    renderState3 = () => {
        var rent = this.state.selectedRent;
        const car = rent.car;
        return (
            <React.Fragment>
                <div className='container'>
                    <SearchPickUpReturn
                        pickUpLocation={this.state.pickUpLocation}
                        pickUpDateTime={this.state.pickUpDateTime}
                        returnLocation={this.state.returnLocation}
                        returnDateTime={this.state.returnDateTime}
                    />
                    <div
                        className='card px-4 py-5 mt-3 w-100'
                        onClick={this.handleOnClick}
                    >
                        <div className='row'>
                            <div className='col'>
                                <img
                                    src={car.photoOfCar}
                                    alt=''
                                    style={{ width: '100%' }}
                                ></img>
                            </div>
                            <div className='col'>
                                <div className='car-title-text'>
                                    {car.carModel}
                                </div>
                                <div className='car-type-text'>
                                    {car.carType}
                                </div>
                                <span>
                                    <i>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='17'
                                            height='17'
                                            viewBox='0 0 24 24'
                                            fill='#000000'
                                        >
                                            <path d='M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z' />
                                        </svg>
                                    </i>
                                    <span className='ml-3'>
                                        {car.capacity ? car.capacity : 'N/A'}{' '}
                                        Seats
                                    </span>
                                </span>
                                <div>
                                    <i>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='17'
                                            height='17'
                                            viewBox='0 0 24 24'
                                            fill='#000000'
                                        >
                                            <path d='M0 1h24v2h-24v-2zm0 7h24v-2h-24v2zm0 5h24v-2h-24v2zm0 5h24v-2h-24v2zm0 5h24v-2h-24v2z' />
                                        </svg>
                                    </i>
                                    <span className='ml-3'>
                                        {car.carDescription}
                                    </span>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='car-cost-text'>
                                    {formatNumber(rent.pricePerDay)}
                                </div>
                                <div className='car-cost-unit-text'>
                                    THB/DAY
                                </div>
                            </div>
                        </div>
                    </div>
                    <label className='my-3 text-center w-100'>
                        <span className='' style={{ fontSize: '1.6em' }}>
                            Booking Deposite:{' '}
                            {formatNumber(this.state.deposite)}{' '}
                        </span>
                        <span
                            className='font-weight-thin'
                            style={{ fontSize: '1.2em' }}
                        >
                            THB
                        </span>
                    </label>
                    <label className='my-3 text-center w-100'>
                        <span
                            className='font-weight-bold'
                            style={{ fontSize: '1.6em' }}
                        >
                            Total: {formatNumber(this.state.totalCost)}{' '}
                        </span>
                        <span
                            className='font-weight-thin'
                            style={{ fontSize: '1.2em' }}
                        >
                            THB
                        </span>
                    </label>
                    <div
                        className='mt-5 mb-4 text-center custom-control'
                        id='checkout-search'
                    >
                        <input
                            type='checkbox'
                            className='custom-checkbox'
                            onChange={this.handleFormChange}
                            name='accepted'
                            value={this.state.accepted}
                        />
                        <label>
                            I have read and accept{' '}
                            <a
                                className='text'
                                href='https://docs.google.com/document/d/10eoplvzsw4_oM6ZOBxlf4d2QTP3KWSQv9VYiPdCw0Uo/edit?usp=sharing'
                                target='_blank'
                                rel='noopener noreferrer'
                                style={{ fontWeight: 'bold' }}
                            >
                                Rentsee Rental Terms and Conditions
                            </a>
                        </label>
                    </div>
                    <div className='text-center mt-3'>
                        <button className='btn' onClick={this.handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    };
    renderState4 = () => {
        switch (this.state.success) {
            case true:
                return (
                    <div className='text-center' style={{ marginTop: '15vh' }}>
                        <div className='mt-5 mb-3'>
                            <i>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='15%'
                                    height='15%'
                                    viewBox='0 0 24 24'
                                    fill='#28a745'
                                >
                                    <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z' />
                                </svg>
                            </i>
                        </div>
                        <div
                            className='font-weight-bold mb-5'
                            style={{ fontSize: '1.6em' }}
                        >
                            Car Rented Successfully!
                        </div>
                        <a
                            href='/'
                            className='text mx-3'
                            style={{ fontSize: '1.2em' }}
                        >
                            Go Home
                        </a>
                    </div>
                );
            default:
                return (
                    <div className='container px-5'>
                        <label className='my-5 text-center w-100'>
                            <span className='' style={{ fontSize: '1.6em' }}>
                                Booking Deposite: {formatNumber(this.state.deposite)}{' '}
                            </span>
                            <span
                                className='font-weight-thin'
                                style={{ fontSize: '1.2em' }}
                            >
                                THB
                            </span>
                        </label>
                        <div className='row'>
                            <div className='col'>
                                <label>Credit Card Number</label>
                                <FormInput
                                    name='creditCardNumber'
                                    type='number'
                                    value={this.state.creditCardNumber}
                                    handleFormChange={this.handleFormChange}
                                    placeholder='Credit Card Number'
                                />
                            </div>
                            <div className='col'>
                                <label>Credit Card Name</label>
                                <FormInput
                                    name='creditCardName'
                                    type='text'
                                    value={this.state.creditCardName}
                                    handleFormChange={this.handleFormChange}
                                    placeholder='Credit Card Name'
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label>Exipiration Date</label>
                                <div className='row'>
                                    <div className='col'>
                                        <FormInput
                                            name='expMonth'
                                            type='text'
                                            value={this.state.expMonth}
                                            handleFormChange={
                                                this.handleFormChange
                                            }
                                            placeholder='Month'
                                        />
                                    </div>
                                    <div className='col'>
                                        <FormInput
                                            name='expYear'
                                            type='text'
                                            value={this.state.expYear}
                                            handleFormChange={
                                                this.handleFormChange
                                            }
                                            placeholder='Year'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col'>
                                <label>CCV/CVC</label>
                                <FormInput
                                    name='ccv'
                                    type='password'
                                    value={this.state.ccv}
                                    handleFormChange={this.handleFormChange}
                                    placeholder='CCV'
                                />
                            </div>
                        </div>
                        <div className='text-center mt-3'>
                            <button
                                className='btn'
                                onClick={this.handlePayment}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                );
        }
    };
    renderByState = () => {
        switch (this.state.state) {
            case 2:
                return this.renderState2();
            case 3:
                return this.renderState3();
            case 4:
                return this.renderState4();
            default:
                return this.renderState2();
        }
    };
    render() {
        return (
            <div style={{ minHeight: '100vh' }}>
                <Header />
                <div className='body-content'>
                    <div className='container'>
                        <BarStatus count={4} current={this.state.state} labels={['1. Search for a car', '2. Select a car', '3. Rental Information', '4. Payment']}/>
                        {this.renderByState()}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Search;
