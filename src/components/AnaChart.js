import React from 'react'
import Chart from "chart.js";
var Component = React.Component;

function makeAPIRequest(userType) {
    return fetch('https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/Patient1')
        .then((response) => {
            return response.json();
        })
        .then(json => {
            //console.log(json);
            var jsonTest = json;
            return jsonTest;
        });
}

export default class AnaChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        //console.log(makeAPIRequest("dummyInput")); //makeAPI request works and user is able to see data after waiting in console only
        
        var promiseA =
            makeAPIRequest("Patient1").then(info => {
                //console.log(info);
                var json = JSON.stringify(info);
                json = JSON.parse(json);
                //console.log(json);
                //console.log(typeof json);
                var dataDict = new Object();
                var dataArr = [];
                for (var i = 0; i < json.length; i++) {
                    //console.log(json[i].time_obs);
                    dataDict[json[i].time_obs] = json[i].db_reading;
                    dataArr.push(json[i]);
                    
                }
                //console.log(dataDict);
                //console.log(dataArr); 

                const myChartRef = this.chartRef.current.getContext("2d"); //creates a 2D chart
                var labels = dataArr.map(function (e) { //generates the labels for the data
                    var dateObj = new Date(e.time_obs * 1000); //converts Unix Time Stamp to date object and places it in variable dateObj
                    //console.log(dateObj.toDateString);
                    var hours = dateObj.getUTCHours(); // variable hours (label) is assigned
                    var minutes = dateObj.getUTCMinutes(); //variable mins (label) is assigned

                    // Get seconds part from the timestamp
                    var seconds = dateObj.getUTCSeconds(); // variable seconds (label) is assigned
                    //dateObj.toDateString() + " " + 
                    var formattedTime = hours.toString().padStart(2, '0') + ':' + ///formats the time into a more readable maner HH:MM:SS 24HRS Mode using the variables we created earlier
                        minutes.toString().padStart(2, '0') + ':' +
                        seconds.toString().padStart(2, '0');
                    return formattedTime //returns the string with the readable time
                });
                var data = dataArr.map(function (e) {
                    return e.db_reading;
                });

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