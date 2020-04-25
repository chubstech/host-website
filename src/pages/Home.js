import React from 'react';
import '../App.css';
import Realtime from '../components/Realtime';
import Baselines from '../components/Baselines';
import FrankLineGraph from '../components/FranksChart'

const Home = () => {
    return (
       <div>
        <h1 class="no-print">Noise Manager WebApp</h1>
          <p>Real time data of each section/device</p>
          <div className="App-header">
              <FrankLineGraph />
              <br/>
              <Realtime />
              <Baselines />
            </div>
       </div>
    );

}

export default Home;
