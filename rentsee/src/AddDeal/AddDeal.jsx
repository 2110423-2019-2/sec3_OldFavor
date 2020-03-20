import React, { Component } from 'react';
import Header from '../Components/Header';
import utils from '../utils.js';
import Footer from '../Components/Footer';

class AddDeal extends Component {
    state = { rentableCars: [] };
    componentWillMount() {
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
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className='body-content'>
                    {this.state.rentableCars.toString()}
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default AddDeal;
