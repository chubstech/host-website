import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';


//Pages
import Home from './pages/Home.js';
import Report from './pages/Report';
import Help from './pages/Help';

//Components
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/*All routes go here!*/}
        <Route exact path="/" component={Home} />
        <Route exact path="/report" component={Report} />
        <Route exact path="/help" component={Help} />

        <Sidebar/>
      </BrowserRouter>
    );
  }
}

export default App;
