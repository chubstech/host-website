import React from 'react';
import { Line } from 'react-chartjs-2';

const dr_data = require('./../test-data-files/Dr1.json');
const esp32_data = require('./../test-data-files/Esp32.json');
const nurse_data = require('./../test-data-files/Nurse1.json');
const patient_data = require('./../test-data-files/Patient1.json');
const debug_data = require('./../test-data-files/Debug.json');


function getCorrectTimestamp( time_list ) { // Converts any time stamps 13-24 to Clockwise numbers i.e. 1-12
    const time_stamps = [ [13, 1], [14, 2], [15, 3], [16, 4], [17, 5], [18, 6], [19, 7], [20, 8], [21, 9], [22, 10], [23, 11], [24, 12]];
    for(let i = 0; i < time_list.length ; i++) {   
        if( time_list[i][1] > 12 ) {
            let prevTime = time_list[i][1];
            for(let a = 0; a < time_stamps.length ; a++) { 
                if( time_stamps[a][0] == prevTime ) {  time_list[i][1] = time_stamps[a][1] }; 
        }
        }
    }
    return time_list;
}

function getAvgHourlyData( json_data ) { //Gathers the db Levels of each hour from the json and finds avg db level per hr

    let result = [];
    let sec_result = [];
    let chart_index = [8,9,10,11,12,1,2,3,4,5,6,7,8];
    let final_result = [0,0,0,0,0,0,0,0,0,0,0,0, 0]
    let activeHour = 0;
    let dbAvg = 0;
    let hourlyNumCount = 0;

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
        hourlyNumCount++;
        
    }
    sec_result = getCorrectTimestamp(result);

    for( var s = 0; s<sec_result.length; s++){
            let desiredIndex = chart_index.indexOf( sec_result[s][1] );
            final_result[ desiredIndex ] = sec_result[s][0];
    }
    return final_result;

}

var chartOptions = {
    showScale: true,
    pointDot: true,

    title: {
        display: true,
        text: 'Average Noise Levels (Hourly)',
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


class ReportChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartReference = React.createRef();
        this.label = ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM'];
        this.state = {
            chartData:
             {
                labels: this.label,
                datasets: [ 
                {
                    label: "Doctor 1",
                    fill:false,
                    backgroundColor: 'rgb(25, 129, 102)',
                    borderColor: 'rgb(25, 129, 102)',
                    data: getAvgHourlyData( dr_data ), 
                },
                {
                    label: "Debug",
                    fill:false,
                    backgroundColor: 'rgba(171,185,255)',
                    borderColor: 'rgba(171,185,255)',
                    data: getAvgHourlyData( debug_data ), 
                },
                {
                    label: "Esp32",
                    fill:false,
                    backgroundColor: 'rgb(19, 72, 250)',
                    borderColor: 'rgb(19, 72, 250)',
                    data: getAvgHourlyData( esp32_data ), 
                },
                {
                    label: "Nurse1",
                    fill:false,
                    backgroundColor: 'rgb(174, 255, 171)',
                    borderColor: 'rgb(174, 255, 171)',
                    data: getAvgHourlyData( nurse_data ), 
                },
                {
                    label: "Patient1",
                    fill:false,
                    backgroundColor: 'rgb(255, 205, 139)',
                    borderColor: 'rgb(255, 205, 139)',
                    data: getAvgHourlyData( patient_data ), 
                }
                ]
             }
        };

    }

        render() {

            return (

                <div>
                    <Line 
                    ref={this.chartReference}
                    data={this.state.chartData}
                    options={chartOptions}
                    height={240}
                    width={600}
                    />
                </div>
            );
        }
    }


  export default ReportChart;