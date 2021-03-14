import React, {Component} from "react";
import {auth} from "../services/firebase";
import firebase from "firebase";


export default class WatchLaterButton extends Component {
    constructor(props){
        super(props);
        this.state ={
            isDisabled:false,
            movie: props.movie
        }
        let uuid = auth().currentUser.uid
        this.docRef =firebase.firestore().collection("Users")
                .doc(uuid).collection("WatchLater")
    }


    handleClick(e) {
        e.preventDefault();
        console.log(this.state.movie)
        // docRef.where('name',"==", this.state.name).limit(1).get().then(snapshot => {
        //     if (snapshot.empty) {
        //         this.docRef.add({
        //             name:id
        //         })
        //     }
        // })

        this.docRef.add({name:this.state.movie})
        this.setState({isDisabled:true})
    }

    async componentWillMount() {
        console.log("In Watch Later method")

        await this.docRef.where('name', "==", this.state.movie).limit(1).get().then(snapshot => {
            if (!snapshot.empty) {
                console.log("snapshot:")
                console.log(snapshot.docs[0].data())
            }
            this.setState({isDisabled: !snapshot.empty})
        })
    }

    render(){
        return(
            <div>
                <button className="btn btn-primary" onClick={(e)=>this.handleClick(e)} disabled={this.state.isDisabled}>Watch Later</button>
            </div>
        )

    }
}