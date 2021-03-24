import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/home';
import Main from './pages/main';
import Signup from './pages/signup';
import Login from './pages/login';
import { auth } from './services/firebase';
import MovieDetails from "./pages/moviedetails";
import Recommendations from "./pages/recommendations";
import WatchLater from "./pages/watchlater";
import Genres from "./pages/genres";
import Settings from "./pages/settings";
import RatingCharts from "./pages/ratingcharts";
import MoviesRated from "./pages/ratedmovies";
import CastMovies from "./pages/castmovies";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/main' />}
    />
  )
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <PrivateRoute path="/main" authenticated={this.state.authenticated} component={Main}/>
          <PrivateRoute path="/profile/settings" authenticated={this.state.authenticated} component={Settings}/>
          <PrivateRoute path="/profile/ratings" authenticated={this.state.authenticated} component={RatingCharts}/>
          <PrivateRoute path="/movie_details" authenticated={this.state.authenticated} component={MovieDetails}/>
          <PrivateRoute path="/cast" authenticated={this.state.authenticated} component={CastMovies}/>
          <PrivateRoute path="/recommendations" authenticated={this.state.authenticated} component={Recommendations}/>
          <PrivateRoute path="/watchlater" authenticated={this.state.authenticated} component={WatchLater}/>
          <PrivateRoute path="/ratedmovies" authenticated={this.state.authenticated} component={MoviesRated}/>
          <PrivateRoute path="/genres" authenticated={this.state.authenticated} component={Genres}/>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}/>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
