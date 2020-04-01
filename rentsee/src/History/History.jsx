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
            thisUID: "",
            lesseeHistory: "",
            lessorHistory: "",
            fullView: false,
            fullViewIndex: -1,
            dealState: 0,
            dealID: "",
            lesseeState: -1
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.lesseeResult = this.lesseeResult.bind(this);
        this.lessorResult = this.lessorResult.bind(this);
        this.handleThisViewLessee = this.handleThisViewLessee.bind(this);
        this.handleThisViewLessor = this.handleThisViewLessor.bind(this);
        this.confirmDeal = this.confirmDeal.bind(this);
		this.cancelDeal = this.cancelDeal.bind(this);
    }
    async componentDidMount() {
        /*await fetch('https://hueco.ml/rentsee/api/profile', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                console.log(resJson);
                this.setState({
                    thisUID: resJson._id,
                });
                this.state.thisUID = resJson._id;
            })
            .catch(error => {
                console.log(error);
            });*/
        //await alert('https://hueco.ml/rentsee/api/rents/'+ this.state.thisUID);
        fetch('https://hueco.ml/rentsee/api/rents/lesseeHistory', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                this.lesseeHistory = resJson;
                this.setState({
                    lesseeHistory: resJson
                });
                console.log(this.lesseeHistory);
            })
            .catch(error => {
                console.log(error);
            });

        fetch('https://hueco.ml/rentsee/api/rents/lessorHistory', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                this.lessorHistory = resJson;
                this.setState({
                    lessorHistory: resJson
                });
                console.log(this.lessorHistory);
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
    handleThisViewLessee = val => e => {
        e.preventDefault();
        this.fullView = true;
        this.lesseeState = 1;
        let dealID = val;
        for (let i = 0; i < this.lesseeHistory.length; i++) {
            if (dealID === this.lesseeHistory[i]._id) {
                this.setState({
                    fullView: true,
                    fullViewIndex: i,
                    lesseeState : 1
                });
                //alert(this.historyResult[i].car.carModel);
                //alert(this.historyResult[i].car.brand);
                break;
            }
        }
    }
    handleThisViewLessor = val => e => {
        e.preventDefault();
        this.fullView = true;
        this.lesseeState = 0;
        let dealID = val;
        for (let i = 0; i < this.lessorHistory.length; i++) {
            if (dealID === this.lessorHistory[i]._id) {
                this.setState({
                    fullView: true,
                    fullViewIndex: i,
                    lesseeState : 0
                });
                //alert(this.historyResult[i].car.carModel);
                //alert(this.historyResult[i].car.brand);
                break;
            }
        }
    }
    lesseeResult() {
        let rents = this.state.lesseeHistory;
        console.log(rents);
        if (rents.length !== 0 && rents !== null) {
            return rents.map(rent => {
                return (
                    <CarHis
                        pickUpLocation={rent.pickUpLocation}
                        returnLocation={rent.returnLocation}
                        brand={rent.car.carModel}
                        type={rent.car.carType}
                        cost={(rent.pricePerDay === null) ? 0 : rent.pricePerDay}
                        photoOfCar={rent.car.photoOfCar}
                        capacity={rent.car.capacity}
                        onClick={this.handleThisViewLessee(rent._id)}
                    />
                );
            });
        };
    }
    lessorResult() {
        let rents = this.state.lessorHistory;
        console.log(rents);
        if (rents.length !== 0 && rents !== null) {
            return rents.map(rent => {

                return (

                    <CarHis
                        pickUpLocation={rent.pickUpLocation}
                        returnLocation={rent.returnLocation}
                        brand={rent.car.carModel}
                        type={rent.car.carType}
                        cost={(rent.pricePerDay === null) ? 0 : rent.pricePerDay}
                        photoOfCar={rent.car.photoOfCar}
                        capacity={rent.car.capacity}
                        onClick={this.handleThisViewLessor(rent._id)}
                    />
                );
            });
        };
    }
    confirmDeal(event) {
        //confirm("Are you sure that car is arrived");
        //alert("ss");

        if (window.confirm("Are you sure that a car has arrived?")) {
            alert("Confirmed!");
            fetch('https://hueco.ml/rentsee/api/rents/confirm/' + this.state.dealID, {
                method: 'PATCH',
                headers: utils.authHeader()
            })
                .then(response => {
                    return response.json();
                })
                .then(resJson => {
                    this.lessorHistory = resJson;
                    this.setState({
                        lessorHistory: resJson
                    });
                    console.log(this.lessorHistory);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            event.preventDefault();
        }
    }

    cancelDeal(event) {
		event.preventDefault();
        if (window.confirm("Do you really want to cancel this deal?")) {
            if (this.state.lesseeState === 1) {
                fetch('https://hueco.ml/rentsee/api/rents/lesseeCancel/' + this.state.dealID, {
                    method: 'PATCH',
                    headers: utils.authHeader()
                })
                    .then(response => {
                        window.location.reload();
                    })
            }
            else if (this.state.lesseeState === 0) {
                fetch('https://hueco.ml/rentsee/api/rents/lessorCancel/' + this.state.dealID, {
                    method: 'PATCH',
                    headers: utils.authHeader()
                })
                    .then(response => {
                        window.location.reload();
                    })

            }
        }
    }
    viewDetail() {
        let deal
        if (this.state.lesseeState === 1) {
            deal = this.state.lesseeHistory[this.state.fullViewIndex];
        }
        else if (this.state.lesseeState === 0) {
            deal = this.state.lessorHistory[this.state.fullViewIndex];
        }
        //alert(this.state.lesseeState);
        this.state.dealID = deal._id;
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
        let lessorBody;
        let lesseeBody;
        let headBody;
        let midBody;
        let midBody2;
        let midBody3;
        let midBody4;
        if (!this.fullView) {
            lesseeBody = this.lesseeResult();
            lessorBody = this.lessorResult();
            headBody = <div className="row"><h3 className='ml-0'>Lessee</h3></div>;
            midBody = <div className='row mb-4'></div>
            midBody2 = <div class='w-100 border-top'></div>
            midBody3 = <div className='row mb-4'></div>
            midBody4 = <div className="row"><h3 className='ml-0'>Lessor</h3></div>
        }
        else {

            midBody = this.viewDetail();

            backButton =
                <form className='col' onSubmit={this.handleBack}>
                    <input
                        className='btn btn-outline-danger d-flex float-right '
                        type='submit'
                        value='Back'
                    />
                </form>


        }
        return (
            <React.Fragment>
                <div className='container-fluid'>
                    <Header />

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
                            {headBody}
                            <div className="row">
                                {lesseeBody}
                            </div>
                            {midBody}
                            {midBody2}
                            {midBody3}
                            {midBody4}
                            <div className='row'>
                                {lessorBody}
                            </div>

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

