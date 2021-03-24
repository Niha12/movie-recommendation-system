import React, { Component } from 'react';
import HomePageHeader from "../components/homepage-header";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <section>
          <HomePageHeader/>
          <p>This is the homepage for a dissertation website.</p>
        </section>
      </div>
    )
  }
}
