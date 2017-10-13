import React, {Component} from 'react';
import './App.css';
import DistributionPieChart from "../pie-chart/PieChart";
import Labels from "../label/Labels";
import axios from 'axios';
import PayloadForm from "../payload-form/PayloadForm";

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
            responseTime: 1
        };
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
            this.setState({selectedCategory: null, data: distribution});
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
            <div>
                <div className={"container"}>
                    <div className={"row"}>
                        <h3>{this.state.appName} - Reviews.</h3>
                    </div>

                    <div className={"row"}>
                        <div className={"col-md-12 payload-form"}>
                            <PayloadForm value={this.state.formData}
                                         handleSubmit={(formData) => this.handleFormSubmit(formData)}/>
                        </div>
                    </div>

                    <div className={"row"}>
                        <DistributionPieChart distribution={this.state.data} viewBoxWidth={50}
                                              onClick={(sector) => this.categoryChosen(sector)}/>
                    </div>

                    <div className={"row"}>
                        {this.state.selectedCategory &&
                        <h3>{this.state.selectedCategory.label}</h3>
                        }
                        {this.state.selectedCategory &&
                        <p className={"help-block"}>{this.state.numberOfReviewForSelectedCategory} Reviews
                            ({this.state.responseTime}
                            seconds)</p>
                        }
                    </div>
                    <Labels isLoading={this.state.isLoading} labels={this.state.labels}/>
                </div>

            </div>
        );
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
