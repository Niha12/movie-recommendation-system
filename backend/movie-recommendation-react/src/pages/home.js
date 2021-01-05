import React, { Component } from 'react';
import {auth} from "../services/firebase";
import {Link} from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <section>
          <h1>Home page</h1>
            <p1>
            <Link to="/login">Login</Link>
            </p1>
            <p2>
            <Link to="/signup">Sign up</Link>
            </p2>
        </section>
      </div>
    )
  }
}
