import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Register from './Register/Register';
import Home from './Home/Home';
import Login from './Login/Login';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <ul>
                    <a href='/'>Home</a>
                    <a href='/login'>Login</a>
                    <a href='/register'>Register</a>
                </ul>
                <Router>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </Router>
            </header>
        </div>
    );
}

export default App;
