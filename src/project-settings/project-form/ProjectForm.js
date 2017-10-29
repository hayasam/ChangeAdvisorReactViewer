import React, {Component} from 'react';
import "./ProjectForm.css";

class ProjectForm extends Component {

    constructor(props) {
        super(props);

        this.state = this.props.value;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
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
        this.props.handleSubmit(this.state);
    }

    render() {
        console.log(this.props.hasError);
        return (
            <div className={"card card-shadow"}>
                <div className={"card-body"}>
                    <form onSubmit={this.handleSubmit}
                          className={`form ${this.props.hasError ? 'has-error' : 'has-success'}`}>
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
                        </div>

                        <button className={"btn btn-primary"} type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProjectForm;
