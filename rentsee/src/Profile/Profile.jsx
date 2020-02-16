import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import utils from '../utils.js';
//import loginCar from './images/login-car.svg';
import rentseeLogo from '../images/logo-rentsee.svg';



class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            drivingLisense : "",
            email : "",
            bankAccountNumber : "",
            address : "",
            phoneNumber : "",
            creditCardNumber : "",

        };

    }
    componentDidMount(){
        fetch('http://rentsee.krist7599555.ml/api/profile',{
            method: 'GET',
            headers: utils.authHeader()
        })
        .then(response => {
            return response.json();
        })
        .then(resJson => {
            console.log(resJson);
            this.setState({ 
                username: resJson.username,
                password : resJson.password,
                drivingLisense : resJson.drivingLisense,
                email : resJson.email,
                bankAccountNumber : resJson.bankAccountNumber,
                address : resJson.address,
                phoneNumber : resJson.phoneNumber,
                creditCardNumber : resJson.creditCardNumber

            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    render(){
        return(
            <div className='container-fluid full-screen'>
                <div className="row h-100">
                    <a href='/'>
                        <img className='logo' src={rentseeLogo} alt=''></img>
                    </a>
                </div>
            </div>

        );
    }
}

export default withRouter(Profile);