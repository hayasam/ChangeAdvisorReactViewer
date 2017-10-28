import React from 'react';
import {Component} from "react/lib/ReactBaseClasses";
import ProjectForm from "./project-form/ProjectForm";
import axios from 'axios';
import './ProjectSettings.css'

const url = 'http://localhost:8080';

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
        const promise = axios.get(`${url}/project/${projectId}`);
        promise.then(res => {
            const responseBody = res.data;
            responseBody.cronSchedule = responseBody.cronSchedule || '';
            this.setState({project: responseBody, hasError: false});
        });
    }

    handleFormSubmit(formData) {
        console.log(formData);
        const promise = axios.post(`${url}/project/`, formData);
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
        const project = this.props.project;

        return (
            <div className={"container"}>
                <div className={"col-md-12"}>

                    {project &&
                    <ProjectForm hasError={this.state.hasError} hasSuccess={this.state.showAlert}
                                 handleSubmit={(formData) => this.handleFormSubmit(formData)}
                                 value={project}/>
                    }
                </div>

                <hr/>

                <div className={this.state.showAlert ? "col-md-12 fade in" : "hidden col-md-12"} role="alert">
                    <p className={"alert alert-success"}>Success!</p>
                </div>
            </div>
        )
    }
}

export default ProjectSettings