import React, { Component } from 'react';
import {auth} from "../services/firebase";
import {Link} from "react-router-dom";
import HomePageHeader from "../components/homepage-header";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <section>
          <HomePageHeader/>
          <p>This is the homepage for a dissertation website. This website has been
            soley created for dissertation purposes. </p>
        </section>
      </div>
    )
  }
}
