import React, {Component} from "react"
import PieChart from "react-svg-piechart"
import './PieChart.css';

export default class DistributionPieChart extends Component {
    constructor() {
        super();
        this.state = {
            expandedSector: null
        };

        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this);
    }

    handleMouseEnterOnSector(sector) {
        this.setState({expandedSector: sector})
    }

    rainbow(numOfSteps, step) {
        // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
        // Adam Cole, 2011-Sept-14
        // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
        let r, g, b;
        let h = step / numOfSteps;
        let i = ~~(h * 6);
        let f = h * 6 - i;
        let q = 1 - f;
        switch (i % 6) {
            case 0:
                r = 1;
                g = f;
                b = 0;
                break;
            case 1:
                r = q;
                g = 1;
                b = 0;
                break;
            case 2:
                r = 0;
                g = 1;
                b = f;
                break;
            case 3:
                r = 0;
                g = q;
                b = 1;
                break;
            case 4:
                r = f;
                g = 0;
                b = 1;
                break;
            case 5:
                r = 1;
                g = 0;
                b = q;
                break;
            default:
                break;
        }
        var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) + ("00" + (~~(g * 255)).toString(16)).slice(-2) + ("00" + (~~(b * 255)).toString(16)).slice(-2);
        return (c);
    }

    render() {
        const {expandedSector} = this.state;
        const data = this.props.distribution.map((element, i) => ({
            label: element.label,
            value: element.value,
            // color: this.rainbow(this.props.distribution.length, i)
        }));

        return (
            <div
                className={"row"}
                // onClick={() => this.props.onClick(expandedSector)}
            >
                <PieChart className={"col-md-6 pie-chart"}
                          data={data}
                          expandedSector={expandedSector}
                          onSectorHover={this.handleMouseEnterOnSector}
                          sectorStrokeWidth={2}
                          expandOnHover
                          shrinkOnTouchEnd

                />
                <div className={"col-md-6 pie-chart"}>
                    {
                        data.map((element, i) => (
                            <div key={i}>
                                {/*<span style={{background: element.color}}>o</span>*/}
                                <span style={{fontWeight: this.state.expandedSector === i ? "bold" : null}}>
                                {element.label} : {element.value}
                            </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}