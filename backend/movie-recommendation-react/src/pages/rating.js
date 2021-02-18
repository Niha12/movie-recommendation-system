import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import firebase from "firebase";
import { auth } from "../services/firebase";

const SimpleRating = (props) => {
    //
    let uuid = auth().currentUser.uid;
    let docRef = firebase.firestore().collection("Users")
        .doc(uuid).collection("Ratings")
    const [value,setValue] = React.useState('')

//     const [userDetails, setUserDetails] = useState('')
//          db.collection('users').doc(id).get()
//         .then(snapshot => setUserDetails(snapshot.data()))
//    FOR VALUE ^^^

    docRef.where('name', "==", props.name).get().then(snapshot => {
        if (snapshot.empty) {
            setValue(0)
        } else {
            console.log("rating = " + snapshot.docs[0].data().rating)
            setValue(snapshot.docs[0].data().rating)
        }
    })


    function storeRating(newValue){
        const rating : Rating = {
            name: props.name,
            rating: newValue
        }

        docRef.where('name',"==", props.name).limit(1).get().then(snapshot => {
            if(snapshot.empty){
                // console.log("Nothing found")
                docRef.add(rating)
            }else{
                snapshot.docs[0].ref.update(rating)
            }
        })
    }

    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                name={props.name}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    storeRating(newValue)
                }}
                />
            </Box>
        </div>
    );
}

export default SimpleRating;