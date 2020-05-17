import React from 'react';
import { Line } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
let color_count = 0;


function getAvgHourlyData( json_data ) { //Gathers the db Levels of each hour from the json and finds avg db level per hr
  var peak = 0;
  var peaktimes = {};
  let avg = 0;
  let avgBase = 0;

    let result = [];
    let activeHour = 0;
    let dbAvg = 0;
    let hourlyNumCount = 0;
    // let chart_index = [0,1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];
    let final_result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//25
    let activeDate = 0;

    for(let i = 0; i < json_data.length ; i++) {
        var time = new Date( json_data[i].time_obs *1000 );

        if( activeHour == 0 ) {
            activeHour = time.getHours();
        } else if ( time.getHours() != activeHour ) {
            result.push( [Math.round(dbAvg / hourlyNumCount), activeHour ])
            activeHour = time.getHours();
            dbAvg = 0;
            hourlyNumCount = 0;
        } else if ( i == json_data.length-1 ) {
            result.push( [Math.round(dbAvg / hourlyNumCount), activeHour ])
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
    for( var s = 0; s < result.length; s++){ // Loops through the list to put it on the final list that is shown in the data
            let desiredIndex = result[s][1] ;
            final_result[ desiredIndex ] = result[s][0];
            if (result[s][0] !== 0) {
              avg += result[s][0];
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

function makeAPIRequest(userType) { //makes API request to get each json file according to the user endpoint given 
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


function makeAPIRequestUsers() { // Grabs the current users
    return fetch('https://cors-anywhere.herokuapp.com/https://noise-wearable.herokuapp.com/api/users')
        .then((response) => {
            return response.json();
        })
        .then(json => {
            var jsonTest = json;
            return jsonTest;
        });
}



class ReportChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
        this.label = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM', '9PM', '10PM', '11PM'];
        this.state = {
            text: 'Weekly Report',
            chartData:
             {
                labels: this.label,
                datasets: []
             },
             json_files: []
        };

    }

    changeText = () => { //Changes text whenever the button is clicked -- going to add the functionality to switch graphs
        if ( this.state.text == 'Weekly Report' ) {
            this.setState({ text: 'Daily Report' });
        } else {
            this.setState({ text: 'Weekly Report' });

        }
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
