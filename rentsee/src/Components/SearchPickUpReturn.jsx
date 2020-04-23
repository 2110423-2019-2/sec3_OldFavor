import React, { Component } from 'react';
class SearchPickUpReturn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            pickUpLocation,
            pickUpDateTime,
            returnLocation,
            returnDateTime
        } = this.props;
        return (
            <div className='row mt-3'>
                <div className='col'>
                    <div>Pick Up:</div>
                    <div className='font-weight-bold'>{pickUpLocation}</div>
                    <div className='font-weight-bold'>{pickUpDateTime}</div>
                </div>
                <div className='col'>
                    <div>Return:</div>
                    <div className='font-weight-bold'>{returnLocation}</div>
                    <div className='font-weight-bold'>{returnDateTime}</div>
                </div>
            </div>
        );
    }
}

export default SearchPickUpReturn;
