import React, { Component } from 'react';
import './Header.css';
import rentseeLogo from '../images/logo-rentsee-color.svg';
import downArrow from '../images/down-arrow.svg';
import utils from '../utils.js';
import Notification from '../Components/Notification';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNavWidth: '0px',
            tooltipState: 'none'
        };
        this.openNav = this.openNav.bind(this);
        this.profileDiv = this.profileDiv.bind(this);
        this.tooltip = this.tooltip.bind(this);
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
    tooltip() {
        const tooltipState = this.state.tooltipState;
        this.setState({
            tooltipState: tooltipState === 'none' ? 'block' : 'none'
        });
    }
    profileDiv() {
        const username = this.state.username;
        if (username) {
            return (
                <React.Fragment>
                    <div
                        className='card'
                        style={{
                            minWidth: 150,
                            position: 'absolute',
                            right: 75,
                            top: 60,
                            backgroundColor: 'rgba(255,255,255)',
                            boxShadow: '10 10',
                            borderRadius: 5,
                            zIndex: 101,
                            display: this.state.tooltipState
                        }}
                    >
                        <a className='text' href='/profile'>
                            <div className='text-center'>Profile</div>
                        </a>
                        <a className='text' href='/history'>
                            <div className='text-center'>History</div>
                        </a>
                        <a className='text-red' href='/logout'>
                            <div className='text-center'>Logout</div>
                        </a>
                    </div>
                    <button
                        className='clear-btn'
                        style={{
                            float: 'right',
                            margin: '35px 80px 35px 10px'
                        }}
                        onClick={this.tooltip}
                    >
                        <img
                            style={{ width: '17', height: '11.96px' }}
                            className=''
                            src={downArrow}
                            alt=''
                        />
                    </button>
                    <a
                        className='text text-bold'
                        style={{
                            float: 'right',
                            margin: '35px 15px 35px 25px'
                        }}
                        href='/profile'
                    >
                        {username}
                    </a>
                    <Notification />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <a
                    style={{ float: 'right', margin: '27px 100px 18px 0px' }}
                    className='btn header'
                    href='/register'
                    role='button'
                >
                    Sign Up
                </a>
                <a
                    className='text'
                    style={{ float: 'right', margin: '35px 18px 35px 80px' }}
                    href='/login'
                >
                    Login
                </a>
            </React.Fragment>
        );
    }
    openNav(event) {
        event.preventDefault();
        let newWidth = this.state.sideNavWidth === '0px' ? '250px' : '0px';
        console.log('hello');
        this.setState({ sideNavWidth: newWidth });
    }
    render() {
        return (
            <div>
                <a href='/'>
                    <img
                        style={{
                            width: '119px',
                            height: '39px',
                            margin: '30px 80px'
                        }}
                        className=''
                        src={rentseeLogo}
                        alt=''
                    />
                </a>
                <div
                    className='sidenav'
                    style={{ width: this.state.sideNavWidth }}
                >
                    <button
                        className='closebtn'
                        style={{ border: 'none', backgroundColor: '#ffffff00' }}
                        onClick={this.openNav}
                    >
                        &times;
                    </button>
                    <a href='/'>About</a>
                    <a href='/'>Services</a>
                    <a href='/'>Clients</a>
                    <a href='/'>Contact</a>
                </div>
                <button
                    className='d-block d-lg-none'
                    onClick={this.openNav}
                    style={{
                        float: 'right',
                        margin: '34px 100px 18px 0px',
                        border: 'none',
                        backgroundColor: '#ffffff00'
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#545372'
                    >
                        <path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
                    </svg>
                </button>
                <div className='d-none d-lg-block' style={{ float: 'right' }}>
                    {this.profileDiv()}
                    <a
                        className='text'
                        style={{ float: 'right', margin: '35px 18px' }}
                        href='/'
                    >
                        Help
                    </a>
                    <a
                        className='text'
                        style={{ float: 'right', margin: '35px 18px' }}
                        href='/AddCar'
                    >
                        Add Car
                    </a>
                    <a
                        className='text'
                        style={{
                            float: 'right',
                            margin: '35px 18px',
                            alignSelf: 'center'
                        }}
                        href='/'
                    >
                        Home
                    </a>
                </div>
            </div>
        );
    }
}

export default Header;
