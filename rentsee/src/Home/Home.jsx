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
            sortWay: 1,
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
        if (
            !this.state.pickUpDateTime |
            !this.state.returnDateTime |
            !this.state.pickUpLocation |
            !this.state.returnLocation
        ) {
            alert(
                'Please fill the Pick-up Location and Return Location and Date'
            );
        } else {
            var getUrl = `https://rentsee.poomrokc.services/rentsee/api/rents/search?q=${
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
    }
    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState(this.state);
        });
        fetch('https://rentsee.poomrokc.services/rentsee/api/profile', {
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
            <div style={{ position: 'relative' }}>
                <div
                    id='home-background'
                    style={{
                        position: 'absolute',
                        zIndex: -100,
                        height: 'calc(100vh - 120px)',
                        top: 0,
                        left: 0,
                        width: '100%',
                        backgroundImage:
                            'linear-gradient(180deg, rgba(255, 255, 255, 0.87) 103.95%, rgba(189, 211, 225, 0.42) 184.16%, rgba(132, 148, 174, 0.72) 203.95%), url(' +
                            banner +
                            ')'
                    }}
                ></div>
                <Header />
                <div
                    id='home-body'
                    style={{
                        minHeight: 500,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 32,
                        flexDirection:
                            window.innerWidth > 700 ? 'row' : 'column'
                    }}
                >
                    <div
                        id='home-body-left'
                        className='d-none d-md-block'
                        style={{
                            position: 'relative'
                            // transform: window.innerWidth > 600 ? "" : "scale(1.6)",
                        }}
                    >
                        <h1 className='card-title'>Reserve You Car</h1>
                        <img
                            src={car}
                            style={{
                                width: '48.3vw',
                                maxWidth: 603,
                                zIndex: 10
                            }}
                            alt=''
                        />
                        <img
                            src={carShadow}
                            style={{
                                width: '48.6vw',
                                maxWidth: 603,
                                zIndex: -9,
                                position: 'absolute',
                                top: 136,
                                left: 41
                            }}
                            alt=''
                        />
                    </div>
                    <div
                        id='home-body-right'
                        className='card'
                        style={{
                            zIndex: 100,
                            maxWidth: 400,
                            padding: 35,
                            paddingTop: 25,
                            height: '100%'
                        }}
                    >
                        <h5
                            className='card-title text-center'
                            style={{ fontSize: 32 }}
                        >
                            Find your ideal car now
                        </h5>
                        <br />

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

                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div
                                className='text-label'
                                style={{ width: '49%' }}
                            >
                                Pick-up Date:
                                <FormInput
                                    type='date'
                                    name='pickUpDateTime'
                                    handleFormChange={this.handleFormChange}
                                    icon='M20 19h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm16-14v22h-24v-22h24zm-2 6h-20v14h20v-14zm-8 8h-4v4h4v-4zm-6-6h-4v4h4v-4z'
                                />
                            </div>
                            <div
                                className='text-label'
                                style={{ width: '49%' }}
                            >
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
                <Footer />
            </div>
        );
    }
}

export default withRouter(Home);
