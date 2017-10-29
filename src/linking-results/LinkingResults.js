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
                        <div className={"card card-shadow reviews-results"}>
                            <div className={"card-body"}>
                                <ul>
                                    {
                                        reviews.map((review, i) => (
                                            <li key={i}>{review}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={"col-md-9"}>
                        <div className={"card card-shadow"}>
                            <div className={"card-body"}>
                                <table className={"table table-hover"}>
                                    <thead>
                                    <tr>
                                        <th scope={"col"}>Similarity</th>
                                        <th scope={"col"}>Component Name</th>
                                        <th scope={"col"}>Code Component Bag</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        results.map((r, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        {r.similarity.toFixed(6)}
                                                    </td>
                                                    <td>
                                                        <strong>{r.codeComponentName}</strong>
                                                    </td>
                                                    <td>
                                                        {r.codeComponentBag.join(" ")}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LinkingResults;
