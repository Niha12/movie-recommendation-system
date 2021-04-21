import React, {Component} from "react";
import {auth} from "../services/firebase";
import firebase from "firebase";


export default class WatchLaterButton extends Component {
    constructor(props){
        super(props);
        this.state ={
            isDisabled:false,
            movie: props.movie,
            isWatchLater: props.isWatchLater,
            isDisabledRemove:false
        }
        let uuid = auth().currentUser.uid
        this.docRef =firebase.firestore().collection("Users")
                .doc(uuid).collection("WatchLater")
    }


    handleClick(e) {
        e.preventDefault();
        console.log(this.state.movie)

        this.docRef.add({name:this.state.movie})
        this.setState({isDisabled:true})
    }

    async componentDidMount() {
        await this.docRef.where('name', "==", this.state.movie).limit(1).get().then(snapshot => {
            this.setState({isDisabled: !snapshot.empty})
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if(this.props.movie !== prevProps.movie){
            await this.setState({movie: this.props.movie})
            this.componentDidMount()
        }

    }

    async handleClickRemove(event) {
        event.preventDefault();
        await this.docRef.where('name', "==", this.state.movie).limit(1).get().then(snapshot => {
            snapshot.docs[0].ref.delete()
        })
        this.setState({isDisabledRemove:true})
    }

    render(){
        return(
            <div>
                {
                    this.state.isWatchLater === true?
                        <button className="watch-later-button" onClick={(event)=>this.handleClickRemove(event)} disabled={this.state.isDisabledRemove}>Remove movie</button>
                        :
                        <button  className="watch-later-button" onClick={(e)=>this.handleClick(e)} disabled={this.state.isDisabled}>Watch Later</button>


                }
            </div>
        )

    }
}