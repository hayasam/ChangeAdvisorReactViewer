import React, {Component} from "react"
import './Manually.css'

const data = [{name: 'A', value: 25},
    {name: 'B', value: 50},
    {name: 'C', value: 75},
    {name: 'D', value: 5},
    {name: 'E', value: 45}];

class Manually extends Component {

    static percentage(value, total) {
        return (value / total * 100).toFixed(2);
    }

    static rainbow(numOfSteps, step) {
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
        const total = data.reduce((sum, value) => sum + value.value, 0);
        console.log(total);

        data.forEach(d => console.log(Manually.percentage(d.value, total)));
        return (
            <div className={"stacked-bar-graph"}>
                {
                    data.map((d, i) => (
                        <span id={i} className={`bar-${i}`} style={{width: `${Manually.percentage(d.value, total)}%`}}>
                            {Manually.percentage(d.value, total)}
        </span>
                    ))
                }
            </div>

            // <div className={"stacked-bar-graph"}>
            //     <span style={{width: `20%`}} className="bar-1">20%</span>
            //     <span style={{width: "15%"}} className="bar-2">15%</span>
            //     <span style={{width: "30%"}} className="bar-3">30%</span>
            // </div>
        );
        {/*<div className={"stacked-bar-graph"}>*/
        }
        {/*{*/
        }
        {/*data.map((d, i) => (*/
        }
        {/*<span id={i} className={`bar-${i}`} width={`${Manually.percentage(d.value, total)}%`}>*/
        }
        {/*{Manually.percentage(d.value, total)}*/
        }
        {/*</span>*/
        }
        {/*))*/
        }
        {/*}*/
        }
        {/*</div>*/
        }
    }
}

export default Manually;