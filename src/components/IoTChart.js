import React, { Component } from 'react';
import Chart from "chart.js";
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
//var Component = React.Component;

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
        var promiseA = makeAPIRequestUsers().then(devices => {
            var jsonUsers = JSON.stringify(devices);
            jsonUsers = JSON.parse(jsonUsers);
            jsonUsers.map(function (e) {
            //console.log(e.user_id);
                var promiseB = makeAPIRequest(e.user_id).then(info => {
                    var json = JSON.stringify(info);
                    json = JSON.parse(json);
                    var today = Math.floor(new Date().getTime()/1000.0);
                    var past = Math.round(today - 7200);
                    var filteredJson = json.filter(function (e) {
                        if (e.time_obs >= past && e.time_obs < today) {
                            return e.time_obs;
                        }
                    }
                    );
                    var dict = new Object();
                    filteredJson.map(function (e) {
                        var timeStampDate = new Date(e.time_obs * 1000);
                        var niceTime = makeNiceTime(timeStampDate);
                        getLoudestOne(niceTime, e.db_reading, dict);
                    });
                    var canvas = document.createElement('canvas'),
                    chartId = 'chart' + e.user_id;
                    canvas.id = chartId;
                    var chartLabel = document.createTextNode(e.user_id);
                    document.querySelector("#chartContainer").appendChild(canvas);

                    var context = document.getElementById(chartId).getContext('2d');
                    window[chartId] = new Chart(context, {
                        type: 'line',
                        data: {
                            //Bring in data
                            labels: Object.keys(dict).reverse(),
                            datasets: [{
                                label: "DB Levels",
                                data: Object.values(dict).reverse(),
                                borderColor: 'rgb(135, 188, 200)',
                                backgroundColor: 'rgba(147, 215, 245, 0.5)',
                                lineTension: 0,
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: e.user_id,
                                position: 'top',
                                fontSize: 30,
                                fontColor: '#000000'
                            },
                            layout: {
                                padding: {
                                    top: 20,
                                    bottom: 20
                                }
                            },
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Time (hh:mm 12-Hour)'
                                    },
                                    ticks: {
                                        maxTicksLimit: 20
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Recorded Decibels (dB)'
                                    },
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
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
