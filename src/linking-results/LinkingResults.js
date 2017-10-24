import React, {Component} from 'react';
import './LinkingResults.css';

class LinkingResults extends Component {

    componentDidMount() {
    }

    render() {
        const params = this.props.params;
        const results = params ? params.results || [] : [];
        let reviews = [];
        if (results.length > 0) {
            reviews = results[0].reviews;
        }

        const label = params ? params.params.label : "Label 1";
        const category = params ? params.params.payload.category : "BUG";

        return (
            <div className={"col-md-12"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <h3>Label: {label.label} | Ardoc Category: {category}</h3>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <div className={"card reviews-results"}>
                            <ul>
                                {
                                    reviews.map((review, i) => (
                                        <li key={i}>{review}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={"col-md-9"}>
                        <div className={"card"}>
                            <ul>
                                {
                                    results.map((r, i) => (
                                            <li key={i}>
                                                <p>
                                                    Component Name: <strong>{r.codeComponentName}</strong>
                                                </p>
                                                <p>
                                                    Similarity: {r.similarity}
                                                </p>
                                                <p>
                                                    Code Component Bag: {r.codeComponentBag.join(" ")}
                                                </p>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LinkingResults;