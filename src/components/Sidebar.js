import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Sidebar() {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">Innovation Labs</Navbar.Brand>
      <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link eventKey="report" href="/report">Report</Nav.Link>
          <Nav.Link eventKey="help" href="/help">Help</Nav.Link>
      </Nav>
  </Navbar>
  )
}

export default Sidebar
