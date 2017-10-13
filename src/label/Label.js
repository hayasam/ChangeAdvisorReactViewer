import React, {Component} from 'react';

class Label extends Component {

    render() {
        const token = this.props.token;
        const label = token.label;
        const reviewCount = token.reviews.length;
        const score = token.score;
        return (
            <p onClick={() => this.props.onClick(token)}><a>{label} ({reviewCount}): {score.toFixed(5)}</a></p>
        )
    }
}

export default Label;