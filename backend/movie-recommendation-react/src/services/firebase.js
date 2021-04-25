import firebase from "firebase";

// Firebase API config
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "movie-recommender-49dcc.firebaseapp.com",
    projectId: "movie-recommender-49dcc",
    storageBucket: "movie-recommender-49dcc.appspot.com",
    messagingSenderId: "589498115120",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-Y810RZL0R1"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
