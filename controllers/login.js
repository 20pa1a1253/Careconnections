const express = require("express");
const app = express();

const router = express.Router();
const { admin, db, createUserWithEmailAndPassword, getIdToken, verifyIdToken, onAuthStateChanged, getFirestore, QuerySnapshot, initializeApp, getUIDByEmail } = require('../models/firebase');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const auth = getAuth();


// router.use('/firebase', firebase);

const login = async function (req, res) {

	const email = req.body.email;
	const password = req.body.pwd;
	const role = req.body.role;
	req.session.email = email;
	const documentId = await getUIDByEmail(email);
	req.session.documentId = documentId;
	const userCredential = await signInWithEmailAndPassword(auth, email, password).then(() => {
		// sessionStorage.setItem('userEmail', email);
		if (role.toLowerCase() === "organiser") {
			const organisersSnapshot = db.collection("users").doc(documentId).get();

			organisersSnapshot.then((doc) => {
				if (doc.exists) {
					const data = doc.data();
					if (data.Role.toLowerCase() === "organiser") {
						console.log(data);
						res.render("organ", { mark: data });
					}
				} else {
					res.render("landing");
				}
			})
		} else if (role.toLowerCase() === "donor") {
			const donorsSnapshot =  db.collection("users").doc(documentId).get();
			donorsSnapshot.then((doc) => {
				if (doc.exists) {
					const datax = doc.data();
					if (datax.Role.toLowerCase() === "donor") {
						console.log(datax);
						
						res.render("donor", { mark: datax });
					}

				} else {
					res.render("landing");
				}
			}).catch((error) => {
				console.error("Error getting donor documents:", error);
				// Handle the error appropriately, e.g., send an error response to the client
			});
		} else {
			res.send("Invalid role");
		}
	})
		.catch((error) => {
			const errorMessage = error.message;
			res.send(`<script>alert('${errorMessage}'); window.history.go(-1);</script>`);
			console.log(errorMessage);
		})
}
const createUserDocument = async (userId, email, fullName) => {
	const userDoc = {
		userId,
		email,
		fullName,
		profilePicture: '',
		createdAt: admin.firestore.FieldValue.serverTimestamp(),
		phoneNumber: '',
		notificationPreferences: {
			emailNotifications: true,
			smsNotifications: false
		},
		Role: '',
		chatIds: []
	};

	try {
		await db.collection('users').doc(userId).set(userDoc);
		console.log(`User document created for userId: ${userId}`);
	} catch (error) {
		console.error('Error creating user document:', error);
	}
};
const signup = async function (req, res) {
	const displayName = req.body.user;
	const email = req.body.email1;
	const password = req.body.pwd1;
	req.session.email = email;
	console.log(req.session.email);
	createUserWithEmailAndPassword(auth, email, password, displayName)
		.then((userCredential) => {
			const documentId = userCredential.user.uid;
			req.session.documentId = documentId;
			const mark = email;

			createUserDocument(documentId, email, displayName);
			res.render('landing');
		})
		.catch((error) => {
			// Registration failed
			const errorCode = error.code;
			const errorMessage = error.message;
			res.send(`<script>alert('${errorMessage}'); window.history.go(-1);</script>`);
			//res.(errorMessage);
		});
};
module.exports = {
	login,
	signup
}