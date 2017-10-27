import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import ProjectSettings from './project-settings/ProjectSettings'
import App from "./app/App";
import './AppRouter.css'
import Header from "./header/Header";
import LinkingResults from "./linking-results/LinkingResults";
import axios from 'axios';

const url = 'http://localhost:8080';
const appName = "com.frostwire.android";
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class AppRouter extends Component {

    constructor() {
        super();

        this.state = {
            propsForLinkingResults: null
        };

        this.gotoClassesClicked.bind(this);
    }

    gotoClassesClicked(params) {
        const payload = params.payload;
        const label = params.label;

        const propsForLinkingResults = {params};
        this.setState({propsForLinkingResults: propsForLinkingResults});

        const promise = axios.post(`${url}/reviews/linking?label=${label.label}`, payload);
        promise.then(response => {
            const propsForLinkingResults = {results: response.data, params};
            this.setState({propsForLinkingResults: propsForLinkingResults});
        });
    }

    render() {
        const propsForLinkingResults = this.state.propsForLinkingResults;
        return (
            <div className={"container-fluid"}>
                <Header/>
                <Switch>
                    <Route exact path='/'
                           render={() => (<App gotoClassesClicked={(res) => this.gotoClassesClicked(res)}/>)}/>
                    <Route path='/settings' component={ProjectSettings}/>
                    <Route path='/results'
                           render={() => (<LinkingResults params={propsForLinkingResults}/>)}/>
                </Switch>
            </div>
        )
    }
}

export default AppRouter;
