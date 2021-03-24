import React, {Component} from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import firebase from "firebase";
import { auth } from "../services/firebase";

export default class SimpleRating extends Component {
    constructor(props) {
        super(props)
        this.state =
        {
            name: props.name,
            uuid : auth().currentUser.uid,
            rating:0,
            year: props.year

        }
        this.docRef =firebase.firestore().collection("Users")
                .doc(this.state.uuid).collection("Ratings")


    }


    setValue(value){
        this.setState({rating:value})
    }


    storeRating(newValue){
        let today = new Date().toISOString().slice(0,10)
        console.log(today)
        const rating : Rating = {
            name: this.state.name,
            release:this.state.year,
            rating: newValue,
            date:today
        }

        if (newValue === null){
             this.docRef.where('name', "==", this.state.name).limit(1).get().then(snapshot => {
                    snapshot.docs[0].ref.delete()
            })
        }else {
            this.docRef.where('name', "==", this.state.name).limit(1).get().then(snapshot => {
                if (snapshot.empty) {
                    this.docRef.add(rating)
                } else {
                    snapshot.docs[0].ref.update(rating)
                }
            })


            // let values =[this.state.uuid,this.state.name,newValue]
            // let bakendUrl = "/backend"
            // let backendAPIToken = "Token " + localStorage.getItem("token")
            //
            // fetch(bakendUrl + "/suggestions", {
            //     method: 'POST',
            //     headers: {
            //         'content-Type': 'application/json',
            //         'Authorization': backendAPIToken
            //     },
            //     body: JSON.stringify({'values':values,'isUpdate':"true"})
            // }).catch(err => console.error(err))
        }

    }

    componentWillMount() {
        this.docRef.where('name', "==", this.state.name).get().then(snapshot => {
        if (snapshot.empty) {
            this.setValue(0)
        } else {
            this.setValue(snapshot.docs[0].data().rating)
        }
    })
    }

    render() {
        return (
        <div style={{marginBottom:"-30px"}} onChange={this.props.onChange}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                name={this.state.name}
                value={this.state.rating}
                onChange={(event, newValue) => {
                    this.setValue(newValue)
                    this.storeRating(newValue)
                }}
                />
            </Box>
        </div>
    );
    }

}
