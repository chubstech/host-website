import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import {
  BrowserRouter,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';

//Pages
import Home from './pages/Home.js';
import Report from './pages/Report';
import Help from './pages/Help';


class App extends Component {
  render() {
    return (
      <Container>
        <BrowserRouter>
              <Navbar bg="dark" variant="dark" expand="sm" >
                <Navbar.Brand as={Link} to="/">React Demo App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/host-website">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/report">Report</Nav.Link>
                    <Nav.Link as={NavLink} to="/help">Help</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              < br />
              <Switch>
                <Route exact path='/host-website' component={Home}/>
                <Route exact path='/report' component={Report}/>
                <Route exact path='/help' component={Help}/>
                <Redirect from="/" to="/host-website"/>
              </Switch>
          </BrowserRouter>
      </Container>
    );
  }
}

export default App;
