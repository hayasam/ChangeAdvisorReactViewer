import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock';
import {
    AreaSplineSeries,
    Chart,
    HighchartsStockChart,
    Legend,
    Navigator,
    RangeSelector,
    SplineSeries,
    Title,
    Tooltip,
    withHighcharts,
    XAxis,
    YAxis
} from 'react-jsx-highstock';

class TimeSeries extends Component {

    render() {
        const reviewCount = this.props.reviewCounts;
        const avgRatings = this.props.averages;

        return (
            <div>
                <HighchartsStockChart>
                    <Chart zoomType="x"/>

                    <Title>Reviews vs Avg.Ratings</Title>

                    <Legend/>

                    <XAxis>
                        <XAxis.Title>Time</XAxis.Title>
                    </XAxis>

                    <YAxis id="reviews">
                        <YAxis.Title>Number of reviews</YAxis.Title>
                        <SplineSeries id="reviewCount" name="Reviews by date" data={reviewCount}/>
                    </YAxis>

                    <XAxis>
                        <XAxis.Title>Time</XAxis.Title>
                    </XAxis>

                    <YAxis id="ratings" opposite>
                        <YAxis.Title>Average rating</YAxis.Title>
                        <SplineSeries id="avgRatings" name="Average Ratings" data={avgRatings}/>
                    </YAxis>

                    <Tooltip shared={true}/>

                    <Navigator>
                        <Navigator.Series seriesId="reviewCount"/>
                        <Navigator.Series seriesId="avgRatings"/>
                    </Navigator>
                </HighchartsStockChart>
            </div>
        )
    }
}

export default withHighcharts(TimeSeries, Highcharts);