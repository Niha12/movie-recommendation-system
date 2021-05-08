import React from 'react';
import { auth } from '../services/firebase';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "./../App.css"

// Header component that is displayed on the home page
function HomePageHeader() {
  return (
    <header style={styles}>
      <Navbar collapseOnSelect  className="header" expand="lg">
        <Navbar.Brand href="/main" style={{color:"white",fontFamily:"Marker Felt, fantasy", fontSize:"23px"}}>MovieRec</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <div>
              {auth().currentUser ?
                  <div className="navbar-nav">
                    <Nav.Link href="/profile/settings">Profile</Nav.Link>
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

export default HomePageHeader;