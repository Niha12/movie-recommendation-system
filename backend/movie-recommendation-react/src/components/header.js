import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import * as ReactBootstrap from 'react-bootstrap';
function Header() {
  return (
    <header>

      <ReactBootstrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <ReactBootstrap.Navbar.Brand href="/main">Movie Recommender</ReactBootstrap.Navbar.Brand>
        <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootstrap.Nav className="mr-auto">
            <ReactBootstrap.Nav.Link href="/main">All Movies</ReactBootstrap.Nav.Link>
            <ReactBootstrap.Nav.Link href="#pricing">Recommended Movies</ReactBootstrap.Nav.Link>
            <ReactBootstrap.NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <ReactBootstrap.NavDropdown.Item href="#action/3.1">Action</ReactBootstrap.NavDropdown.Item>
              <ReactBootstrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootstrap.NavDropdown.Item>
              <ReactBootstrap.NavDropdown.Item href="#action/3.3">Something</ReactBootstrap.NavDropdown.Item>
              <ReactBootstrap.NavDropdown.Divider />
              <ReactBootstrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootstrap.NavDropdown.Item>
            </ReactBootstrap.NavDropdown>
          </ReactBootstrap.Nav>
          <ReactBootstrap.Nav>
            <div>
              {auth().currentUser ?
                  <div className="navbar-nav">
              <ReactBootstrap.Nav.Link href="/profile">Profile</ReactBootstrap.Nav.Link>
              <button className="btn btn-primary" onClick={() => auth().signOut()}>Logout</button>
                  </div>
              :
                  <div className="navbar-nav">
              <ReactBootstrap.Nav.Link href="/login">Sign In</ReactBootstrap.Nav.Link>
              <ReactBootstrap.Nav.Link href="/signup">Sign Up</ReactBootstrap.Nav.Link>
                  </div>
              }
            </div>
          </ReactBootstrap.Nav>
        </ReactBootstrap.Navbar.Collapse>
      </ReactBootstrap.Navbar>

      {/*<nav className="navbar navbar-expand-lg navbar-light bg-dark">*/}
      {/*  <Link className="navbar-brand" to="/">ABC</Link>*/}
      {/*  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">*/}
      {/*    <span className="navbar-toggler-icon"/>*/}
      {/*  </button>*/}
      {/*  <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">*/}
      {/*    {auth().currentUser*/}
      {/*      ? <div className="navbar-nav">*/}
      {/*        <Link className="nav-item nav-link" to="/profile">Profile</Link>*/}
      {/*        <button className="btn btn-primary" onClick={() => auth().signOut()}>Logout</button>*/}
      {/*      </div>*/}
      {/*      : <div className="navbar-nav">*/}
      {/*        <Link className="nav-item nav-link" to="/login" eventKey={2}>Sign In</Link>*/}
      {/*        <Link className="nav-item nav-link" to="/signup" eventKey={2}>Sign Up</Link>*/}
      {/*      </div>}*/}
      {/*  </div>*/}
      {/*</nav>*/}
    </header>
  );
}

export default Header;