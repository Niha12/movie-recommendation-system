import React, { Component } from "react";
import { auth} from "../services/firebase";
import Header from "../components/header";
import Settings from "./settings"
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
            <Settings/>
		</div>
    );
  }
}
