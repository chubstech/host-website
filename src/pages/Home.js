import React from 'react';
import '../App.css';
import Realtime from '../components/Realtime';
import Baselines from '../components/Baselines';

const Home = () => {
    return (
       <div>
        <h1 class="no-print">Noise Manager WebApp</h1>
          <p>yikes testing in production</p>
          <div className="App-header">
              <Realtime />
              <Baselines />
            </div>
       </div>
    );
}

export default Home;
