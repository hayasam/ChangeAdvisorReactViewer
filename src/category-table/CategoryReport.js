import React, {Component} from 'react';
import _ from "lodash";

class CategoryTable extends Component {

    static computeAvg(reviews) {
        if (!reviews || !reviews.length) {
            return 0;
        }
        return _.round(_.mean(_.map(reviews, r => r.numberOfStars)), 2);
    }

    render() {
        const title = this.props.title;
        const reviews = this.props.reviews;

        return (
            <div className={"text-center card border-info mb-3"}>
                <div className={"card-header"}>{title}</div>
                <div className={"card-body text-info"}>
                    <h4 className={"card-title"}>Avg rating: {CategoryTable.computeAvg(reviews)}</h4>
                    <p className={"card-text"}>{reviews.length} reviews</p>
                </div>
                <div className={"card-footer"}>
                    <small className={"text-muted"}><a href={"#"}>GOTO Classes</a></small>
                </div>
            </div>
        )
    }
}

export default CategoryTable;