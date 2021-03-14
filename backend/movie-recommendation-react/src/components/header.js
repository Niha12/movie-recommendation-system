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
            <Nav.Link href="/recommendations">Recommended Movies</Nav.Link>
            <Nav.Link href="/watchlater">Watch Later</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              {/*<div className="row">*/}
              {/*  <div className="column left">*/}
                  <NavDropdown.Item href="/genres#Action">Action</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Animation">Animation</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Comedy">Comedy</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Crime">Crime</NavDropdown.Item>
                {/*</div>*/}
                {/*<div className="column middle">*/}
                  <NavDropdown.Item href="/genres#Documentary">Documentary</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Family">Family</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#History">History</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Horror">Horror</NavDropdown.Item>
                {/*</div>*/}
                {/*<div className="column right">*/}
                  <NavDropdown.Item href="/genres#Mystery">Mystery</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Romance">Romance</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Science-Fiction">Science Fiction</NavDropdown.Item>
                  <NavDropdown.Item href="/genres#Thriller">Thriller</NavDropdown.Item>
                {/*</div>*/}
            {/*</div>*/}
            </NavDropdown>
              <NavDropdown.Divider />
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