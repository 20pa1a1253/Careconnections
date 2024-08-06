const firebaseConfig = require('./dbconfig');
const serviceAccount = require('../key.json');
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, getIdToken, verifyIdToken, onAuthStateChanged } = require("firebase/auth");
const firebaseAdmin = require('firebase-admin');

// Initialize Firebase client SDK
const app1 = initializeApp(firebaseConfig);
const auth = getAuth(app1);

// Initialize Firebase Admin SDK only once
if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        storageBucket: 'simpleweb-5f816.appspot.com' // Replace with your Firebase storage bucket name
    });
}

// Firestore and Storage references from Admin SDK
const db = firebaseAdmin.firestore();
const bucket = firebaseAdmin.storage().bucket();

// Helper function to get user ID by email
const getUIDByEmail = async (email) => {
    try {
        const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
        return userRecord.uid;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

module.exports = {
    admin: firebaseAdmin,
    db,
    auth,
    getUIDByEmail,
    createUserWithEmailAndPassword,
    bucket
};
