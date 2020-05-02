import React from 'react'
import Chart from "chart.js";
var Component = React.Component;


export default class FrankLineGraph extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
				var jsonfile = require('../test-data-files/Debug.json');
				var dict = new Object();
				var labels = jsonfile.map(function(e) {
					dict[e.time_obs] = e.db_reading;
					if(dict[e.time_obs] < e.db_reading)
					{
						dict[e.time_obs] = e.db_reading;
					}
					var dateObj = new Date(e.time_obs * 1000);
					var hours = dateObj.getUTCHours();
					// Get minutes part from the timestamp
					var minutes = dateObj.getUTCMinutes();

					// Get seconds part from the timestamp
					var seconds = dateObj.getUTCSeconds();
					var formattedTime = hours.toString().padStart(2, '0') + ':' +
                minutes.toString().padStart(2, '0') + ':' +
                seconds.toString().padStart(2, '0');
				  return formattedTime
				});
				var data = jsonfile.map(function(e) {
				   return dict[e.time_obs]
				});;
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "DB Levels",
                        data: data,
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
