import firebase from 'firebase/app'
import 'firebase/firestore'

 var firebaseConfig = {
    apiKey: "AIzaSyAQq9bVluZFUIS1IEEj7hUFLy33J_PAf8U",
    authDomain: "message-generation.firebaseapp.com",
    projectId: "message-generation",
    storageBucket: "message-generation.appspot.com",
    messagingSenderId: "738944498366",
    appId: "1:738944498366:web:70b531d68d63aaafe57cef"
  };
  // Initialize Firebase
  const fb =firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();