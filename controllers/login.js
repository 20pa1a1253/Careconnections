const express = require("express");
const app=express();

const router = express.Router();
const { admin,db,auth, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp } = require('../models/firebase');

// router.use('/firebase', firebase);

const login= async function (req, res) {
	const email = req.body.email;
	const password = req.body.pwd;
	const role = req.body.role;
	const documentId=email;
	  const userCredential = await signInWithEmailAndPassword(auth, email, password).then(()=>{
		if (role == "organiser") {
			const organisersSnapshot =  db.collection("Organisers").doc(email).get();

		 organisersSnapshot.then((doc) => {
			if (doc.exists) {
				const data = doc.data();
				console.log(data);
				  res.render("organ", { mark: data });
			} else {
			  const m = "Seems like you're not registered as an Organiser";
			  res.send(`<script>alert("${m}"); window.history.go(-1);</script>`);
			}})
		} else if (role == "donor") {
			const donorsSnapshot =  db.collection("donors").doc(documentId).get();
				donorsSnapshot.then((doc) => {
					if (doc.exists) {
						const datax = doc.data();
						console.log(datax);
						res.render("donor", { mark: datax });
					} else {
					  var m = "Seems like you're not registered as a Donor";
					  res.send(`<script>alert("${m}"); window.history.go(-1);</script>`);
					}
				  }).catch((error) => {
					console.error("Error getting donor documents:", error);
					// Handle the error appropriately, e.g., send an error response to the client
				  });
		} else {
			res.send("Invalid role");
		  }
	  })
	  .catch ((error)=>{
	  const errorMessage = error.message;
	  res.send(`<script>alert('${errorMessage}'); window.history.go(-1);</script>`);
	  console.log(errorMessage);
	})
}
 const signup=async function(req,res){
	const displayName=req.body.user;
	const email=req.body.email1;
	const password=req.body.pwd1;
	console.log(email);
	createUserWithEmailAndPassword(auth, email, password,displayName)
      .then((userCredential) => {
        // Registration successful
        // const user = userCredential.user;
        // console.log(user);
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