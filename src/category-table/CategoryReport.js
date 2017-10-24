import React, {Component} from 'react';
import _ from "lodash";
import {Link} from "react-router-dom";

class CategoryReport extends Component {

    static computeAvg(reviews) {
        if (!reviews || !reviews.length) {
            return 0;
        }
        return _.round(_.mean(_.map(reviews, r => r.numberOfStars)), 2);
    }

    render() {
        const title = this.props.title;
        const reviews = this.props.reviews;
        const category = this.props.category;

        return (
            <div className={"text-center card border-info mb-3"}>
                <div className={"card-header"}>{title}</div>
                <div className={"card-body text-info"}>
                    <h4 className={"card-title"}>Avg rating: {CategoryReport.computeAvg(reviews)}</h4>
                    <p className={"card-text"}>{reviews.length} reviews</p>
                </div>
                {this.props.onclick &&
                <div className={"card-footer"}>
                    <small className={"text-muted"}>
                        <Link to='/results' onClick={() => this.props.onclick(category)}>GOTO Classes</Link>
                        {/*<a href={"#"} onClick={() => this.props.onclick(category)}>GOTO*/}
                            {/*Classes</a>*/}
                    </small>
                </div>
                }
            </div>
        )
    }
}

export default CategoryReport;