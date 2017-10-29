import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CategoryTable from "../category-table/CategoryTable";

class ReviewTable extends Component {

    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    render() {
        let reviews = this.props.reviews || [];
        const categories = new Set(reviews.map(r => r.category));

        const columns = [
            {
                Header: 'Review Date',
                id: 'reviewDate',
                filterable: false,
                maxWidth: "150",
                accessor: review => new Date(review.reviewDate).toDateString()
            }, {
                Header: 'Review',
                accessor: 'reviewText'
            }, {
                Header: 'Category',
                id: 'category',
                maxWidth: "200",
                accessor: review => ReviewTable.capitalizeFirstLetter(review.category),
                filterMethod: (filter, row) => {
                    return filter.value === 'all' || filter.value === row._original.category;
                },
                Filter: ({filter, onChange}) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{width: "100%"}}
                        value={filter ? filter.value : "all"}
                    >
                        <option value="all">Show All</option>
                        {
                            Array.from(categories).map(cat => <option key={cat} value={cat}>{cat}</option>)
                        }
                    </select>
            }, {
                Header: 'Rating',
                accessor: 'numberOfStars',
                maxWidth: "100",
                className: "text-center",
                Footer: (
                    <span><strong>Avg:</strong>{" "}{CategoryTable.computeAvg(reviews)}</span>)
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

        return <ReactTable filterable
                           defaultFilterMethod={(filter, row, column) => {
                               const id = filter.pivotId || filter.id;
                               return row[id] !== undefined ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase()) : true
                           }}
                           data={reviews} columns={columns} defaultPageSize={20}/>
    }
}

export default ReviewTable;
