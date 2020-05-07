import React from 'react'
import Chart from "chart.js";
var Component = React.Component;

function makeAPIRequest(userType) {
    var baseAPIURL = 'https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/';
    baseAPIURL = baseAPIURL + userType;
    return fetch(baseAPIURL)
        .then((response) => {
            return response.json();
        })
        .then(json => {
            var jsonTest = json;
            return jsonTest;
        });
}

export default class IoTChart extends Component {
    componentDidMount() {
        var jsonfiles = require('../test-data-files/users.json');//iterates through list of user
        jsonfiles.forEach((item, i) => {
            var promiseA = makeAPIRequest(item).then(info => {
                var json = JSON.stringify(info);
                json = JSON.parse(json);
                var dataDict = new Object();
                var dataArr = [];
                for (var i = 0; i < json.length; i++) {
                    dataDict[json[i].time_obs] = json[i].db_reading;
                    dataArr.push(json[i]);
                    
                }
                var dict = new Object();
                var labels = dataArr.map(function(e) {
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
                var data = dataArr.map(function (e) {
                        return dict[e.time_obs]
                });
                var canvas = document.createElement('canvas'),
                chartId = 'chart' + i;
                canvas.id = chartId;
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

        });
    } 
  render() {
      return (
          <div>
          </div>
      )
  }
}
