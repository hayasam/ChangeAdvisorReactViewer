import React, {Component} from 'react';
import ProjectSelect from "../project-settings/project-select/ProjectSelect";
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
                                <h4 className={"card-title"}>Card title</h4>
                                <h6 className={"card-subtitle mb-2 text-muted"}>Card subtitle</h6>
                                <p className={"card-text"}>Some quick example text to build on the card title and make
                                    up
                                    the bulk of the card's content.</p>
                                <Link className={"card-link"} to='/new'>Add new Project</Link>
                                {/*<a href="#" className={"card-link"}>Another link</a>*/}
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
