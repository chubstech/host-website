import React from 'react'
import Chart from "chart.js";
var Component = React.Component;

//var jsonfile;
function makeAPIRequest(userType) {
    return fetch('https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/Patient1')
        .then((response) => {
            return response.json();
        })
        .then(json => {
            console.log(json);
            var jsonTest = json;
            //console.log(jsonTest);
            return jsonTest;
            //return Promise.resolve();
        });
    //.then(json => {
    //    res.json(json);
    //});
}

/*
function dataArray() {
    var dataArray = [];
    return makeAPIRequest("Patient1").then((data) => {
        for (var i = 0; i < data.length; i++) {
            dataArray.push(data);
        }
        //return dataArray;
    });
    console.log(dataArray);
    return dataArray;
}*/


/*const myChartRef = this.chartRef.current.getContext("2d"); //creates a 2D chart
var jsonfile = require('../Patient1.json'); //grabs data and puts it into a new variable jsonfile
var dataArray = [];
return makeAPIRequest("Patient1").then((data) => {
    for (var i = 0; i < data.length; i++) {
        dataArray.push(data);
    }
    return dataArray;
});
console.log(dataArray);*/


export default class AnaChart extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        var obj;
        console.log(makeAPIRequest("dummyInput")); //makeAPI request works and user is able to see data after waiting in console only

        var promiseA =
            makeAPIRequest("Patient1").then(info => {
                console.log(info);
                var json = JSON.stringify(info);
                json = JSON.parse(json);
                //console.log(json);
                console.log(typeof json);
                var dataDict = new Object();
                var dataArr = [];
                for (var i = 0; i < json.length; i++) {
                    //console.log(json[i].time_obs);
                    dataDict[json[i].time_obs] = json[i].db_reading;
                    dataArr.push(json[i]);

                }
                console.log(dataDict);
                console.log(dataArr);

                const myChartRef = this.chartRef.current.getContext("2d"); //creates a 2D chart

                //var jsonfile = require('../test-data-files/Nurse1.json');
                //var jsonfile = require(dataArr);
                //console.log("test please print");
                //console.log(obj);
                //console.log(dataArray());
                //var dict = new Object();
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
                });;




                /*
                var jsonfile = require('../test-data-files/Nurse1.json');
                //var jsonfile = require(obj);
                console.log("test please print");
                //console.log(obj);
                //console.log(dataArray());
                var dict = new Object();
                var labels = jsonfile.map(function (e) { //generates the labels for the data
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
                var data = jsonfile.map(function (e) {
                    return e.db_reading;
                });;
                */
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
    //IGNORE 
    /*async function fetchData() {
            let response = await fetch('https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/Nurse1');
            let data = await response.json();
            data = JSON.stringify(data);
            data = JSON.parse(data);
            return data;
        }
        //let abc = await fetchData();
        var abc = fetchData().then((data) => {
            var dataArray = [];
            for (var i = 0; i < data.length; i++) {
                dataArray.push(data);
            }
            //console.log(dataArray);
            return dataArray;
    
        }); // here the data will be return.
        console.log(abc);
        */
    //console.log(dataArray);

    //makeAPIRequest("userType");

    //var jsonPlease;
    /*var promiseA =
        makeAPIRequest("Patient1").then(info => {
            console.log(info);
            return info;
            //jsonPlease = info;
            //jsonTest = info;
            //this.name = info.name;
            //this.profile_pic = info.imageURL;
            //this.profile_link = info.spotifyProfile;
        }); */
    //console.log("Hewwo line 36 here");
    //console.log(promiseA);
    //console.log(jsonfile[0]);
}