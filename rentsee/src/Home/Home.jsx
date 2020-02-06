import React, { Component } from 'react';
import utils from '../utils.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
        this.hello = this.hello.bind(this);
    }
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
    hello() {
        if (this.state.username) {
            return <div>Hello, {this.state.username}</div>;
        } else {
            return <div>You are not logged in</div>;
        }
    }
    render() {
        return (
            <div>
                <h1>Home</h1>
                <ul>
                    <a href='/'>Home</a>
                    <a href='/login'>Login</a>
                    <a href='/register'>Register</a>
                    <a href='/logout'>Logout</a>
                </ul>
                {this.hello()}
            </div>
        );
    }
}

export default Home;
