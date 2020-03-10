import React, { Component } from 'react';

class CarDealModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none'
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        const display = this.state.display === 'none' ? 'block' : 'none';
        this.setState({ display });
    }
    render() {
        return (
            <React.Fragment>
                <button
                    style={{
                        float: 'right'
                    }}
                    type='button'
                    className='btn mt-4'
                    onClick={this.toggle}
                >
                    View Deal
                </button>
                <div
                    className='modal'
                    tabIndex='-1'
                    role='dialog'
                    style={{ display: this.state.display }}
                >
                    <div
                        className='modal-dialog modal-dialog-scrollable'
                        role='document'
                    >
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Car Deal</h5>
                                <button
                                    type='button'
                                    className='close'
                                    data-dismiss='modal'
                                    aria-label='Close'
                                    onClick={this.toggle}
                                >
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <p>
                                    DealDeal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    DealDeal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    DealDeal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    DealDeal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                    Deal Deal Deal Deal Deal Deal Deal Deal Deal{' '}
                                </p>
                            </div>
                            <div className='modal-footer'>
                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    data-dismiss='modal'
                                    onClick={this.toggle}
                                >
                                    Close
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={this.toggle}
                                >
                                    Rent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CarDealModal;
