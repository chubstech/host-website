import React from 'react'
import Chart from "chart.js";
var Component = React.Component;

var data;
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

function getCurrentDate()
{
  var toBuild;
  var date = new Date();
  toBuild = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1, date.getHours()-2, date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return toBuild;
}

function getLoudestOne(time, loudness, storage)
{
  if(time in storage)
  {
    if(storage[time] < loudness)
    {
      storage[time] = loudness
    }
  }
  else {
      storage[time] = loudness
  }
}

function makeNiceTime(dateObj)
{
  var hours = dateObj.getHours();
  // Get minutes part from the timestamp
  var minutes = dateObj.getMinutes();
  // Get seconds part from the timestamp
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;

}

export default class IoTChart extends Component {
    componentDidMount() {
        var jsonfiles = require('../test-data-files/users.json');//iterates through list of user
        jsonfiles.forEach((item, i) => {
            var promiseA = makeAPIRequest(item).then(info => {
                var json = JSON.stringify(info);
                json = JSON.parse(json);
                var current = getCurrentDate();
                var dict = new Object();
                var filteredJson = json.filter(function(e){
                  var tempTimeStampDate = new Date(e.time_obs * 1000);
                  if(tempTimeStampDate >= current){
                    return e.time_obs
                    }
                  }
                );
                var dict = new Object();
                var labels = filteredJson.map(function(e)
                {
                  var timeStampDate = new Date(e.time_obs * 1000);
                  var nice = makeNiceTime(timeStampDate)
                  getLoudestOne(nice, e.db_reading, dict);
                  return Object.keys(dict)[0];
                });
                data = filteredJson.map(function(e)
                {
                  var timeStampDate = new Date(e.time_obs * 1000);
                  var nice = makeNiceTime(timeStampDate)
                  return dict[nice];
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
