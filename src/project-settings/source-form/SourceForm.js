import React, {Component} from 'react';
import axios from 'axios';
import Constants from "../../Constants.js";

class SourceForm extends Component {

    constructor() {
        super();

        this.state = {
            jobStatusId: -1
        };
        this.fetchCode = this.fetchCode.bind(this);
    }

    fetchCode(event) {
        event.preventDefault();
        const promise = axios.post(`${Constants.SERVER_URL}/source/${this.props.projectId}`);
        promise.then(response => {
            this.setState({jobStatusId: response.data})
        });
    }

    render() {
        return (
            <div className={"card card-shadow"}>
                <div className={"card-body"}>
                    <form>

                        <legend>Source code settings</legend>

                        <button className={"btn btn-primary"} onClick={this.fetchCode}>Fetch source code</button>
                    </form>

                    <br/>

                    <div className={this.state.jobStatusId < 0 ? "col-md-12 fade in" : "col-md-12"} role="alert">
                        <p className={"alert alert-success"}>For status update goto <a
                            href={`${Constants.SERVER_URL}/status/${this.state.jobStatusId}`}>Status update</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SourceForm;
