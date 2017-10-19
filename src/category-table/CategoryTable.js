import React, {Component} from 'react';

class CategoryTable extends Component {

    constructor() {
        super();
    }

    render() {
        const label = this.props.label;
        console.log(label);

        return (
            <div className={"row"}>
                <div className={"col-md-2 text-center"}>
                    <h3>Nothing</h3>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Avg rating: 10%</p>
                            <p>N ratings</p>
                        </div>
                    </div>
                </div>
                <div className={"col-md-2 text-center"}>
                    <h3>Bug</h3>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Avg rating: 10%</p>
                            <p>N ratings</p>
                        </div>
                    </div>
                </div>
                <div className={"col-md-2 text-center"}>
                    <h3>Feature Request</h3>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Avg rating: 10%</p>
                            <p>N ratings</p>
                        </div>
                    </div>
                </div>
                <div className={"col-md-2 text-center"}>
                    <h3>Other</h3>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Avg rating: 10%</p>
                            <p>N ratings</p>
                        </div>
                    </div>
                </div>
                <div className={"col-md-2 text-center"}>
                    <h3>Information Discovery</h3>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Avg rating: 10%</p>
                            <p>N ratings</p>
                        </div>
                    </div>
                </div>
                <div className={"col-md-2 text-center"}>
                    <h3>Information Giving</h3>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <p>Avg rating: 10%</p>
                            <p>N ratings</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryTable;