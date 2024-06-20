const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB2CiCuQUnPN1vzN5mzwQXo5iLwsuOX3Uc",
  authDomain: "cleanup-api-capstone.firebaseapp.com",
  projectId: "cleanup-api-capstone",
  storageBucket: "cleanup-api-capstone.appspot.com",
  messagingSenderId: "725432066005",
  appId: "1:725432066005:web:fc117c725c8747c474e75c",
  measurementId: "G-EH3MQFGKRG"
};
// Inisialisasi Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export Firestore instance
const db = firebase.firestore();
module.exports = db;
