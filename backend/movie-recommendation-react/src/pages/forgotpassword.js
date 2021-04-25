import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/auth';

// Handles the request when a user forgets their password
export default class ForgotPassword extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Send an email to the user to reset password
  async handleSubmit(event) {
      this.setState({ error: '' });
      event.preventDefault();
      try{
          await forgotPassword(this.state.email)
          console.log("email sent")
      }catch(error) {
          this.setState({error: error.message});
      }
  }

  render() {
    return (
      <div style={{height:"100vh",backgroundColor:"#52ab98", margin:0, alignContent:"center"}}>
        <div style={ {display:"flex", alignItems:"center", flexDirection:"column"}}>
          <form className="py-5 px-5" style={{marginTop:"40px", backgroundColor:"#95cec3"}} autoComplete="off" onSubmit={this.handleSubmit}>
            <h1>Forgot Password?</h1>
            <p className="lead">Enter the email associated with your account</p>
            <div className="form-group" style={{width:"370px"}}>
              <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}/>
            </div>
            <div className="form-group">
              {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
              <button className="btn btn-primary rounded-pill px-5">Send Email</button>
            </div>
            <hr/>
            <p>Already have an account? <Link to="/login">Login</Link></p>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </form>
        </div>
      </div>
    )
  }
}
