const express = require("express");
const app=express();

const router = express.Router();
const { admin,db,auth,doc, getDoc, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp, getUIDByEmail } = require('../models/firebase');


const donor = async (req, res) => {
    const email = req.params.useremail;
    const documentId = req.sessionData.documentId;
  
    try {
      const docRef = await db.collection("users").doc(documentId).get();
      const dons=await db.collection("Donations").doc(documentId).get();
      if (docRef.exists) {
        const donor = docRef.data();
        if(dons.exists){ 
          const donData= dons.data();
          console.log(donData);
          res.render("donorprofile",{user: donor, donations:donData });
        }
        console.log("not getting donations");
      
      } else {
        console.log("Document does not exist");
        res.render("Document doesn't exist");
      }
    }catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
		  res.send(`<script>alert('${errorMessage}'); window.history.go(-1);</script>`);
      
    }
  };
  
  const org = async (req, res) => {
    const email=req.session.email;
    const documentId = req.sessionData.documentId;

    console.log(documentId);
  
    try {
      const docRef = await db.collection("users").doc(documentId).get();
      const needs=await db.collection("Needs").doc(documentId).get();
  
      if (docRef.exists) {
        const orgData = docRef.data();
        if(needs.exists){
          const needata= needs.data();
          console.log(needata)
          res.render("Profiles", { user: orgData, needs:needata });
        }
        console.log("not getting needs");
      
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