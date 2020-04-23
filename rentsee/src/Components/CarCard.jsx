import React, { Component } from 'react';
import carItem from '../images/car-item.svg';

class CarItem extends Component {
    constructor(props) {
        super(props);
        this.state = { imageDidExists: false };
    }
    componentDidMount() {
        this.imageExists(this.props.photoOfCar);
    }
    imageExists = image_url => {
        if (image_url === undefined) {
            return;
        } else {
            fetch(image_url, {
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    Accept: '*/*'
                },
                redirect: 'follow',
                referrer: 'no-referrer'
            })
                .then(response => {
                    if (response.status !== 404) {
                        this.setState({ imageDidExists: true });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    handleOnClick = () => {
        this.props.handleOnClick(this.props._id);
    };
    render() {
        return (
            <button
                className='card shadow-sm px-4 py-5 mt-3 w-100'
                onClick={this.handleOnClick}
            >
                <div className='row'>
                    <div className='col'>
                        <img
                            src={
                                this.state.imageDidExists
                                    ? this.props.photoOfCar
                                    : carItem
                            }
                            alt=''
                            style={{ width: '100%' }}
                        ></img>
                    </div>
                    <div className='col text-left'>
                        <div className='car-title-text'>
                            {this.props.carModel}
                        </div>
                        <div className='car-type-text'>
                            {this.props.carType}
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
                                {this.props.capacity
                                    ? this.props.capacity
                                    : 'N/A'}{' '}
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
                                {this.props.carDescription}
                            </span>
                        </div>
                    </div>
                    <div className='col'></div>
                </div>
            </button>
        );
    }
}

export default CarItem;
