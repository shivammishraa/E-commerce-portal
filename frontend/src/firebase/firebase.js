import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDfdI9TY9Oz_wAfA8lHcklfKFyUnMzkfKw",
  authDomain: "fir-e-commerce-487a4.firebaseapp.com",
  projectId: "fir-e-commerce-487a4",
  storageBucket: "fir-e-commerce-487a4.appspot.com",
  messagingSenderId: "1083904366386",
  appId: "1:1083904366386:web:b60f4bd790b0fa5913692b",
  measurementId: "G-CVVW6MYJK0",
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
//const app = firebase.initializeApp(firebaseConfig);
//const storage = firebase.storage(app);
export default storage
