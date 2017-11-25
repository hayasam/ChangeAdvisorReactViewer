import React, {Component} from 'react';
import ReviewTable from "../review-table/ReviewTable";
import _ from "lodash";
import CategoryReport from "./CategoryReport";
import Constants from "../Constants.js";

class CategoryTable extends Component {

    static computeAvg(reviews) {
        if (!reviews || !reviews.length) {
            return 0;
        }
        return _.round(_.mean(_.map(reviews, r => r.numberOfStars)), 2);
    }

    gotoClassesClicked(category) {
        const payload = {app: this.props.project.appName, category: category};
        const label = this.props.label;
        this.props.gotoClassesClicked({payload: payload, label: label});
    }

    render() {
        const label = this.props.label;
        if (!label || !label.reviews) {
            return (
                <div className={"card-title"}>
                    <h4>Select a label to view more info!</h4>
                </div>
            )

        }

        const reviews = label.reviews;
        const featureRequest = reviews.filter(r => r.category === Constants.FEATURE_REQUEST);
        const infoSeeking = reviews.filter(r => r.category === Constants.INFO_SEEKING);
        const infoGiving = reviews.filter(r => r.category === Constants.INFO_GIVING);
        const problemDiscover = reviews.filter(r => r.category === Constants.PROBLEM_DISCOVERY);
        const other = reviews.filter(r => r.category === Constants.OTHER);

        return (

            <div>
                {label && label.reviews &&
                <div className={"card-body card-deck"}>
                    <CategoryReport title={"All Categories"} reviews={label.reviews}/>
                    <CategoryReport title={"Feature Request"} category={Constants.FEATURE_REQUEST}
                                    reviews={featureRequest}
                                    onclick={(category) => this.gotoClassesClicked(category)}/>
                    <CategoryReport title={"Information Seek."} category={Constants.INFO_SEEKING}
                                    reviews={infoSeeking}
                                    onclick={(category) => this.gotoClassesClicked(category)}/>
                    <CategoryReport title={"Problem Discovery"} category={Constants.PROBLEM_DISCOVERY}
                                    reviews={problemDiscover}
                                    onclick={(category) => this.gotoClassesClicked(category)}/>
                    <CategoryReport title={"Information Giving"} category={Constants.INFO_GIVING}
                                    reviews={infoGiving}
                                    onclick={(category) => this.gotoClassesClicked(category)}/>
                    <CategoryReport title={"Other"} reviews={other} category={Constants.OTHER}
                                    onclick={(category) => this.gotoClassesClicked(category)}/>
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