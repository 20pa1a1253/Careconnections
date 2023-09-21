const firebaseConfig = require('./dbconfig');
const serviceAccount = require('../key.json');
const firebaseAdmin = require('firebase-admin');
const { initializeApp } = require("firebase/app");
//const auth = firebase.auth()
const { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,signOut,getIdToken,verifyIdToken,onAuthStateChanged}=require("firebase/auth") ;
const { getFirestore, QuerySnapshot } = require("firebase/firestore");


const { doc, updateDoc, deleteField, setDoc, getDoc, } = require("firebase/firestore");
const functions = require('firebase-functions');
const { cert } = require("firebase-admin/app");

const admin = require('firebase-admin');

const app1 = initializeApp(firebaseConfig);
const auth = getAuth();

//const analytics = getAnalytics(app1);
//console.log(app1);


// Initialize Firebase app
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

module.exports = {
    admin, // If you need to use other Firebase services
    db,
    auth,
    createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,signOut,getIdToken,verifyIdToken,onAuthStateChanged,
    getFirestore, QuerySnapshot,initializeApp,
    doc, updateDoc, deleteField, setDoc,doc, getDoc,
     // Export the Firestore database reference
  };