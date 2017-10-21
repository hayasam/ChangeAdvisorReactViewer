import React, {Component} from 'react';
import axios from 'axios';
import './ProjectSelect.css';

const url = 'http://localhost:8080';

class ProjectSelect extends Component {
    constructor() {
        super();

        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        console.log("Getting list of projects");

        const promise = axios.get(`${url}/project`);
        promise.then(res => {
            const responseBody = res.data;
            this.setState({projects: responseBody});
        });
    }

    projectSelected(projectId) {
        this.props.projectSelected(projectId);
    }

    render() {
        return (
            <div >{
                this.state.projects.map((project, id) => (
                    <div key={project.id} className={"row project-card"} onClick={() => this.projectSelected(project.id)}>
                        <div className={"project-card-header clearfix"}>
                            <h4>
                                <a href={"#"}>
                                    {project.appName}
                                </a>
                            </h4>
                            <div className={"project-card-dates pull-right"}>
                                Last review import: xx-xx-xxxx
                            </div>
                            <div className={"project-card-dates pull-right"}>
                                Last code import: xx-xx-xxxx
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