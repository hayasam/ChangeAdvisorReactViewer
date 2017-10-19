import React, {Component} from 'react';

class Label extends Component {

    render() {
        const token = this.props.token;
        const label = token.label;
        const reviewCount = token.reviews.length;
        const score = token.score;
        return (
            <button onClick={() => this.props.onClick(token)} className={"btn btn-link"}>{label}
                ({reviewCount}): {score.toFixed(5)}</button>
        )
    }
}

export default Label;