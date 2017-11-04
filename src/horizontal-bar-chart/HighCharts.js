import React, {Component} from "react"
import ReactHighcharts from 'react-highcharts';

class HighCharts extends Component {

    render() {
        const config = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'N Reviews for Label 1'
            },
            xAxis: {
                categories: ['Categories']
            },
            yAxis: {
                min: 0,
                max: 10,
                title: {
                    text: 'Total review distribution'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'John',
                data: [5]
            }, {
                name: 'Jane',
                data: [2]
            }, {
                name: 'Joe',
                data: [3]
            }],
            height: '50px'
        };

        return (
            <div id={"asdfsdfadsfasfasdf-bubu"}>
                <ReactHighcharts config={config}/>
            </div>
        )
    }
}

export default HighCharts;