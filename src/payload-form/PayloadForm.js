import React, {Component} from 'react';
import "./PayloadForm.css";

class PayloadForm extends Component {

    constructor(props) {
        super(props);

        this.state = this.props.value;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        return (
            <div className={"col-md-12"}>
                <form onSubmit={this.handleSubmit} className={"form-inline"}>
                    <div className={"form-group"}>
                        <label htmlFor={"limit"} className={"control-label"}>
                            How many labels?
                        </label>
                        <input name={"limit"} className={"form-control labels-form"} type="number" min={1}
                               value={this.state.limit}
                               onChange={this.handleChange}/>
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor={"ngrams"} className={"control-label"}>
                            Ngram size?
                        </label>
                        <input name={"ngrams"} className={"form-control labels-form"} type="number" min={1} max={5}
                               value={this.state.ngrams} onChange={this.handleChange}/>
                    </div>

                    <button className={"btn btn-primary"} type="submit">Save</button>
                </form>
            </div>
        );
    }
}

export default PayloadForm;