import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDO0HEKXqukrI82wwLNvYnCp8WK9SBJ0jE",
    authDomain: "pokemontodo-842e0.firebaseapp.com",
    databaseURL: "https://pokemontodo-842e0.firebaseio.com",
    projectId: "pokemontodo-842e0",
    storageBucket: "pokemontodo-842e0.appspot.com",
    messagingSenderId: "48780203295",
    appId: "1:48780203295:web:7fc13011d0521237870c2a",
    measurementId: "G-8YVT6KPZ95"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  //firebase.analytics();

  export default firebase;