import React from 'react';
import '../App.css';
import Realtime from '../components/Realtime';
import Baselines from '../components/Baselines';
import FrankLineGraph from '../components/FranksChart'
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
