import React, { Component } from "react";
import { auth } from "../services/firebase";
import Header from "../components/header";
import firebase from "firebase";
import {deleteUser, isVerified} from '../services/auth';
import Footer from "../components/footer";

export default class Settings extends Component {
    constructor() {
        super();
        this.state = {
          	user: auth().currentUser,
			error:"",
			friends:[],
			friendRequests:[],
			accepted:false,

        };
        this.docRefUsers = firebase.firestore().collection("Users")
		this.docRef = this.docRefUsers.doc(this.state.user.uid)

    }

    handleSubmit = async (event) => {
		event.preventDefault();
			const currentPass = event.target.oldpassword.value
			const emailCred = auth.EmailAuthProvider.credential(
				this.state.user.email, currentPass);
			const newPass = event.target.newpassword.value
			const newPass1 = event.target.newpassword2.value

			if(currentPass !== ""){
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
			}else{
				this.setState({error:"empty-current-password"})
			}

			const firstname = event.target.firstname.value
			const lastname = event.target.lastname.value
			if (firstname !== "" || lastname !== ""){

				await this.docRef.get().then(snapshot => {
					if (snapshot.data().Firstname){
						this.docRef.update("Firstname",firstname)
					}else{
						this.docRef.set({Firstname: firstname},{merge:true})
					}

					if (snapshot.data().Lastname){
						this.docRef.update("Lastname" ,lastname)
					}else{
						this.docRef.set({Lastname: lastname},{merge:true})
					}

				}

				)
			}
		event.target.reset()
	}

    render(){
        return(
			<div style={{overflow:"hidden"}}>
				<Header/>
				<h1 className="heading"> Edit Profile Settings </h1>
				<div className="column1-settings" style={{alignContent:"center"}}>
					<form onSubmit={this.handleSubmit} style={{marginLeft:"10px"}}>
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
									<label htmlFor="oldpassword">Old Password</label>
									{
										this.state.error === "wrong-password"  ? <p className="text-danger">Wrong password provided</p> :
										this.state.error === "empty-current-password" ? <p className="text-danger">Please enter your current password to make password changes</p>
											:null

									}
									<input type="password" className="form-control" id="oldpassword"/>
								</div>
								<div className="form-group">
									<label htmlFor="newpassword">New Password</label>
									{
										this.state.error === "weak-password" ? <p className="text-danger">New password must be atleast 6 letters long</p>
											:
											null
									}

									<input type="password" className="form-control" id="newpassword"/>
								</div>
								<div className="form-group">
									<label htmlFor="newpassword2">Confirm Password</label>
									{
										this.state.error === "wrong-new-password" ? <p className="text-danger" >Confirm password does not match</p>
											: null
									}

									<input type="password" className="form-control" id="newpassword2"/>
								</div>
							</div>
							<div className="col-md-6">
								<p className="mb-2">Password requirements</p>
								<p className="small text-muted mb-2">To create a new password, you have to meet all
									of the following requirements:</p>
								<ul className="small text-muted pl-4 mb-0">
									<li>Minimum 6 character</li>
									<li>Can’t be the same as a previous password</li>
									<li>You do not need to supply first name and last name information to update password</li>

								</ul>
							</div>
						</div>
						<div style={{ display:"flex", flexDirection: "row"}}>
							<button type="submit" className="btn btn-primary" name="save">Save Changes</button>
							<button onClick={()=>this.deleteAccount()} type="delete" className="btn btn-primary" name="delete" style={{backgroundColor:"red", marginLeft:"30px"}}>Delete Account</button>
							{
								isVerified() ? <i className="fa fa-user" style={{marginLeft:"30px", marginTop:"7px"}}>You are a verified account</i>:null
							}

						</div>
					</form>
				</div>
				<Footer/>
			</div>
        )
    }

	async deleteAccount() {
    	if (window.confirm('Are you sure you want to delete your account?')) {
			await this.docRef.delete()
			try{
				await deleteUser();

			}catch(err){
				this.setState({error:err.message})
			}
		}else{
    		this.setState({error:""})
		}
	}
}