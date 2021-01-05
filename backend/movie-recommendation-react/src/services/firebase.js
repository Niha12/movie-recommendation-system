import firebase from "firebase";
const config = {
    apiKey: "AIzaSyDWfKTkgNuewUYirFBw4qbSa9XLaP6zal4",
    authDomain: "movie-recommender-49dcc.firebaseapp.com",
    projectId: "movie-recommender-49dcc",
    storageBucket: "movie-recommender-49dcc.appspot.com",
    messagingSenderId: "589498115120",
    appId: "1:589498115120:web:9e7be6f94b0134d20a39f5",
    measurementId: "G-Y810RZL0R1"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
