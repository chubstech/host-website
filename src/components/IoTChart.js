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

function getCurrentDate()
{
  var toBuild;
    var date = new Date();
    //date.getDate()-2 accounts for time changing 
  toBuild = new Date(date.getFullYear(), date.getMonth(), date.getDate()-2, date.getHours()-4, date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return toBuild;
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
        //var promiseA = makeAPIRequestUsers().then(devices => { //uncomment once we are ready to use api to call for user list
            var jsonFiles = require('../test-data-files/users.json');//iterates through list of user
            //var jsonUsers = JSON.stringify(devices); //uncomment once we are ready to use api to call for user list
            //jsonUsers = JSON.parse(jsonUsers); //uncomment once we are ready to use api to call for user list
            //console.log(jsonUsers); //uncomment once we are ready to use api to call for user list
            var count = 0;
            //jsonUsers.map(function (e) { //uncomment once we are ready to use api to call for user list
                //console.log(e.user_id);
                //if (e.user_id != "Esp32" && e.user_id != "Esp 32b") { //uncomment once we are ready to use api to call for user list
                    jsonFiles.forEach((item, i) => { //comment once we are ready to use api to call for user list
                        //var promiseB = makeAPIRequest(e.user_id).then(info => { //uncomment once we are ready to use api to call for user list
                            var promiseB = makeAPIRequest(item).then(info => {
                                var json = JSON.stringify(info);
                                json = JSON.parse(json);
                                var current = getCurrentDate();
                                var filteredJson = json.filter(function (e) {
                                    var tempTimeStampDate = new Date(e.time_obs * 1000);
                                    if (tempTimeStampDate >= current) {
                                        return e.time_obs;
                                    }
                                }
                                );
                                console.log(filteredJson);
                                var unixDict = new Object();
                                var timeDict = new Object();
                                var dict = new Object();
                                var labels = filteredJson.map(function (e) {
                                    getLoudestOne(e.time_obs, e.db_reading, dict);
                                    var timeStampDate = new Date(Object.keys(dict)[0] * 1000);
                                    return makeNiceTime(timeStampDate);
                                });
                                console.log(timeDict);
                                data = filteredJson.map(function (e) { 
                                    return dict[e.time_obs];
                                });
                                var canvas = document.createElement('canvas'),
                                    chartId = 'chart' + i;
                                //count++; //uncomment once we are ready to call api for user list
                                canvas.id = chartId;
                                var heading1 = document.createElement("H2"); //creates heading2 tag
                                //var chartLabel = document.createTextNode(e.user_id); //creates label text //uncomment once we are ready to call api for user list
                                var chartLabel = document.createTextNode(item); //creates label text //comment once we are ready to call api for user list
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
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: item //comment once we are ready to use api to call for user list
                                            //text: e.user_id //uncomment once we are ready to use api to call for user list
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

                            });
                        //}); //uncomment once we are ready to use api to call for user list
                    }); //comment once we are ready to use api to call for user list
                //} //uncomment once we are ready to use api to call for user list
            //}); //uncomment once we are ready to use api to call for user list
        //}); //uncomment once we are ready to use api to call for user list
        
    }
  render() {
      return (
          <div>
          </div>
      )
  }
}