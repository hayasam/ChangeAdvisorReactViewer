import React, {Component} from 'react';
import ProjectSelect from "./project-select/ProjectSelect";
import './Projects.css';
import {Link} from "react-router-dom";

class Projects extends Component {

    render() {
        return (
            <div className={"col-md-12"}>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <div className={"card card-shadow"} style={{width: "20rem"}}>
                            <div className={"card-body"}>
                                <Link className={"card-link"} to='/new'>New Project</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-6"}>
                        <ProjectSelect projectSelected={(id) => this.props.projectSelected(id)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Projects;
