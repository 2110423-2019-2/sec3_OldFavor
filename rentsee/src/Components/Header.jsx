import React, { Component } from 'react';
import './Header.css';
import rentseeLogo from '../images/logo-rentsee-color.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNavWidth: '0px'
        };
        this.openNav = this.openNav.bind(this);
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
                        style={{ width: '119px', height: '39px', margin: '30px 80px' }}
                        className=''
                        src={rentseeLogo}
                        alt=''
                    />
                </a>
                <div className='sidenav' style={{ width: this.state.sideNavWidth }}>
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
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='#545372'>
                        <path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
                    </svg>
                </button>
                <div className='d-none d-lg-block' style={{ float: 'right' }}>
                    <a
                        style={{ float: 'right', margin: '27px 100px 18px 0px' }}
                        className='btn header'
                        href='/register'
                        role='button'
                    >
                        Sign Up
                    </a>
                    <a className='text' style={{ float: 'right', margin: '35px 18px 35px 80px' }} href='/login'>
                        Login
                    </a>
                    <a className='text' style={{ float: 'right', margin: '35px 18px' }} href='/'>
                        Help
                    </a>
                    <a className='text' style={{ float: 'right', margin: '35px 18px' }} href='/'>
                        Gallery
                    </a>
                    <a className='text' style={{ float: 'right', margin: '35px 18px', alignSelf: 'center' }} href='/'>
                        Home
                    </a>
                </div>
            </div>
        );
    }
}

export default Header;
