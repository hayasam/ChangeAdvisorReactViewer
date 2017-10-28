import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';

const Header = (projectId) => {
    const id = projectId.projectId;
    return (
        <div className={"col-md-12"}>
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2 className={"title"}>ChangeAdvisor</h2>
            </div>
            <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
                <button className={"navbar-toggler"} type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className={"navbar-toggler-icon"}/>
                </button>

                <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
                    <ul className={"navbar-nav mr-auto"}>
                        <li className={"nav-item"}>
                            <Link className={"nav-link"} to='/'>Home</Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link className={"nav-link"} to={`/project/${id}`}>Project</Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link className={"nav-link"} to='/settings'>Settings</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;