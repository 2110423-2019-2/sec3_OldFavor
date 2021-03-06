import React, { Component } from 'react';
import rentseeLogoWhite from '../images/logo-rentsee.svg';
import './Body.css';

class Footer extends Component {
    state = {};
    render() {
        return (
            <div
                style={{
                    backgroundColor: '#545372',
                    textAlign: 'center',
                    marginTop: '50px',
                    width: '100%',
                    height: '200px'
                }}
            >
                <img
                    className='pt-3 pb-3'
                    src={rentseeLogoWhite}
                    alt=''
                    style={{ margin: 'auto', display: 'block' }}
                />
                <a className='text-white mx-4' href='/'>
                    Home
                </a>
                <a className='text-white mx-4' href='/'>
                    About
                </a>
                <a className='text-white mx-4' href='/'>
                    Help
                </a>
                <a className='text-white mx-4' href='/'>
                    About Us
                </a>
                <div className='text-light pt-5 pb-3' style={{ fontSize: 14 }}>
                    © 2020 All rights reserved. OldFavor Team.
                </div>
            </div>
        );
    }
}

export default Footer;
