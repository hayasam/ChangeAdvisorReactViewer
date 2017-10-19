import React, {Component} from 'react';
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
        this.props.onClick(label);
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
                <div className={"col-md-12"}>
                    <h5>Top {data.length} labels</h5>
                </div>

                <div className="labels col-md-12">
                    {
                        data.map((tokens, i) => (
                            <Label key={tokens.label} token={tokens}
                                   onClick={(token) => this.selectedLabel(token)}/>
                        ))
                    }
                </div>
                {/*<div className={"col-md-9"}>*/}
                {/*<Manually/>*/}
                {/*</div>*/}
                {/*<div className={"col-md-9"}>*/}
                {/*/!*<HighCharts/>*!/*/}
                {/*/!*<Manually/>*!/*/}
                {/*/!*<HorizontalStackedBarChart/>*!/*/}
                {/*</div>*/}
                {/*<div className="labels col-md-9">*/}
                {/*<ReviewTable reviews={this.state.selectedLabel}/>*/}
                {/*</div>*/}
            </div>
        );
    }

    static showLoading() {
        return <h2 className={"loading"}>Loading...</h2>
    }
}

export default Labels;