// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE-sND1tqCYVFi0_4cmzJ5AVm_llFRIYc",
  authDomain: "donewithit-4fbd5.firebaseapp.com",
  projectId: "donewithit-4fbd5",
  storageBucket: "donewithit-4fbd5.appspot.com",
  messagingSenderId: "59133162819",
  appId: "1:59133162819:web:dcd21f3c8704c780366bf6",
  measurementId: "G-Z9JYXTMMTB",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;
