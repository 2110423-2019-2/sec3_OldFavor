import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        localStorage.clear();
        setTimeout(() => {
            this.props.history.push('/');
        }, 1000);
    }
    render() {
        return <div>Loging out</div>;
    }
}

export default withRouter(Logout);
