import React from 'react';
import {Component} from "react/lib/ReactBaseClasses";
import ProjectForm from "./project-form/ProjectForm";
import axios from 'axios';
import './ProjectSettings.css'
import FetchReviewsForm from "./FetchReviewsForm";
import Constants from "../Constants";

class ProjectSettings extends Component {

    constructor() {
        super();
        this.state = {
            project: null,
            showAlert: false,
            hasError: false
        };

        this.projectSelected = this.projectSelected.bind(this);
    }

    projectSelected(projectId) {
        this.setState({showAlert: false});
        const promise = axios.get(`${Constants.SERVER_URL}/projects/${projectId}`);
        promise.then(res => {
            const responseBody = res.data;
            responseBody.cronSchedule = responseBody.cronSchedule || '';
            this.setState({project: responseBody, hasError: false});
        });
    }

    handleFormSubmit(formData) {
        const promise = axios.post(`${Constants.SERVER_URL}/projects/`, formData);
        this.setState({showAlert: false, showError: false});

        promise.then(res => {
            console.log(res.data);
            if (res.status === 200) {
                this.setState({showAlert: true, project: res.data, hasError: false});
            }
        }).catch(error => {
            this.setState({hasError: true, showAlert: false, project: formData});
            console.log(error);
        });
    }

    render() {
        const project = this.state.project ? this.state.project : this.props.project;
        if (!project) {
            return <div>Select a project first!</div>
        }
        console.log(project);

        return (
            <div className={"container"}>
                <div className={"col-md-12"}>
                    <ProjectForm hasError={this.state.hasError} hasSuccess={this.state.showAlert}
                                 handleSubmit={(formData) => this.handleFormSubmit(formData)}
                                 value={project}/>

                </div>

                <br/>

                <div className={this.state.showAlert ? "col-md-12 animated fadeIn" : "hidden col-md-12"} role="alert">
                    <p className={"alert alert-success"}>Success!</p>
                </div>

                <div className={this.state.hasError ? "col-md-12 animated fadeIn" : "hidden col-md-12"} role="alert">
                    <p className={"alert alert-danger"}>Please check the form!</p>
                </div>

                <div className={"col-md-12"}>
                    <FetchReviewsForm projectId={project.id}/>
                </div>
            </div>
        )
    }
}

export default ProjectSettings
