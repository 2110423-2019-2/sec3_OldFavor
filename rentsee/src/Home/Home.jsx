import React, { Component } from 'react';
import utils from '../utils.js';

class Home extends Component {
    state = { username: '' };
    componentDidMount() {
        fetch('http://rentsee.krist7599555.ml/api/profile', {
            method: 'GET',
            headers: utils.authHeader()
        })
            .then(response => {
                return response.json();
            })
            .then(resJson => {
                console.log(resJson);
                this.setState({ username: resJson.username });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <div>Hello, {this.state.username}</div>
            </div>
        );
    }
}

export default Home;
