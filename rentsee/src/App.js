import React from 'react';
import './App.css';
import Register from './Register/Register';
import Home from './Home/Home';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <ul>
                    <a href='/'>Home</a>
                    <a href='/login'>Login</a>
                    <a href='/register'>Register</a>
                    <a href='/logout'>Logout</a>
                </ul>
                <Router>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/logout' component={Logout} />
                </Router>
            </header>
        </div>
    );
}

export default App;
