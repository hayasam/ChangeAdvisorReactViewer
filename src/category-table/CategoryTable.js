import React, {Component} from 'react';
import ReviewTable from "../review-table/ReviewTable";
import _ from "lodash";
import CategoryReport from "./CategoryReport";

class CategoryTable extends Component {

    constructor() {
        super();
    }

    static computeAvg(reviews) {
        if (!reviews || !reviews.length) {
            return 0;
        }
        return _.round(_.mean(_.map(reviews, r => r.numberOfStars)), 2);
    }

    render() {
        const label = this.props.label;
        console.log(label);

        if (!label || !label.reviews) {
            return <div/>;
        }

        const reviews = label.reviews;

        const featureRequest = reviews.filter(r => r.category === 'FEATURE REQUEST');
        const infoSeeking = reviews.filter(r => r.category === 'INFORMATION SEEKING');
        const infoGiving = reviews.filter(r => r.category === 'INFORMATION GIVING');
        const problemDiscover = reviews.filter(r => r.category === 'PROBLEM DISCOVERY');
        const other = reviews.filter(r => r.category === 'OTHER');

        return (
            <div>
                {label && label.reviews &&
                <div className={"card-body card-deck"}>
                    <CategoryReport title={"All Categories"} reviews={label.reviews}/>
                    <CategoryReport title={"Feature Request"} reviews={featureRequest}/>
                    <CategoryReport title={"Information Seeking"} reviews={infoSeeking}/>
                    <CategoryReport title={"Problem Discovery"} reviews={problemDiscover}/>
                    <CategoryReport title={"Information Giving"} reviews={infoGiving}/>
                    <CategoryReport title={"Other"} reviews={other}/>
                </div>
                }
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        {label && label.reviews &&
                        <ReviewTable reviews={label.reviews}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryTable;