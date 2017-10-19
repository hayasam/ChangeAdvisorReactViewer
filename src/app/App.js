import React, {Component} from 'react';
import './App.css';
import DistributionPieChart from "../pie-chart/PieChart";
import Labels from "../label/Labels";
import axios from 'axios';
import PayloadForm from "../payload-form/PayloadForm";
import CategoryTable from "../category-table/CategoryTable";

//const url = 'http://192.168.0.39:8080';
const url = 'http://localhost:8080';
const appName = "com.frostwire.android";

class App extends Component {

    constructor() {
        super();

        this.state = {
            selectedCategory: null,
            data: [],
            labels: [],
            isLoading: false,
            formData: {limit: 10, ngrams: 1},
            numberOfReviewForSelectedCategory: 1000,
            responseTime: 1,
            totalReviews: 1,
            selectedLabel: null
        };
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.setState({appName: appName});
        const payload = {app: appName};
        console.log("Sending post request with data: " + JSON.stringify(payload));

        const promise = axios.post(`${url}/reviews/distribution`, payload);
        promise.then(res => {
            const responseBody = res.data;
            const distribution = responseBody.distribution
                .map(obj => ({
                    label: obj.category,
                    value: obj.reviewSize
                }));

            if (distribution.length > 0) {
                this.setState({
                    selectedCategory: distribution[0],
                    data: distribution,
                    totalReviews: responseBody.totalReviews
                });
                this.categoryChosen(0);
            }
        });
    }

    handleFormSubmit(formData) {
        this.setState({formData: formData}, function () {
            if (this.state.selectedCategory) {
                this.loadTopReviews();
            }
        });
    }

    render() {
        return (
            <div className={"col-md-12"}>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <h3>{this.state.appName} - Reviews.</h3>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-md-12 payload-form"}>
                        <PayloadForm value={this.state.formData}
                                     handleSubmit={(formData) => this.handleFormSubmit(formData)}/>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-md-3 card"}>
                        <DistributionPieChart distribution={this.state.data} viewBoxWidth={50}
                                              onClick={(sector) => this.categoryChosen(sector)}/>
                        <hr/>
                        <h4>Total Reviews: {this.state.totalReviews}</h4>

                        {this.state.selectedCategory &&
                        <h3>{this.state.selectedCategory.label}</h3>
                        }
                        {this.state.selectedCategory &&
                        <p className={"help-block"}>{this.state.numberOfReviewForSelectedCategory} Reviews
                            ({this.state.responseTime}
                            seconds)</p>
                        }

                        <Labels isLoading={this.state.isLoading} labels={this.state.labels}
                                onClick={(label) => this.selectedLabel(label)}/>
                    </div>

                    <div className={"col-md-9 card"}>
                        {this.state.selectedLabel &&
                        <h3>Reviews for Label: {this.state.selectedLabel.label}</h3>
                        }
                        <CategoryTable label={this.state.selectedLabel}/>
                    </div>
                </div>
            </div>
        );
    }

    selectedLabel(label) {
        console.log(label);
        this.setState({selectedLabel: label});
    }

    categoryChosen(tmp) {
        console.log(tmp);
        if (tmp !== undefined) {
            this.setState({
                selectedCategory: this.state.data[tmp],
                isLoading: true
            }, function () {
                this.loadTopReviews();
            });
        }
    }

    loadTopReviews() {
        if (this.state.selectedCategory) {
            const payload = {
                app: "com.frostwire.android",
                limit: this.state.formData.limit,
                category: this.state.selectedCategory.label,
                ngrams: this.state.formData.ngrams
            };

            this.setState({
                isLoading: true
            }, function () {
                const start = Date.now();

                const promise = axios.post(`${url}/reviews/labels`, payload);
                promise.then(res => {
                    //const posts = res.data.data.children.map(obj => obj.data);
                    const labels = res.data;
                    this.setState({
                        selectedCategory: this.state.selectedCategory,
                        data: this.state.data,
                        labels: labels,
                        isLoading: false
                    });
                    const end = Date.now();
                    const elapsed = (end - start) / 1000.0;

                    console.log(this.state.selectedCategory);
                    console.log(this.state.labels);
                    const numberOfReviewForSelectedCategory = this.state.labels.reduce((sum, value) => sum + value.reviewCount, 0);
                    this.setState({
                        responseTime: elapsed,
                        numberOfReviewForSelectedCategory: numberOfReviewForSelectedCategory
                    });
                });
            });
        }
    }
}

export default App;
