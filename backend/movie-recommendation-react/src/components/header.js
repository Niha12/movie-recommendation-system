import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "./../App.css"
import Logout from "./logout";

function Header() {
    if(auth().currentUser) {
        return (
            <header style={styles}>
                <Navbar collapseOnSelect className="header" expand="lg">
                    <Navbar.Brand href="/main" style={{
                        color: "white",
                        fontFamily: "Marker Felt, fantasy",
                        fontSize: "23px"
                    }}>MovieRec</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/main">All Movies</Nav.Link>
                            <Nav.Link href="/recommendations">Recommended Movies</Nav.Link>
                            <Nav.Link href="/watchlater">Watch Later</Nav.Link>
                            <Nav.Link href="/ratedmovies">Rated Movies</Nav.Link>
                            <NavDropdown title="Genres" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/genres#Action">Action</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Animation">Animation</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Comedy">Comedy</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Crime">Crime</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Documentary">Documentary</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Family">Family</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#History">History</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Horror">Horror</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Mystery">Mystery</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Romance">Romance</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Science-Fiction">Science Fiction</NavDropdown.Item>
                                <NavDropdown.Item href="/genres#Thriller">Thriller</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown.Divider/>
                        </Nav>
                        <Nav>
                            <div>
                                <div className="navbar-nav">
                                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/profile/settings">Settings</NavDropdown.Item>
                                        <NavDropdown.Item href="/profile/friends">Your Friends</NavDropdown.Item>
                                        <NavDropdown.Item href="/profile/ratings">Your Ratings Data</NavDropdown.Item>
                                    </NavDropdown>
                                    <Logout/>
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;