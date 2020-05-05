import React from 'react';
import '../App.css';
import IoTChart from '../components/IoTChart.js'

const Home = () => {
    return (
      <div>
        <h1>Noise Manager WebApp</h1>
        <p>Real time data of each section/device</p>
            <div id="chartContainer">
                <IoTChart />
            </div>
      </div>
    );

}

export default Home;
