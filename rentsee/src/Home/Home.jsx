import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import utils from '../utils.js';
import Header from '../Components/Header';
import banner from '../images/home-banner.svg';
import './Home.css';
import FormInput from '../Components/FormInput';
import carShadow from '../images/car-shadow.svg';
import car from '../images/hohdacity.svg';
import Footer from '../Components/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            q: '',
            sort: 'created',
            sortWay: -1,
            pickUpDateTime: undefined,
            returnDateTime: undefined,
            pickUpLocation: '',
            returnLocation: ''
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.search = this.search.bind(this);
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    }
    search() {
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
    }
    componentDidMount() {
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

    render() {
        return (
            <div>
                <Header />
                <div className='body-content'>
                    <div style={{ width: '1vw' }}>
                        <img
                            style={{
                                width: '100%',
                                zIndex: -100,
                                position: 'absolute',
                                top: -99
                            }}
                            src={banner}
                            alt=''
                        />
                        <div
                            style={{
                                width: '100%',
                                height: '47.5vw',
                                zIndex: -99,
                                position: 'absolute',
                                top: -99,
                                background:
                                    'linear-gradient(180deg, rgba(255, 255, 255, 0.87) 103.95%, rgba(189, 211, 225, 0.42) 184.16%, rgba(132, 148, 174, 0.72) 203.95%)'
                            }}
                        />
                    </div>
                    <div
                        className='card'
                        style={{
                            zIndex: 100,
                            width: '36.4vw',
                            minHeight: 350,
                            position: 'absolute',
                            top: '108px',
                            left: '50vw'
                        }}
                    >
                        <div className='card-body'>
                            <h5 className='card-title text-center'>
                                Find your ideal car now
                            </h5>
                        </div>
                        <div className='px-5'>
                            <FormInput
                                type='text'
                                name='pickUpLocation'
                                handleFormChange={this.handleFormChange}
                                placeholder='Pick-up Location'
                                icon='M6.974 22.957c-10.957-11.421 2.326-20.865 10.384-13.309l-2.464 2.352h9.106v-8.947l-2.232 2.229c-14.794-13.203-31.51 7.051-14.794 17.675z'
                            />
                            <FormInput
                                type='text'
                                name='returnLocation'
                                handleFormChange={this.handleFormChange}
                                placeholder='Return Location'
                                icon='M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z'
                            />
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
                            <FormInput
                                type='text'
                                name='q'
                                handleFormChange={this.handleFormChange}
                                placeholder='Search'
                                icon='M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z'
                            />
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
                                    onClick={this.search}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className='container px-5'
                        style={{ position: 'relative' }}
                    >
                        <h1 className='card-title'>Reserve You Car</h1>
                        <img
                            src={car}
                            style={{ width: '48.3vw', zIndex: 10 }}
                            alt=''
                        />
                        <img
                            src={carShadow}
                            style={{
                                width: '48.6vw',
                                zIndex: -9,
                                position: 'absolute',
                                top: 136,
                                left: 41
                            }}
                            alt=''
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Home);
