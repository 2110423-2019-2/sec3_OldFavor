import React, { Component } from 'react';
import carItem from '../images/car-item.svg';
import EditModal from './EditModal';
import CancelButton from './CancelButton';
import utils from '../utils.js';

function formatNumber(num) {
    if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return num;
}
class CarHis extends Component {
    constructor(props) {
        super(props);

        this.state = { imageDidExists: false };
        this.imageExists = this.imageExists.bind(this);
    }
    componentDidMount() {
        this.imageExists(this.props.photoOfCar);
    }
    imageExists(image_url) {
        if (image_url === undefined) {
            return;
        } else {
            fetch(image_url, {
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    Accept: '*/*',
                },
                redirect: 'follow',
                referrer: 'no-referrer',
            })
                .then((response) => {
                    if (response.status !== 404) {
                        this.setState({ imageDidExists: true });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    cancelDeal = (event) => {
        const _id = this.props.deal._id;
        if (window.confirm('Do you really want to cancel this deal?')) {
            console.log('Canceled!');
            if (this.props.lesseeState === 1) {
                fetch(
                    'https://rentsee.poomrokc.services/rentsee/api/rents/lesseeCancel/' +
                        _id,
                    {
                        method: 'PATCH',
                        headers: utils.authHeader(),
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((resJson) => {
                        this.lessorHistory = resJson;
                        this.setState({
                            lessorHistory: resJson,
                        });
                        console.log(this.lessorHistory);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (this.props.lesseeState === 0) {
                fetch(
                    'https://rentsee.poomrokc.services/rentsee/api/rents/lessorCancel/' +
                        _id,
                    {
                        method: 'PATCH',
                        headers: utils.authHeader(),
                    }
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((resJson) => {
                        this.setState({
                            lessorHistory: resJson,
                        });
                        console.log(this.resJson);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            event.preventDefault();
        }
    };
    handleEditDeal = (policy) => {
        const _id = this.props.deal._id;
        if (policy.trim().length === 0) {
            alert('Invalid policy!');
        } else {
            fetch(
                `https://rentsee.poomrokc.services/rentsee/api/rents/editPolicy/${_id}`,
                {
                    method: 'PATCH',
                    headers: utils.authHeader(),
                    body: JSON.stringify({
                        policy: policy,
                    }),
                }
            )
                .then((response) => {
                    return response.json();
                })
                .then((resJson) => {
                    console.log(resJson);
					window.location.reload();
                })
                .catch((error) => {
                    console.log('Oh on! An error occur :(');
                    console.log(error);
                });
        }
    };
    handleReceipt = () => {
        const _id = this.props.deal._id;
        fetch(
            `https://rentsee.poomrokc.services/rentsee/api/rents/receipt/${_id}`,
            {
                method: 'GET',
                headers: utils.authHeader(),
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((resJson) => {
                console.log(resJson);
                this.setState({ printState: 2, receipt: resJson });
            })
            .catch((error) => {
                console.log('Oh on! An error occur :(');
                console.log(error);
            });
    };
    renderHistory = () => {
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className='col'>Pick Up Location:</div>
                        </div>
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className='col' style={{ fontWeight: 'bold' }}>
                                {this.props.pickUpLocation}
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className='col'>Return Location:</div>
                        </div>
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className='col' style={{ fontWeight: 'bold' }}>
                                {this.props.returnLocation}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mb-4'></div>
                <div className='row mb-4'></div>
                <div className='row'>
                    <div className='col'>
                        <img
                            src={
                                this.state.imageDidExists
                                    ? this.props.photoOfCar
                                    : carItem
                            }
                            alt=''
                            style={{ maxHeight: '200px', width: '100%' }}
                        ></img>
                    </div>
                    <div className='col'>
                        <div className='car-title-text'>{this.props.brand}</div>
                        <div className='car-type-text'>{this.props.type}</div>
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
                    </div>
                    <div className='col-2'>
                        <div className='row'>
                            <div
                                className='col'
                                style={{ padding: '50px 0px 0px 0px' }}
                            >
                                <div className='car-cost-text'>
                                    {formatNumber(this.props.cost)}
                                </div>
                                <div className='car-cost-unit-text'>
                                    THB/DAY
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mb-4'></div>
                <div className='row mb-1 font-weight-bold'>Policy</div>
                <div className='row mb-4'>
                    {this.props.deal.policy && this.props.deal.policy}
                </div>
				<div className='row mb-1 font-weight-bold'>Lessee Contact</div>
                <div className='row mb-4'>
					Full Name:&nbsp;<b>{this.props.lessee&&this.props.lessee.fullname?this.props.lessee.fullname:'Not Entered'}</b>&nbsp;Phone:&nbsp;<b>{this.props.lessee&&this.props.lessee.phoneNumber?this.props.lessee.phoneNumber:'Not Entered'}</b>
                </div>
				<div className='row mb-1 font-weight-bold'>Lessor Contact</div>
                <div className='row mb-4'>
                    Full Name:&nbsp;<b>{this.props.lessor&&this.props.lessor.fullname?this.props.lessor.fullname:'Not Entered'}</b>&nbsp;Phone:&nbsp;<b>{this.props.lessor&&this.props.lessor.phoneNumber?this.props.lessor.phoneNumber:'Not Entered'}</b>
                </div>
                <div className='row mb-4'>
					{this.props.status == 1 &&<EditModal
                        policy={this.props.deal.policy}
                        handleEditDeal={this.handleEditDeal}
                    />}
                    <button
                        style={{
                            float: 'right',
                        }}
                        type='button'
                        className='btn mt-4 mx-1'
                        onClick={this.handlePrint}
                    >
                        Print
                    </button>
                    <button
                        style={{
                            float: 'right',
                        }}
                        type='button'
                        className='btn mt-4 mx-1'
                        onClick={this.handleReceipt}
                    >
                        E-Receipt
                    </button>
                </div>

                <div className='row mb-4'>
                </div>
                <div className='row my-4'></div>

                <div className='row mb-4'></div>
                {this.props.status == 1 && <form
                    className='row'
                    onSubmit={this.props.cancelClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <input
                        style={{ color: 'write', backgroundColor: 'write' }}
                        className='btn btn-outline-danger d-flex float-right '
                        type='submit'
                        value='Cancel Deal'
                    />
                </form>}
            </React.Fragment>
        );
    };
    renderPrint = () => {
        return (
            <div>
                <h1>Rental Agreement</h1>
                <p className='my-5'>
                    {this.props.deal.policy && this.props.deal.policy}
                </p>
                <button className='btn' onClick={() => window.print()}>
                    Print
                </button>
            </div>
        );
    };
    renderReceipt = () => {
        const receipt = this.state.receipt;
        console.log(receipt);
        const deposite = receipt.totalPrice * 0.4;
        return (
            <div>
                <h1>E-Receipt</h1>
                <div>lessor id: {this.state.receipt.lessorId}</div>
                <div>
                    lessor fullname: {this.state.receipt.lessor[0].fullname}
                </div>
                <div>lessee id: {this.state.receipt.renterId}</div>
                <div>
                    lessee fullname: {this.state.receipt.renter[0].fullname}
                </div>
                <div>pickUp Datetime: {this.state.receipt.pickUpDateTime}</div>
                <div>pickUp Location: {this.state.receipt.pickUpLocation}</div>
                <div>return Datetime: {this.state.receipt.returnDateTime}</div>
                <div>return Location: {this.state.receipt.returnLocation}</div>
                <p className='my-5'>
                    Total Price: {formatNumber(receipt.totalPrice)} THB
                </p>
                <p className='my-5'>Deposite: {formatNumber(deposite)} THB</p>
                <button className='btn' onClick={() => window.print()}>
                    Print
                </button>
            </div>
        );
    };
    handlePrint = () => {
        this.setState({ printState: 1 });
    };
    renderByState = () => {
        switch (this.state.printState) {
            case 1:
                return this.renderPrint();
            case 2:
                return this.renderReceipt();
            default:
                return this.renderHistory();
        }
    };
    render() {
        return this.renderByState();
    }
}

export default CarHis;
