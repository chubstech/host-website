import React from 'react'
import Chart from "chart.js";
var Component = React.Component;


export default class IoTChart extends Component {
    componentDidMount() {
      var jsonfiles = require('../test-data-files/users.json');
      jsonfiles.forEach((item, i) => {
        var currentFile = require('../test-data-files/' + item + '.json')
        var dict = new Object();
				var labels = currentFile.map(function(e) {
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
                    //dateObj.toDateString() + " " + 
                    var formattedTime = hours.toString().padStart(2, '0') + ':' +
                minutes.toString().padStart(2, '0') + ':' +
                seconds.toString().padStart(2, '0');
				  return formattedTime
				});
				var data = currentFile.map(function(e) {
				   return dict[e.time_obs]
        });
        var canvas = document.createElement('canvas'),
        chartId = 'chart' + i;
        canvas.id = chartId;
        //document.querySelector("#chartContainer").innerHTML = "I am writing to chartContainer!"; //test
        var heading1 = document.createElement("H2"); //creates heading2 tag
        var chartLabel = document.createTextNode(item); //creates label text
        heading1.appendChild(chartLabel);//appends heading2 to the text
        document.querySelector("#chartContainer").appendChild(heading1); //appends label to chartContainer div
        document.querySelector("#chartContainer").appendChild(canvas);// appends chart to chartCOntainer div
        //document.body.appendChild(canvas) //old code

        var context = document.getElementById(chartId).getContext('2d');
        window[chartId] = new Chart(context, {
        type: 'line',
        data: {
            //Bring in data
            labels: labels,
            datasets: [
                {
                    label: "DB Levels",
                    data: data,
                }
            ]
        }
      });

      });


  }
  render() {
      return (
          <div>
          </div>
      )
  }
}
