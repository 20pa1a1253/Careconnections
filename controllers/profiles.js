const express = require("express");
const app=express();

const router = express.Router();
const { admin,db,auth,doc, getDoc, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp } = require('../models/firebase');


const donor = async (req, res) => {
    const userId = req.params.useremail;
    console.log(userId);
  
    try {
      const querySnapshot = await db.collection("donors")
        .where("email", "==", userId)
        .get();
      if (!querySnapshot.empty) {
        const donorsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          donorsData.push(data);
        });
        console.log(donorsData);
        res.render("donorprofile", { user: donorsData });
      } else {
        var m = "Seems like you're not registered as a Donor";
		res.send(`<script>alert("${m}"); window.history.go(-1);</script>`);
      }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
		res.send(`<script>alert('${errorMessage}'); window.history.go(-1);</script>`);
      
    }
  };
  
  const org = async (req, res) => {
    const documentId = req.params.email;
    console.log(documentId);
  
    try {
      const docRef = db.collection("Organisers").doc(documentId);
      const docSnapshot = await docRef.get();
  
      if (docSnapshot.exists) {
        const orgData = docSnapshot.data();
        console.log(orgData);
        res.render("orgprofile", { user: orgData });
      } else {
        console.log("Document does not exist");
        res.render("Document doesn't exist");
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
      // Handle the error appropriately
      // For example, render an error page or return an error response
    }
  };
  module.exports = {
	donor,
	org
}