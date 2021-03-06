import React, { Component } from 'react';
import carItem from '../images/car-item.svg';
import History from '../History/History';
import utils from '../utils.js';

const statusCon=["Open","Matched","Canceled by lessor","Canceled by lessee","Car handed to lessee","Complete(Car returned)"];
const colorPan=["orange","green","red","red","blue","green"];

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

    receivedCar = () => {
        const _id = this.props._id;
        fetch(
            `https://rentsee.poomrokc.services/rentsee/api/rents/receivedCar/${_id}`,
            {
                method: 'PATCH',
                headers: utils.authHeader(),
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
    };

    returnCar = () => {
        const _id = this.props._id;
        fetch(
            `https://rentsee.poomrokc.services/rentsee/api/rents/returnCar/${_id}`,
            {
                method: 'PATCH',
                headers: utils.authHeader(),
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
    };

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

    handleThisView = () => {
        //alert("wew");
        History.handleThisView(this.props._id);
    };
    render() {
        return (
            <React.Fragment>
                <div className='card shadow-sm px-4 py-5 mt-3 w-100'>
                    <div className='row'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col'>Pick Up Location:</div>
                            </div>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div
                                    className='col'
                                    style={{ fontWeight: 'bold' }}
                                >
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
                                <div
                                    className='col'
                                    style={{ fontWeight: 'bold' }}
                                >
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
                                style={{ maxHeight: '200px', width: '100%', marginBottom:'20px' }}
                            ></img>
							<div style={{display:'inline',fontWeight:'bold',fontSize:'20px'}}>Status: <div style={{display:'inline',color:colorPan[this.props.status]}}>{statusCon[this.props.status]}</div></div>
                        </div>
                        <div className='col'>
                            <div className='car-title-text'>
                                {this.props.brand}
                            </div>
                            <div className='car-type-text'>
                                {this.props.type}
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
                        </div>
                        <div className='col-2'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='car-cost-text'>
                                        {formatNumber(this.props.cost)}
                                    </div>
                                    <div className='car-cost-unit-text'>
                                        THB/DAY
                                    </div>
                                </div>
                            </div>
                            {this.props.status==1&&this.props.mode=='lessee'&&<button
                                className=''
								style={{marginTop:'20px',marginLeft:'-15px',marginRight:'-15px',width:'calc(100% + 30px)', textAlign:'center', backgroundColor:'#545372',color:'white',borderRadius:'0.25rem',border:'1px solid #545372',height:'40px'}}
                                onClick={this.receivedCar}
                            >
                                Car received
                            </button>
							}
							{this.props.status==4&&this.props.mode=='lessor'&&
								<button
									className=''
									style={{marginTop:'20px',marginLeft:'-15px',marginRight:'-15px',width:'calc(100% + 30px)', textAlign:'center', backgroundColor:'#545372',color:'white',borderRadius:'0.25rem',border:'1px solid #545372',height:'40px'}}
									onClick={this.returnCar}
								>
                                Car returned
                            </button>}
                            <form
                                className='row'
                                onSubmit={this.props.onClick}
                                style={{ padding: '80px 0px 0px 0px' }}
                            >
                                <input
                                    className=''
									style={{width:'100%', textAlign:'center', backgroundColor:'#545372',color:'white',borderRadius:'0.25rem',border:'1px solid #545372',height:'40px'}}
                                    type='submit'
                                    value='View Detail'
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CarHis;
