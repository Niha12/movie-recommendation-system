import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {signup, verifyAccount} from '../services/auth';

export default class SignUp extends Component {

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
      await signup(this.state.email, this.state.password);
      await verifyAccount()
      fetch('/backend/auth/register/', {
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
            this.setState({
              logged_in: true,
              displayed_form: '',
              username: json.username
            });
      });

    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div style={{height:"100vh",backgroundColor:"#52ab98", margin:0, width:"100%"}}>
        <div style={ {display:"flex", alignItems:"center", flexDirection:"column"}}>
          <form className="py-5 px-5" style={{marginTop:"40px", backgroundColor:"#95cec3"}} autoComplete="off" onSubmit={this.handleSubmit}>
            <h1>
              Sign Up to <Link className="title" to="/">MovieRec</Link>
            </h1>
            <p className="lead">Fill in the form below to create an account.</p>
            <div className="form-group" style={{width:"370px"}}>
              <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}/>
            </div>
            <div className="form-group" style={{width:"370px"}}>
              <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"/>
            </div>
            <div className="form-group">
              {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
              <button className="btn btn-primary rounded-pill px-5">Sign up</button>
            </div>
            <hr/>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    )
  }
}
