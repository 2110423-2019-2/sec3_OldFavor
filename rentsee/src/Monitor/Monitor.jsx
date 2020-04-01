import React, { Component } from 'react';
import Header from '../Components/Header';
import utils from '../utils.js';
import { findIndex } from 'lodash';
import BarStatus from '../Components/BarStatus';
import SearchPickUpReturn from '../Components/SearchPickUpReturn';
import FormInput from '../Components/FormInput';
import SortBy from '../Components/SortBy';
import CarItem from '../Components/CarItemAdmin';
import './Monitor.css';
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
class Monitor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchRes: [],
            username:'',
			q:''
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
                this.setState({ username: resJson.username });
            })
            .catch(error => {
                console.log(error);
            });
        this.search();
    }
    search = () => {
        var getUrl = `https://hueco.ml/rentsee/api/rents/`;
        fetch(getUrl, {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                console.log(resJson);
                const searchRes = resJson;
                this.setState({ searchRes });
            })
            .catch(error => {
                console.log(error);
            });
    };

    carResult() {
        const rents = this.state.searchRes;
        return rents.map(rent => {
            return (
                <CarItem
                    rent={rent}
                    key={rent._id}
                />
            );
        });
    }
    renderState2 = () => {
        return (
            <React.Fragment>
                <div className='container'>
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
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container mt-3'>{this.carResult()}</div>
            </React.Fragment>
        );
    };
    render() {
        return (
            <div style={{ minHeight: '100vh' }}>
                <Header />
                <div className='body-content'>
                    <div className='container'>
                        {this.renderState2()}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Monitor;
