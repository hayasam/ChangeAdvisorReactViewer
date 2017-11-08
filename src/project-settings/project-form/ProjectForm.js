import React, {Component} from 'react';
import axios from 'axios';
import "./ProjectForm.css";
import Constants from '../../Constants.js';

class ProjectForm extends Component {

    constructor(props) {
        super(props);

        this.state = this.props.value;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state) {
            this.state = nextProps.value;
        }
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
        this.handleFormSubmit(this.state);
    }

    handleFormSubmit(formData) {
        const promise = axios.post(`${Constants.SERVER_URL}/projects/`, formData);
        this.setState({showAlert: false, showError: false});

        promise.then(res => {
            console.log(res.data);
            if (res.status === 200) {
                const project = res.data;
                this.setState({
                    showAlert: true,
                    hasError: false,
                    appName: project.appName,
                    googlePlayId: project.googlePlayId,
                    remoteUrl: project.remoteUrl,
                    cronSchedule: project.cronSchedule,
                    reviewsConfig: project.reviewsConfig
                });
            }
        }).catch(error => {
            this.setState({hasError: true, showAlert: false, project: formData});
            console.log(error);
        });
    }

    render() {
        console.log(this.state.project);
        return (
            <div className={"card card-shadow"}>
                <div className={"card-body"}>
                    <form onSubmit={this.handleSubmit}
                          className={`form ${this.props.hasError ? 'has-error' : 'has-success'}`}>

                        <legend>App settings</legend>

                        <div className={"form-group"}>
                            <label htmlFor={"appName"} className={"control-label"}>
                                Application Name
                            </label>
                            <input name={"appName"} className={"form-control"} value={this.state.appName}
                                   onChange={this.handleChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor={"googlePlayId"} className={"control-label"}>
                                Google Play ID
                            </label>
                            <input name={"googlePlayId"} className={"form-control"} value={this.state.googlePlayId}
                                   onChange={this.handleChange}/>
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor={"remoteUrl"} className={"control-label"}>
                                Path to repository
                            </label>
                            <input name={"remoteUrl"} className={"form-control"} value={this.state.remoteUrl}
                                   onChange={this.handleChange}/>
                        </div>

                        <div className={`form-group ${this.props.hasError ? 'has-error' : ''}`}>
                            <label htmlFor={"cronSchedule"} className={"control-label"}>
                                Cron Expression (TODO: Use some form of time picker)
                            </label>
                            <input name={"cronSchedule"} className={"form-control"} value={this.state.cronSchedule}
                                   onChange={this.handleChange}/>
                            <small className={"form-text text-muted"}>Next review import scheduled
                                for: {this.state.reviewsConfig ? new Date(this.state.reviewsConfig.nextReviewImport).toLocaleString('DE-CH') : 'N/A'}</small>
                        </div>

                        <button className={"btn btn-primary"} type="submit">Save</button>
                    </form>

                    <br/>

                    <div className={this.state.showAlert ? "col-md-12 animated fadeIn" : "hidden col-md-12"}
                         role="alert">
                        <p className={"alert alert-success"}>Success!</p>
                    </div>

                    <div className={this.state.hasError ? "col-md-12 animated fadeIn" : "hidden col-md-12"}
                         role="alert">
                        <p className={"alert alert-danger"}>Please check the form!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectForm;
