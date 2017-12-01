import React, {Component} from 'react';
import axios from 'axios';
import Constants from "../../Constants.js";

class FetchReviewsForm extends Component {

    constructor() {
        super();

        this.state = {limit: 5000, jobStatusId: -1, timeInterval: 1};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchReviews = this.fetchReviews.bind(this);
    }

    handleChange(event) {
        const target = event.target;

        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    fetchReviews(event) {
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
                            <label className={"control-label"} htmlFor={"limit"}>How many reviews should I
                                retrieve?
                                (max)</label>
                            <input className={"form-control"} id={"limit"} name={"limit"} onChange={this.handleChange}
                                   value={this.state.limit} type={"numeric"}/>
                        </div>

                        <div className={"form-group"}>
                            <label className={"control-label"} htmlFor={"timeInterval"}>Time interval for review
                                analysis</label>
                            <select className={"form-control"} name={"timeInterval"} value={this.state.timeInterval}
                                    onChange={this.handleChange}>
                                <option>Open this select menu</option>
                                <option value="1">Last 7 days</option>
                                <option value="2">Last 14 days</option>
                                <option value="3">Last 30 days</option>
                                <option value="4">Last 3 months</option>
                            </select>
                        </div>

                        <button className={"btn btn-primary"} type={"submit"}>Save</button>
                        <button className={"btn btn-primary"} onClick={this.fetchReviews}>Fetch Reviews</button>
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
