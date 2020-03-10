import React, { Component } from 'react';
import carItem from '../images/car-item.svg';

class CarItem extends Component {
    state = {};
    render() {
        return (
            <div className='card shadow-sm px-4 py-5 mt-3'>
                <div className='row'>
                    <div className='col'>
                        <img
                            src={carItem}
                            alt=''
                            style={{ width: '100%' }}
                        ></img>
                    </div>
                    <div className='col'>
                        <div className='car-title-text'>{this.props.brand}</div>
                        <div className='car-type-text'>{this.props.type}</div>
                    </div>
                    <div className='col'>
                        <div className='car-cost-text'>{this.props.cost}</div>
                        <div className='car-cost-unit-text'>THB/DAY</div>
                        <button
                            style={{
                                float: 'right'
                            }}
                            className='btn header mt-4'
                            href='/register'
                        >
                            View Deal
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CarItem;
