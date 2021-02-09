import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="/main">Movie Recommender</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/main">All Movies</Nav.Link>
            <Nav.Link href="#pricing">Recommended Movies</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <div>
              {auth().currentUser ?
                  <div className="navbar-nav">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <button className="btn btn-primary" onClick={() => auth().signOut()}>Logout</button>
                  </div>
                  :
                  <div className="navbar-nav">
                    <Nav.Link href="/login">Sign In</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                  </div>
              }
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;