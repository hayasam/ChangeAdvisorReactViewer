import React from 'react';
import {Component} from "react/lib/ReactBaseClasses";
import ProjectForm from "./project-form/ProjectForm";
import FetchReviewsForm from "./reviews-form/FetchReviewsForm";
import './ProjectSettings.css'
import SourceForm from "./source-form/SourceForm";

class ProjectSettings extends Component {

    constructor() {
        super();
        this.state = {
            project: null,
            showAlert: false,
            hasError: false
        };
    }

    render() {
        const project = this.state.project ? this.state.project : this.props.project;
        if (!project) {
            return <div>Select a project first!</div>
        }

        return (
            <div className={"container"}>
                <div className={"col-md-12"}>
                    <ProjectForm hasError={this.state.hasError} hasSuccess={this.state.showAlert} value={project}/>

                </div>

                <br/>

                <div className={this.state.showAlert ? "col-md-12 animated fadeIn" : "hidden col-md-12"}
                     role="alert">
                    <p className={"alert alert-success"}>Success!</p>
                </div>

                <div className={this.state.hasError ? "col-md-12 animated fadeIn" : "hidden col-md-12"}
                     role="alert">
                    <p className={"alert alert-danger"}>Please check the form!</p>
                </div>

                <br/>

                <div className={"col-md-12"}>
                    <FetchReviewsForm projectId={project.id}/>
                </div>

                <br/>

                <div className={"col-md-12"}>
                    <SourceForm projectId={project.id}/>
                </div>
            </div>
        )
    }
}

export default ProjectSettings
