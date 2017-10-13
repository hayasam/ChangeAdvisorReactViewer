import React, {Component} from 'react';
import ReviewTable from '../review-table/ReviewTable'
import Label from './Label'
import './Labels.css';

class Labels extends Component {

    constructor() {
        super();
        this.state = {
            selectedLabel: null
        };
    }

    selectedLabel(label) {
        this.setState({selectedLabel: label});
    }

    render() {
        if (!this.props.isLoading) {
            return this.showLabels();
        } else {
            return Labels.showLoading();
        }
    }

    showLabels() {
        const data = this.props.labels;
        return (data && data.length > 0 &&
            <div className={"row"}>
                <div className="labels col-md-3">
                    {
                        data.map((tokens, i) => (
                            <div key={tokens.label}>
                                <Label token={tokens} onClick={(token) => this.selectedLabel(token)}/>
                            </div>
                        ))
                    }
                </div>
                <div className="labels col-md-9">
                    <ReviewTable reviews={this.state.selectedLabel}/>
                </div>
            </div>
        );
    }

    static showLoading() {
        return <h2 className={"loading"}>Loading...</h2>
    }
}

export default Labels;