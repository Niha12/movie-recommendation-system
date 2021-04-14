import React, {Component} from "react";
import {auth} from "../services/firebase";
import firebase from "firebase";
import Header from "../components/header";


export default class FriendsPage extends Component {
    constructor() {
        super();
        this.state = {
        	what:"",
          	user: auth().currentUser,
			error:"",
			friends:[],
			friendRequests:[],
			accepted:false
        };
        this.docRefUsers = firebase.firestore().collection("Users")
		this.docRef = this.docRefUsers.doc(this.state.user.uid)

    }


	async componentDidMount() {
    	let localFriendsEmails = []
		await this.docRef.collection("Friends").get().then(snapshot =>{
			snapshot.forEach(doc =>{
				if(doc.data().accepted){
					localFriendsEmails.push(doc.data().email)
				}

			})


		})
		await this.setState({friends:localFriendsEmails})

    	let localFriendRequestEmails = []
		await this.docRef.collection("FriendRequests").get().then(snapshot =>{
			snapshot.forEach(doc =>{
				localFriendRequestEmails.push(doc.data().email)
			})
		})

		await this.setState({friendRequests:localFriendRequestEmails})

	}


	handleAdd = async (event) => {
		event.preventDefault();
		const email = event.target.friendEmail.value;
		let validEmail = false;
		let added = false;
		let size = ""
		if (email !== ""){

			await this.docRef.collection("Friends").get().then(value=> {
				size = value.size
			})
			
			if(size < 5){
				await this.docRefUsers.where('email','==',email).limit(1).get().then(snapshot => {
						if (!snapshot.empty) {
							validEmail = true;
						}
					}
				)
	
				if (validEmail){
					await this.docRef.collection("Friends").where('email','==',email)
						.limit(1).get().then(snapshot =>{
							if(snapshot.empty){
								added = true;
								this.docRef.collection("Friends").add({email:email,accepted:false})
							}else{
								if(snapshot.docs[0].data().accepted === true){
									this.setState({error:"friend-already-exists"})
								}else{
									this.setState({error:"friend-request-already-sent"})
								}
							}
						})
					if (added){

						let id = ""
						await this.docRefUsers.where('email','==', email).get().then(snapshot =>{
							snapshot.forEach(function(doc) {
								console.log(doc.id)
								id = doc.id

							})
						})
						await this.docRefUsers.doc(id).collection("FriendRequests").add({email:this.state.user.email,accepted:false})
						alert("Friend added")
					}
				}else{
					this.setState({error:"email-not-exist"})
				}
			}else{
				this.setState({error:"5-friends-already"})
			}
    	}
		
    	event.target.reset()
	}


	async friendRequest(user) {

		let id = ""
		await this.docRefUsers.where('email', '==', user).get().then(snapshot => {
			snapshot.forEach(function (doc) {
				console.log(doc.id)
				id = doc.id

			})
		})

		await this.docRefUsers.doc(id).collection("Friends").where('email','==',this.state.user.email).limit(1).get().then(value => {
			if(!value.empty){
				value.docs[0].ref.update({accepted:true})
			}
		})

		await this.docRef.collection("FriendRequests").where('email','==',user).limit(1).get().then(value => {
			value.docs[0].ref.delete()
		})

		await this.docRef.collection("Friends").add({email:user,accepted:true})

		window.location.reload()


	}


	async declineRequest(user) {
    	console.log("in Delete")
    	console.log(user)
		await this.docRef.collection("FriendRequests").where('email', '==', user).limit(1).get().then(function(querySnapshot) {
          const promises = [];
          querySnapshot.forEach(function(doc) {
            promises.push(doc.ref.delete());
          })
          return Promise.all(promises);
        })
        .then(() => {
          window.location.reload()
        })

	}

    render() {

        return(
            <div >
                <Header/>
                <h1 className="heading">Add Friend</h1>
                <div style={{alignContent:"center",alignItems:"center"}}>
                    <form onSubmit={this.handleAdd} style={{marginLeft:"10px"}}>
                        <div className="form-group col-md-6">
							<label htmlFor="firstname">Add Friend with email address</label>
                            {
                                this.state.error === "friend-already-exists"?
                                    <p className="text-danger">Email address already exists in friends list</p>:
									this.state.error === "email-not-exist"?
									<p className="text-danger">Email address does not exist</p>
                                    :this.state.error ==="friend-request-already-sent"?
										<p className="text-danger">Friend request already sent to this email</p>:
										this.state.error === "5-friends-already"?
										<p className="text-danger">Cannot add more than 5 friends</p>:null
                            }
                            <div style={{ display:"flex", flexDirection: "row"}}>
                                <input type="text" id="friendEmail" className="form-control" placeholder="Enter email address"/>
                                <button type="submit" className="btn btn-primary" id="add" style={{marginLeft:"35px"}}>Add</button>
                            </div>
                        </div>

                    </form>
                    <div className="column1-settings" style={{marginTop:"20px"}}>
                        <h1 className="heading">Your Friends</h1>
						{
							this.state.friends.length === 0?<p style={{fontFamily:"sans-serif",fontSize:"18px", marginLeft:"10px"}}>No Friends Added</p>:null
						}
						<ul>
                        {
                            this.state.friends.map((val)=>(

                                <li style={{fontFamily:"sans-serif",fontSize:"18px", marginLeft:"10px"}}>{val}</li>

                            ))
                        }
                        </ul>

                    </div>
                    <div className="column2-settings" style={{marginTop:"20px"}} >
                        <h1 className="heading">Friend Requests</h1>
						{
							this.state.friendRequests.length === 0?<p style={{fontFamily:"sans-serif",fontSize:"18px", marginLeft:"10px"}}>No Friend Requests</p>:null
						}
						<ul>
                        {
                            this.state.friendRequests.map((val)=>(

                                <li style={{fontFamily:"sans-serif",fontSize:"18px", marginLeft:"10px"}}>{val}<button style={{marginLeft:10, backgroundColor:"#0a7756", color:"white"}} onClick={()=>this.friendRequest(val)}>Accept</button><button style={{marginLeft:10, backgroundColor:"#bc0a0a",color:"white"}} onClick={()=>this.declineRequest(val)}>Decline</button></li>

                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


}