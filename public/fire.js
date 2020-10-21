const firebaseConfig = {
    apiKey: "AIzaSyARQZucohoQNzjycGCqLqkiD394DDw7LQM",
    authDomain: "amazot-9965f.firebaseapp.com",
    databaseURL: "https://amazot-9965f.firebaseio.com",
    projectId: "amazot-9965f",
    storageBucket: "amazot-9965f.appspot.com",
    messagingSenderId: "147476909891",
    appId: "1:147476909891:web:93ed7a9dec03acca02a9f6",
    measurementId: "G-F336ZDDH3C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase services references
const db = firebase.firestore(); // cloud firestore
const storage = firebase.storage(); // google cloud storage
const functions = firebase.functions(); // firebase functions