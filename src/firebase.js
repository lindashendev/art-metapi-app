// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF1ZXm8h-L_rUoezl4IsTPRqL9vZKVtsg",
  authDomain: "met-art-project.firebaseapp.com",
  databaseURL: "https://met-art-project-default-rtdb.firebaseio.com",
  projectId: "met-art-project",
  storageBucket: "met-art-project.appspot.com",
  messagingSenderId: "1089607066506",
  appId: "1:1089607066506:web:fc01fd43d688d53c00de73",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;