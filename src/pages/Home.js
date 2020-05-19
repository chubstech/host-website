import React from 'react';
import '../App.css';
import Chart from "chart.js";
import IoTChart from '../components/IoTChart.js'



function makeAPIRequest(userType) {
    var baseAPIURL = 'https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/';
    baseAPIURL = baseAPIURL + userType;
    console.log("making api call (users)");
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
    console.log("making user api call");
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

function updateChartHelper(chart, label, data)
{
  //this is what actually updates the charts
  console.log(chart);
  chart.data.labels = label;
  var new_data = data.map(x=>+x);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.data.datasets.forEach((dataset) => {
       dataset.data.push(new_data);
   });
  chart.update();
}

function updateChartMethod(value)
{
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
                var label = Object.keys(dict).reverse();
                var data = Object.values(dict).reverse();
                updateChartHelper(window['chart'+e.user_id],label,data);
                setTimeout(function () { updateChartMethod(value - 1); }, 60000); //comment to update on its own
                //setInterval(function () { updateChartMethod(value - 1); }, 60000); //uncomment to update on its own
          });
      });
    });
}

const Home = () => {
    return (
        <div>
            <h1>Noise Manager WebApp</h1>
            <p>Real time data of each section/device</p>
            <div id="chartContainer">
                <IoTChart />
            </div>
            <script>
            $(document).ready(function() {
                 //   setTimeout(function () { updateChartMethod(100); }, 70000) //comment to update on its own
                //setInterval(function () { updateChartMethod(100) }, 60000) //uncomment to update on its own
            };
            </script>
      </div>
    );
}

export default Home;
