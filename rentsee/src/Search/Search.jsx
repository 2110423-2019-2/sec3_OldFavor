import React, { Component } from 'react';
import SearchBar from '../Components/SearchBar';
import utils from '../utils.js';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
        this.hello = this.hello.bind(this);
    }
    componentDidMount() {
        fetch('https://hueco.ml/rentsee/api/profile', {
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
            <React.Fragment>
                <ul>
                    <a href='/'>Home</a>
                    <a href='/login'>Login</a>
                    <a href='/register'>Register</a>
                    <a href='/logout'>Logout</a>
                    <a href='/AddCar'>AddCar</a>
                </ul>
                <SearchBar />
                {this.hello()}
            </React.Fragment>
        );
    }
}

export default Search;