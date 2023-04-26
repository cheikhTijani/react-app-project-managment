import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_api_key,
    authDomain: "the-project-24a46.firebaseapp.com",
    projectId: "the-project-24a46",
    storageBucket: "the-project-24a46.appspot.com",
    messagingSenderId: "195694398055",
    appId: "1:195694398055:web:81a5b957ace85620e822c2"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }
