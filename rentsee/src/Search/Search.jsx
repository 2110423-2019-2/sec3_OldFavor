import React, { Component } from 'react';
import Header from '../Components/Header';
import utils from '../utils.js';
import BarStatus from '../Components/BarStatus';
import SearchPickUpReturn from '../Components/SearchPickUpReturn';
import FormInput from '../Components/FormInput';
import SortBy from '../Components/SortBy';
import CarItem from '../Components/CarItem';
import './Search.css';
import Footer from '../Components/Footer';

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
            returnLocation: ''
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
    carResult() {
        const rents = this.state.searchRes;
        // const rents = [
        //     {
        //         policy: 'No alcohol',
        //         pricePerDay: 1760,
        //         car: {
        //             capacity: 5,
        //             photoOfCar:
        //                 'https://cors-anywhere.herokuapp.com/https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2018-tesla-model-s-100d-1545165580.jpg?crop=0.819xw:1.00xh;0,0&resize=640:*',
        //             carModel: 'Tesla Model S',
        //             carType: 'Electric Car, very cool'
        //         }
        //     }
        // ];
        // console.log(cars);
        return rents.map(rent => {
            return (
                <CarItem
                    brand={rent.car.carModel}
                    type={rent.car.carType}
                    cost={rent.pricePerDay}
                    photoOfCar={rent.car.photoOfCar}
                    capacity={rent.car.capacity}
                    policy={rent.policy}
                />
            );
        });
    }
    render() {
        return (
            <div style={{ minHeight: '100vh' }}>
                <Header />
                <div className='body-content'>
                    <div className='container'>
                        <BarStatus count={4} current={2} />
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
                                        options={['created']}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container mt-3'>
                        {this.carResult()}
                        <CarItem
                            brand='NISSAN'
                            type='ALMERA 1.2 E CVT or similar'
                            cost='1,587'
                            policy='No alcohol'
                            photoOfCar='https://cors-anywhere.herokuapp.com/https://i.picsum.photos/id/1071/3000/1996.jpg'
                            capacity='5'
                        />
                        <CarItem
                            brand='TOYOTA'
                            type='ALMERA 1.2 E CVT or similar'
                            cost='1,420'
                        />
                        <CarItem
                            brand='TESLA'
                            type='ALMERA 1.2 E CVT or similar'
                            cost='1,969'
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Search;
