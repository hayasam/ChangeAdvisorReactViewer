import React, {Component} from "react"
import HorizontalStackedBar from 'component-horizontal-stacked-bar'

const data = [{name: 'A', value: 25},
    {name: 'B', value: 50},
    {name: 'C', value: 75},
    {name: 'D', value: 5},
    {name: 'E', value: 45}];

class Test extends Component {

    render() {
        // const generateLabel = (d, i) => { /* ... */
        // };
        // const generateColor = (d, i) => { /* ... */
        // };

        const generateLabel = (d, i) => {
            return d.name
        };
        return (
            <HorizontalStackedBar
                className={this.props.className}
                data={data}
                generateLabel={generateLabel}
                // generateFillColour={generateColor}
            />
        )
    }
}

export default Test;