import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

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
      <Container>
        <Sidebar/>
          <br />
        <BrowserRouter>
          {/*All routes go here!*/}
          <Route exact path="/" component={Home} />
          <Route exact path="/host-website" component={Home} />
          <Route exact path="/report" component={Report} />
          <Route exact path="/help" component={Help} />
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
