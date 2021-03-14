import React, { Component } from "react";
import { auth } from "../services/firebase";


export default class Settings extends Component {
    constructor() {
        super();
        this.state = {
          	user: auth().currentUser,
			error:""
        };


    }

    handleSubmit = async (event) => {
		event.preventDefault();
		console.log(event.target.firstname.value)

		const currentPass = event.target.oldpassword.value
		const emailCred = auth.EmailAuthProvider.credential(
			this.state.user.email, currentPass);
		const newPass = event.target.newpassword.value
		const newPass1 = event.target.newpassword2.value

		if (newPass === newPass1) {
			await this.state.user.reauthenticateWithCredential(emailCred)
				.then(() => {
					return this.state.user.updatePassword(newPass)
				}).catch(e => {
					console.log(e)
					if(e.code === "auth/wrong-password"){
						this.setState({error:"wrong-password"})
					}else if (e.code === "auth/weak-password"){
						this.setState({error:"weak-password"})
					}

				}
			)
		}else{
			this.setState({error:"wrong-new-password"})
		}

		event.target.reset()

	}

    render(){
        return(
            <div className="row justify-content-center">
				<div className="col-12 col-lg-10 col-xl-8 mx-auto">
					<h2 className="h3 mb-4 page-title">Edit Profile Settings</h2>
					<div className="my-4">
						<form onSubmit={this.handleSubmit}>
							<hr className="my-4"/>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="firstname">Firstname</label>
									<input type="text" id="firstname" className="form-control" placeholder="Brown"/>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="lastname">Lastname</label>
									<input type="text" id="lastname" className="form-control" placeholder="Asher"/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="inputEmail4">Email</label>
								<input type="email" className="form-control" id="inputEmail4"
									   value={this.state.user.email}/>
							</div>
							<hr className="my-4"/>
							<div className="row mb-4">
								<div className="col-md-6">
									<div className="form-group">
										{
											this.state.error === "wrong-password" ?
												<label htmlFor="oldpassword">Old Password *Wrong password provided*</label>
												:
												<label htmlFor="oldpassword">Old Password</label>

										}

										<input type="password" className="form-control" id="oldpassword"/>
									</div>
									<div className="form-group">
										{
											this.state.error === "weak-password" ?
												<label htmlFor="newpassword">New Password *new password must be atleast 6 letters long*</label>
												:
												<label htmlFor="newpassword">New Password</label>

										}

										<input type="password" className="form-control" id="newpassword"/>
									</div>
									<div className="form-group">
										<label htmlFor="newpassword2">Confirm Password</label>
										<input type="password" className="form-control" id="newpassword2"/>
									</div>
								</div>
								<div className="col-md-6">
									<p className="mb-2">Password requirements</p>
									<p className="small text-muted mb-2">To create a new password, you have to meet all
										of the following requirements:</p>
									<ul className="small text-muted pl-4 mb-0">
										<li>Minimum 8 character</li>
										<li>Can’t be the same as a previous password</li>
									</ul>
								</div>
							</div>
							<button type="submit" className="btn btn-primary" >Save Changes</button>
						</form>
					</div>
				</div>
			</div>
        )
    }
}