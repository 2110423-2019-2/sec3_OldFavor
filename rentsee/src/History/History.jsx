import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FullDeal from '../Components/FullDeal'
import utils from '../utils.js';
import Header from '../Components/Header';
import CarHis from '../Components/CarHis';
import Footer from '../Components/Footer';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyResult: "",
            fullView: false,
            fullViewIndex: -1,
            dealState:0
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.carResult = this.carResult.bind(this);
        this.handleThisView = this.handleThisView.bind(this);
        this.confirmDeal = this.confirmDeal.bind(this);
    }
    componentDidMount() {
        fetch('https://hueco.ml/rentsee/api/rents', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                this.historyResult = resJson;
                this.setState({
                    historyResult: resJson
                });
                console.log(this.historyResult);
            })
            .catch(error => {
                console.log(error);
            });
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log('change: ' + [name] + ' ' + value);
        this.setState({ [name]: value });
    }
    handleThisView = val => e => {
        e.preventDefault();

        this.fullView = true;
        //alert(this.fullView);
        let thisId = val;
        for (let i = 0; i < this.historyResult.length; i++) {
            if (thisId === this.historyResult[i]._id) {
                this.setState({
                    fullView: true,
                    fullViewIndex: i
                });
                //alert(this.historyResult[i].car.carModel);
                //alert(this.historyResult[i].car.brand);
                break;
            }
        }
    }
    carResult() {
        let rents = this.state.historyResult;
        //console.log(rents);
        if (rents.length !== 0) {
            return rents.map(rent => {
                //console.log(rent);
                //console.log(rent._id);
                return (

                    <CarHis
                        pickUpLocation={rent.pickUpLocation}
                        returnLocation={rent.returnLocation}
                        brand={rent.car.carModel}
                        type={rent.car.carType}
                        cost={(rent.pricePerDay === null) ? 0 : rent.pricePerDay}
                        photoOfCar={rent.car.photoOfCar}
                        capacity={rent.car.capacity}
                        onClick={this.handleThisView(rent._id)}
                    />
                );
            });
        };
    }
    confirmDeal() {
        //confirm("Are you sure that car is arrived");
        //alert("ss");
        if( window.confirm("Are you sure that a car has arrived?")){
            console.log("Confirmed!");
        }
    }

    cancelDeal() {
        if( window.confirm("Do you really want to cancel this deal?")){
            console.log("Canceled!");
        }
    }
    viewDetail() {
        let deal = this.state.historyResult[this.state.fullViewIndex];
        return (
            <FullDeal
                pickUpLocation={deal.pickUpLocation}
                returnLocation={deal.returnLocation}
                brand={deal.car.carModel}
                type={deal.car.carType}
                cost={(deal.pricePerDay === null) ? 0 : deal.pricePerDay}
                photoOfCar={deal.car.photoOfCar}
                capacity={deal.car.capacity}
                confirmClick={this.confirmDeal}
                cancelClick={this.cancelDeal}
            />
        );

    }

    render() {
        console.log(this.fullView);
        let backButton;
        let confirmModal;
        let viewBody;
        if (!this.fullView) {
            viewBody = this.carResult();
        }
        else {
            viewBody = this.viewDetail();
            backButton =
                <form className='col' onSubmit={this.handleBack}>
                    <input
                        className='btn btn-outline-danger d-flex float-right '
                        type='submit'
                        value='Back'
                    />
                </form>
            if(this.state.dealState === 1){
                confirmModal = <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">.col-md-4</div>
                        <div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 ml-auto">.col-md-3 .ml-auto</div>
                        <div class="col-md-2 ml-auto">.col-md-2 .ml-auto</div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 ml-auto">.col-md-6 .ml-auto</div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9">
                            Level 1: .col-sm-9
                        <div class="row">
                                <div class="col-8 col-sm-6">
                                    Level 2: .col-8 .col-sm-6
                        </div>
                                <div class="col-4 col-sm-6">
                                    Level 2: .col-4 .col-sm-6
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }

        }
        return (
            <React.Fragment>
                <div className='container-fluid'>
                    <Header />
                    {this.confirmDeal}
                    {confirmModal}
                    <div className='row mb-4'></div>
                    <div className='row mb-4'></div>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col'>
                            <h1 className='ml-0'>Rental History</h1>
                        </div>
                        <div className='col'></div>
                        {backButton}

                        <div className='col-2'></div>
                    </div>
                    <div className='row mb-4'></div>
                    <div className='row'>
                        <div className='col-2'></div>
                        <div className='col'>
                            {viewBody}
                        </div>
                        <div className='col-2'></div>
                    </div>
                    <div className='row mb-4'></div>
                </div>
                <div className='row' style={{ position: "relative", margin: '0', width: "100%" }}><Footer /></div>


            </React.Fragment>
        );
    }
}

export default withRouter(Profile);
