import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import _ from "lodash";

class ReviewTable extends Component {

    static capitalizeFirstLetter(string) {
        console.log(string);
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    render() {
        let reviews = this.props.reviews || [];
        if (reviews) {
            reviews = reviews.reviews;
        }
        console.log(reviews);

        const columns = [
            {
                Header: 'Review Date',
                id: 'reviewDate',
                accessor: review => new Date(review.reviewDate).toDateString()
            }, {
                Header: 'Review',
                accessor: 'reviewText'
            }, {
                Header: 'Category',
                id: 'category',
                accessor: review => ReviewTable.capitalizeFirstLetter(review.category)
            }, {
                Header: 'Rating',
                accessor: 'numberOfStars',
                Footer: (
                    <span><strong>Average:</strong>{" "}{_.round(_.mean(_.map(reviews, r => r.numberOfStars)), 2)}</span>)
            }
        ];

        if (!reviews) {
            return (
                <table className={"table"}>
                    <thead>
                    <tr>
                        <th>Review Date</th>
                        <th>Review</th>
                        <th># Stars</th>
                    </tr>
                    </thead>
                </table>
            )
        }

        return <ReactTable data={reviews} columns={columns} defaultPageSize={10}/>

        // return (
        //     <table className={"table table-striped table-bordered"}>
        //         <thead>
        //         <tr>
        //             <th>#</th>
        //             <th>Review</th>
        //             <th># Stars</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {reviews.length > 0 &&
        //         reviews.map((review, i) => (
        //             <tr key={review.id}>
        //                 <td>
        //                     {new Date(review.reviewDate).toDateString()}
        //                 </td>
        //                 <td>
        //                     {review.reviewText}
        //                 </td>
        //                 <td>
        //                     {review.numberOfStars}
        //                 </td>
        //             </tr>
        //         ))
        //         }
        //         </tbody>
        //     </table>
        // )
    }
}

export default ReviewTable;