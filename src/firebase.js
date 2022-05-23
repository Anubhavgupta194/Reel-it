import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDat-RYj2SUEdu4js8gcxXVJDZ4jxsYsJQ",
    authDomain: "reels-demo-cf90f.firebaseapp.com",
    projectId: "reels-demo-cf90f",
    storageBucket: "reels-demo-cf90f.appspot.com",
    messagingSenderId: "694384648697",
    appId: "1:694384648697:web:ee66f6ec11802c19e49d28"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
    users : firestore.collection('users'),   //ask meaning of this
    Posts:   firestore.collection('Posts'),
    comments:firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp,
}

export const storage = firebase.storage()