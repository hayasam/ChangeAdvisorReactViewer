import React, {Component} from 'react';
import axios from 'axios';
import Constants from "../../Constants";

class FetchReviewsForm extends Component {

    constructor() {
        super();

        this.state = {limit: 5000, jobStatusId: -1};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({limit: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const payload = {limit: this.state.limit, id: this.props.projectId};
        const promise = axios.post(`${Constants.SERVER_URL}/reviews`, payload);
        promise.then(response => {
            this.setState({jobStatusId: response.data})
        });
    }

    render() {
        return (
            <div className={"card card-shadow"}>
                <div className={"card-body"}>
                    <form onSubmit={this.handleSubmit}>

                        <legend>Review settings</legend>

                        <div className={"form-group"}>
                            <label className={"control-label"} htmlFor={"limit-reviews"}>How many reviews should I
                                retrieve?
                                (max)</label>
                            <input className={"form-control"} id={"limit-reviews"} onChange={this.handleChange}
                                   value={this.state.limit} type={"numeric"}/>
                        </div>
                        <button className={"btn btn-primary"} type="submit">Fetch Reviews</button>
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

export default FetchReviewsForm;
