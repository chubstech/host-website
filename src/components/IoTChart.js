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

function makeAPIRequestUsers() {
    return fetch('https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/users')
        .then((response) => {
            return response.json();
        })
        .then(json => {
            var jsonTest = json;
            return jsonTest;
        });
}

function getLoudestOne(time, loudness, unixStorage)
{
    if(time in unixStorage){
        if (unixStorage[time] < loudness) {
            unixStorage[time] = loudness
        }
    }
    else {
        unixStorage[time] = loudness
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
        var promiseA = makeAPIRequestUsers().then(devices => { //uncomment once we are ready to use api to call for user list
            //var jsonFiles = require('../test-data-files/users.json');//iterates through list of user
            var jsonUsers = JSON.stringify(devices); //uncomment once we are ready to use api to call for user list
            jsonUsers = JSON.parse(jsonUsers); //uncomment once we are ready to use api to call for user list
            console.log(jsonUsers); //uncomment once we are ready to use api to call for user list
            var count = 0;
            jsonUsers.map(function (e) { //uncomment once we are ready to use api to call for user list
            console.log(e.user_id);
                                //jsonFiles.forEach((item, i) => { //comment once we are ready to use api to call for user list
                        var promiseB = makeAPIRequest(e.user_id).then(info => { //uncomment once we are ready to use api to call for user list
                          //  var promiseB = makeAPIRequest(info).then(info => {
                                var json = JSON.stringify(info);
                                json = JSON.parse(json);
                                var today = Math.floor(new Date().getTime()/1000.0);
                                var past = Math.round(today - 7200); //past 2 hours in epoch time
                                var filteredJson = json.filter(function (e) {
                                    if (e.time_obs >= past && e.time_obs < today) {
                                        return e.time_obs;
                                    }
                                }
                              );
                                console.log(filteredJson);
                                var dict = new Object();
                                filteredJson.map(function (e) {
                                    var timeStampDate = new Date(e.time_obs * 1000);
                                    var niceTime = makeNiceTime(timeStampDate);
                                    getLoudestOne(niceTime, e.db_reading, dict);
                                });
                                var canvas = document.createElement('canvas'),
                                chartId = 'chart' + e.user_id;
                                canvas.id = chartId;
                                var heading1 = document.createElement("H2"); //creates heading2 tag
                                var chartLabel = document.createTextNode(e.user_id); //creates label text //uncomment once we are ready to call api for user list
                                //var chartLabel = document.createTextNode(item); //creates label text //comment once we are ready to call api for user list
                                heading1.appendChild(chartLabel);//appends heading2 to the text
                                document.querySelector("#chartContainer").appendChild(heading1); //appends label to chartContainer div
                                document.querySelector("#chartContainer").appendChild(canvas);// appends chart to chartCOntainer div
                                //document.body.appendChild(canvas) //old code

                                var context = document.getElementById(chartId).getContext('2d');
                                window[chartId] = new Chart(context, {
                                    type: 'line',
                                    data: {
                                        //Bring in data
                                        labels: Object.keys(dict).reverse(),
                                        datasets: [
                                            {
                                                label: "DB Levels",
                                                data: Object.values(dict).reverse(),
                                            }
                                        ]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            //text: item //comment once we are ready to use api to call for user list
                                            text: e.user_id //uncomment once we are ready to use api to call for user list
                                        },
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    maxTicksLimit: 20
                                                }
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }
                                });

                            //});
                        }); //uncomment once we are ready to use api to call for user list
                    //}); //comment once we are ready to use api to call for user list
            }); //uncomment once we are ready to use api to call for user list
        }); //uncomment once we are ready to use api to call for user list

    }
  render() {
      return (
          <div>
          </div>
      )
  }
}
