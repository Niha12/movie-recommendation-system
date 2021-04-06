import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../services/auth';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signin(this.state.email, this.state.password);
        fetch('/backend/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                          "username": this.state.email,
                          "password": this.state.password
                      })
      })
        .then(res => res.json())
        .then(json => {
          localStorage.setItem('token', json.token);
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div style={{height:"100vh",backgroundColor:"#52ab98", margin:0, alignContent:"center"}}>
        <div>
          <form className="py-5 px-5" autoComplete="off" onSubmit={this.handleSubmit}>
            <h1>Login to <Link className="title" to="/">MovieRec</Link></h1>
            <p className="lead">Fill in the form below to login to your account.</p>
            <div className="form-group" style={{width:"370px"}}>
              <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}/>
            </div>
            <div className="form-group" style={{width:"370px"}}>
              <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"/>
            </div>
            <div className="form-group">
              {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
              <button className="btn btn-primary rounded-pill px-5">Login</button>
            </div>
            <hr/>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <p><Link to="/forgotpassword">Forgot Password?</Link></p>
          </form>
        </div>
      </div>
    )
  }
}
