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
            rating:0


        }
        this.docRef =firebase.firestore().collection("Users")
                .doc(this.state.uuid).collection("Ratings")


    }


    setValue(value){
        this.setState({rating:value})
    }


    storeRating(newValue){
        let today = new Date().toISOString().slice(0,10)
        const rating : Rating = {
            name: this.state.name,
            rating: newValue
        }

        this.docRef.where('name',"==", this.state.name).limit(1).get().then(snapshot => {
            if(snapshot.empty){
                console.log("Nothing found")
                this.docRef.add(rating)
            }else{
                snapshot.docs[0].ref.update(rating)
            }
        })

        let values =[this.state.uuid,this.state.name,newValue]
        let bakendUrl = "/backend"
        let backendAPIToken = "Token " + localStorage.getItem("token")

        fetch(bakendUrl + "/suggestions", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': backendAPIToken
            },
            body: JSON.stringify({'values':values,'isUpdate':"true"})
        })
            .catch(err => console.error(err))
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
        <div>
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
//
// const SimpleRating = (props) => {
//     //
//     // let uuid = auth().currentUser.uid
//     //         let docRef =firebase.firestore().collection("Users")
//     //             .doc(uuid).collection("Ratings")
//     // const [value, setValue] = React.useState('')
//
// //     const [userDetails, setUserDetails] = useState('')
// //          db.collection('users').doc(id).get()
// //         .then(snapshot => setUserDetails(snapshot.data()))
// //    FOR VALUE ^^^
//
//     docRef.where('name', "==", props.name).get().then(snapshot => {
//         if (snapshot.empty) {
//             setValue(0)
//         } else {
//             setValue(snapshot.docs[0].data().rating)
//         }
//
//
//     function storeRating(newValue){
//         const rating : Rating = {
//             name: props.name,
//             rating: newValue
//         }
//
//         docRef.where('name',"==", props.name).limit(1).get().then(snapshot => {
//             if(snapshot.empty){
//                 // console.log("Nothing found")
//                 docRef.add(rating)
//             }else{
//                 snapshot.docs[0].ref.update(rating)
//             }
//         })
//     }
//
//     return (
//         <div>
//             <Box component="fieldset" mb={3} borderColor="transparent">
//                 <Rating
//                 name={props.name}
//                 value={value}
//                 onChange={(event, newValue) => {
//                     setValue(newValue)
//                     storeRating(newValue)
//                 }}
//                 />
//             </Box>
//         </div>
//     );
// }

// export default SimpleRating;