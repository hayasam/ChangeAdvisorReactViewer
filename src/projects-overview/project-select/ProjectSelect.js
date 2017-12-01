import React, {Component} from 'react';
import axios from 'axios';
import Constants from '../../Constants.js'
import {Link} from 'react-router-dom';
import './ProjectSelect.css';

class ProjectSelect extends Component {
    constructor() {
        super();

        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        const promise = axios.get(`${Constants.SERVER_URL}/projects`);
        promise.then(res => {
            const responseBody = res.data;
            this.setState({projects: responseBody});
        });
    }

    render() {
        return (
            <div className={"col-md-12"}>{
                this.state.projects.map((project, id) => (
                    <div key={project.id} className={"row project-card card-shadow"}
                         onClick={() => this.props.projectSelected(project.id)}>
                        <div className={"project-card-header clearfix"}>
                            <h4>
                                <Link to={`project/${project.id}`}>{project.appName}</Link>
                            </h4>
                            <div className={"project-card-dates pull-right"}>
                                Last review
                                import: {project.reviewsConfig ? new Date(project.reviewsConfig.lastReviewImport).toLocaleString('DE-CH') : 'N/A'}
                            </div>
                            <div className={"project-card-dates pull-right"}>
                                Last code
                                import: {project.sourceConfig ? new Date(project.sourceConfig.lastSourceImport).toLocaleString('DE-CH') : 'N/A'}
                            </div>
                        </div>
                        <div className={"project-card-body"}>
                        </div>
                    </div>
                ))
            }
            </div>
        );
    }
}

export default ProjectSelect;
