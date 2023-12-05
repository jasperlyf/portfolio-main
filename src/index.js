import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import firebase from 'firebase/app';
import 'firebase/database'; // Import the services you plan to use (e.g., Realtime Database)

const firebaseConfig = {
  apiKey: "AIzaSyCBXxyAoz6Pk-cxV9K4fxIYUT8hQiqPzV8",
  authDomain: "portfolio-main-380d9.firebaseapp.com",
  projectId: "portfolio-main-380d9",
  storageBucket: "portfolio-main-380d9.appspot.com",
  messagingSenderId: "631027255971",
  appId: "1:631027255971:web:218c40c46b43258e9a0d16",
  measurementId: "G-CMH04LC8PW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);


//firebase deploy