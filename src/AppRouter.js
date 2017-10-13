import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ProjectSettings from './project-settings/ProjectSettings'
import App from "./app/App";
import Header from "./header/Header";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const AppRouter = () => (
    <div>
        <Header/>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/settings' component={ProjectSettings}/>
        </Switch>
    </div>
);

export default AppRouter;
