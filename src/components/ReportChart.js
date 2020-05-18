import React from 'react';
import { Line } from 'react-chartjs-2';
let color_count = 0;


function getAvgHourlyData( json_data ) { //Gathers the db Levels of each hour from the json and finds avg db level per hr
  var peak = 0;
  var peaktimes = {};
  let avg = 0;
  let avgBase = 0;

    let last_12hours = [];
    let activeHour = 0;
    let dbAvg = 0;
    let hourlyNumCount = 0;
    let final_result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//25
    let zero_hr = 0;
    let zeroNumCount = 0;

    var today = new Date();
    for(let i = 0; i < json_data.length ; i++) {
        var time = new Date( json_data[i].time_obs *1000 );
        if( time.getDate() > today.getDate()-1 && time.getHours() < today.getHours() ) {// This only checks if the data is on the 2 day list limit until current time
            if( activeHour == 0 ) {
                activeHour = time.getHours();
            } else if ( time.getHours() != activeHour ) { //Runs this if it's a new hour
                 if ( time.getDate() == today.getDate()  && activeHour <= today.getHours()) {
                    last_12hours.push( [Math.round(dbAvg / hourlyNumCount), activeHour ])
                    activeHour = time.getHours();
                    dbAvg = 0;
                    hourlyNumCount = 0;
                }
            } 
            
             if ( activeHour == 0 ) {
                zero_hr+= json_data[i].db_reading;
                zeroNumCount++;
            } else {
                dbAvg+= json_data[i].db_reading;
                hourlyNumCount++;
            }
        }
        dbAvg+= json_data[i].db_reading;
        if (json_data[i].db_reading >= peak) {
          delete peaktimes[peak];
          peak = json_data[i].db_reading;
          if (peaktimes[json_data[i].db_reading]) {
            peaktimes[json_data[i].db_reading].push(time.toLocaleString());
          }
          else {
            peaktimes[json_data[i].db_reading] = [time.toLocaleString()];
          }
        }
        hourlyNumCount++;

    }

    last_12hours.push( [Math.round(zero_hr / zeroNumCount), 0 ]) //adds 12AM time

    let startIndex = 24-today.getHours();

    for( var i=0; i < last_12hours.length; i++){ 
        final_result[startIndex] = last_12hours[(last_12hours.length-1)-i][0];
        startIndex++;
    }

    for( var s = 0; s < last_12hours.length; s++){ // Loops through the list to put it on the final list that is shown in the data
        if (last_12hours[s][0] !== 0) {
          avg += last_12hours[s][0];
          avgBase++;
        }
}

    return [final_result, Math.round(avg/avgBase), peak, peaktimes[peak]];
}

function createDataset( user_file, user ) { //Creates a dataset given the json file

    const colors = [ 'rgb(25, 129, 102)', 'rgba(171,185,255)', 'rgb(19, 72, 250)', 'rgb(174, 255, 171)', 'rgb(255, 205, 139)', 'rgb(252, 58, 113)', 'rgb(232, 222, 46)', 'rgb(178, 62, 207)', 'rgb(158, 56, 5)'];
    var help = getAvgHourlyData( user_file )
    let result = {
        label: user,
        fill:false,
        backgroundColor: colors[color_count],
        borderColor: colors[color_count],
         data: help[0],
        avg: help[1],
        peak: help[2],
        peaktimes: help[3]
    };
    color_count++;
    return result;
}



var chartOptions = {
    showScale: true,
    pointDot: true,
    title: {
        display: true,
        text: 'Average Noise Levels in the Past 24 Hours (Hourly)',
        fontSize:20
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Noise (dB) Levels'
            }
          }]
       }

}

function makeAPIRequest(userType) {
    let api_site = 'https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/noise_observation/user/'+ userType;
    return fetch( api_site )
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

function getTimeAxis() { // returns a list of all labels for the 24 hr time frame

    let axis_list = [];
    const time_stamps = [ [13, 1], [14, 2], [15, 3], [16, 4], [17, 5], [18, 6], [19, 7], [20, 8], [21, 9], [22, 10], [23, 11], [24, 12]];
    var today = new Date();
    let currentHr = today.getHours();
    for(let i = 0; i < 25 ; i++) { 
        let decrementedHr = currentHr - i;
        if( decrementedHr >= 12 ) {//Checks if time is after 12pm 
            if(decrementedHr == 12) { axis_list.unshift( decrementedHr + 'PM' ); }
            for(let a = 0; a < time_stamps.length ; a++) { 
                if( time_stamps[a][0] == decrementedHr){  axis_list.unshift( time_stamps[a][1] + 'PM' );}
            }
        } else if ( decrementedHr == 0) {
            axis_list.unshift( '12AM');
            currentHr = i + 24; 
        } else if( decrementedHr < 12) {
            axis_list.unshift( decrementedHr + 'AM' );
        } 
    }
    return axis_list;
}



class ReportChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
        this.label = getTimeAxis();
        this.state = {
            chartData:
             {
                labels: this.label,
                datasets: []
             },
             json_files: []
        };

    }



    componentDidMount() { //Sets the state of datasets from the json files that are present

        let dataset_list = [];

        var promiseA = makeAPIRequestUsers().then(devices => { // Makes API request to get current users list
            var jsonUsers = JSON.stringify(devices);
            jsonUsers = JSON.parse(jsonUsers);
            jsonUsers.forEach((item, i) => {
                var api_data = makeAPIRequest(item.user_id).then(info => { //Loops through each user to create dataset and pushes it to the state
                    var json = JSON.stringify(info);
                    json = JSON.parse(json);
                    var dataset = createDataset( json, json[0].user_id );
                    console.log(dataset);
                    dataset_list.push( dataset);
                    if ( dataset_list.length == jsonUsers.length) {
                        getTimeAxis();
                        this.setState({
                            chartData: {
                                datasets: dataset_list
                            }
                        });
                        return dataset_list;
                    }
                });
        });

    });

}
        render() {
            return (
              <div>
                <div className='lineChart'>
                    <Line
                    ref={this.chartReference}
                    data={this.state.chartData}
                    options={chartOptions}
                    height={250}
                    width={600}
                    />
                </div>
                <br></br><br></br>
                <div>
                    <h3>Daily Summary Table</h3>
                    <table>
                    <tbody>
                      <tr>
                       <th id="table-header">Section Name</th>
                       <th id="table-header">Average dB</th>
                       <th id="table-header">Peak dB</th>
                       <th id="table-header">Peak dB Time</th>
                      </tr>
                      {this.state.chartData.datasets.map((item) =>
                        <tr key={item.label}>
                        <td>{item.label}</td>
                        <td>{item.avg}</td>
                        <td> {item.peak}</td>
                        <td>{item.peaktimes}</td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                </div>
                </div>
            );
        }
    }


  export default ReportChart;
