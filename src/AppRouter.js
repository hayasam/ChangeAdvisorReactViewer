import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import ProjectSettings from './project-settings/ProjectSettings'
import App from "./app/App";
import './AppRouter.css'
import Header from "./header/Header";
import LinkingResults from "./linking-results/LinkingResults";
import axios from 'axios';
import Projects from "./projects-overview/Projects";
import Constants from "./Constants";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

const emptyProject = {
    appName : '',
    googlePlayId : '',
    path : '',
    remoteUrl : '',
    cronSchedule : ''
};

class AppRouter extends Component {

    constructor() {
        super();

        this.state = {
            propsForLinkingResults: null,
            selectedProject: null,
            showAlert: false
        };

        this.gotoClassesClicked.bind(this);
        this.projectSelected.bind(this);
    }

    componentDidMount() {
        const isServerUpPromise = axios.get(`${Constants.SERVER_URL}/is-up`);
        isServerUpPromise.then(response => {
            this.setState({isServerUp: true});
        }).catch(error => {
            this.setState({isServerUp: false});
            console.log(error)
        });
    }

    projectSelected(projectId) {
        this.loadProject(projectId);
    }

    loadProject(projectId) {
        const loadProject = axios.get(`${Constants.SERVER_URL}/projects/${projectId}`);
        loadProject.then(response => {
            console.log(response.data);
            this.setState({isServerUp: true, selectedProject: response.data});
        }).catch(error => {
            this.setState({isServerUp: false});
            console.log(error)
        });
    }

    gotoClassesClicked(params) {
        const payload = params.payload;
        const label = params.label;

        const propsForLinkingResults = {params};
        this.setState({propsForLinkingResults: propsForLinkingResults});

        const promise = axios.post(`${Constants.SERVER_URL}/reviews/linking?label=${label.label}`, payload);
        promise.then(response => {
            const propsForLinkingResults = {results: response.data, params};
            this.setState({propsForLinkingResults: propsForLinkingResults});
        });
    }

    render() {
        const propsForLinkingResults = this.state.propsForLinkingResults;
        const project = this.state.selectedProject;
        const projectId = project ? project.id : '';

        return (
            <div className={"container-fluid"}>
                {!this.state.isServerUp &&
                <div className={"alert alert-danger"} role="alert">
                    There seems to be no connection to the server! Check the server and try re-loading this page.
                </div>
                }

                <div className={"row"}>
                    <Header projectId={projectId}/>
                </div>

                <br/>

                <div className={"row"}>
                    {this.state.isServerUp &&
                    <Switch>
                        <Route exact path='/'
                               render={() => <Projects
                                   projectSelected={(projectId) => this.projectSelected(projectId)}/>}/>
                        <Route path='/project/:id'
                               render={(match) => (
                                   <App match={match} project={project}
                                        gotoClassesClicked={(res) => this.gotoClassesClicked(res)}/>)}/>
                        <Route path='/settings' render={() => <ProjectSettings project={project}/>}/>
                        <Route path='/new' render={() => <ProjectSettings project={emptyProject}/>}/>
                        <Route path='/results'
                               render={() => (<LinkingResults params={propsForLinkingResults}/>)}/>
                    </Switch>
                    }
                </div>
            </div>
        )
    }
}

export default AppRouter;
