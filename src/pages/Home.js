import React from 'react';
import '../App.css';
import Realtime from '../components/Realtime';
import Baselines from '../components/Baselines';
import FrankLineGraph from '../components/FranksChart'

const Home = () => {
    return (
      <div>
        <h1>Noise Manager WebApp</h1>
        <p>Real time data of each section/device</p>
        
        <FrankLineGraph />
        <br/>
        <Realtime />
        <Baselines />
      </div>
    );

}

export default Home;
