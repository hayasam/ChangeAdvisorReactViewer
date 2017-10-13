import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';

const Header = () => (
    <div>
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2 className={"title"}>ChangeAdvisor</h2>
        </div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/settings'>Settings</Link></li>
                </ul>
            </div>
        </nav>
    </div>
);

export default Header;