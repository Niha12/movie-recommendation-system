import { auth } from './firebase';
import firebase from "firebase";

// These are the functions to carry out the authentication

// Signing up a user
export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password).
      then(function (user) {
          firebase.firestore().collection('Users').doc(user.user.uid).set({email : email})
          console.log("uuid: " + user.user.uid)
      } )
}

// Sending an email to user and alerting them to look at their email
export function verifyAccount(){
    let verified = auth().currentUser.emailVerified
    console.log(verified)
    if (!verified){
        return auth().currentUser.sendEmailVerification().then(function(){
                  alert('Email has been sent to ' + auth().currentUser.email + ' for verification')
              })
    }
}

// Checks if user is verified
export function isVerified(){
    return auth().currentUser.emailVerified
}

// Logging in the user
export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

// Logging out the user
export function logout() {
  return auth().signOut()
}

// Deleting an account
export function deleteUser() {
    return auth().currentUser.delete()
}

// Send email to user to reset password
export function forgotPassword(Email){
    return auth().sendPasswordResetEmail(Email)
          .then(function (user) {
            alert('Email has been sent to ' + user)
          })
}