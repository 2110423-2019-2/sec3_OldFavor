import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import utils from '../utils.js';


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            birthdate : ""
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
                password : resJson.password
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    render(){
        return(
            <div className='container-fluid full-screen'>
                <h1> WOW </h1>
            </div>

        );
    }
}

export default withRouter(Profile);