import { auth } from './firebase';
import firebase from "firebase";

export function signup(email, password, dob, address) {
  return auth().createUserWithEmailAndPassword(email, password).
      then(function (user) {

          firebase.firestore().collection('Users').doc(user.user.uid).set({email : email})
          console.log("uuid: " + user.user.uid)
      } )
}

export function verifyAccount(){
    let verified = auth().currentUser.emailVerified
    console.log(verified)
    if (!verified){
        return auth().currentUser.sendEmailVerification().then(function(){
                  alert('Email has been sent to ' + auth().currentUser.email + 'for verification')
              })
    }
}

export function isVerified(){
    return auth().currentUser.emailVerified
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth().signOut()
}

export function deleteUser() {
    return auth().currentUser.delete()
}

export function forgotPassword(Email){
    return auth().sendPasswordResetEmail(Email)
          .then(function (user) {
            alert('Email has been sent to ' + user)
          })
}