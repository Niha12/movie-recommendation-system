import React, { Component } from "react";
import { auth, db } from "../services/firebase";
import Header from "../components/header";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser
    };
  }

  componentDidMount() {}

  render() {
    return (
        <div>
            <Header/>
            <h1> PROFILE </h1>
          <div>
            Login in as: <strong>{this.state.user.email}</strong>
          </div>
          <div>
            <button onClick={() => auth().signOut()}>Logout</button>
          </div>
        </div>
    );
  }
}
