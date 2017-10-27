import React, {Component} from 'react';
import ProjectSelect from "../project-settings/project-select/ProjectSelect";

class Projects extends Component {

    render() {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <ProjectSelect projectSelected={(id) => this.props.projectSelected(id)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Projects;