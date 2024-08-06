const express = require("express");
const { uploadFile } = require("../models/filemodel");
const app=express();

const router = express.Router();
const {updateDocument,createDocument}=require('../models/usermodel');
const { admin,db,auth,doc, getDoc, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp,getUIDByEmail } = require('../models/firebase');
const { collection } = require("firebase/firestore");
const { re } = require("mathjs");
const dregister = async (req, res) => {
	try {
	  const { pan, adhar, tel, pin, add } = req.body;
	  const userEmail = req.sessionData.email;
  
	  console.log(`User email: ${userEmail}`);
  
	  // Get user document ID by email
	  const documentId = req.sessionData.documentId;  // Ensure this is awaited
	  if (!documentId) {
		throw new Error("User not found");
	  }
  
	  console.log(`Document ID: ${documentId}`);
  
	  // Fetch user's full name
	  const userDoc = await db.collection("users").doc(documentId).get();
	  if (!userDoc.exists) {
		throw new Error("User document not found");
	  }
	  const fullName = userDoc.data().fullName;
  
	  // Update user document
	  const updates = {
		phoneNumber: tel,
		AdharNumber: adhar,
		PANCARD_NUMBER: pan,
		Pincode: pin,
		address: add,
		Role: "Donor"
	  };
	  const donationData = {
		userId: documentId,
		food: [],
		clothes: [],
		groceries:[],
		others: []
	  }; 
	  console.log("The document ID before userDoc update: " + documentId);
  
	  await updateDocument("users", documentId, updates);
	  console.log("The document ID is: " + documentId);
  
	  await createDocument("Donations", documentId, donationData);
	  console.log("Donation document created");
  
	  res.render("donor", { mark: { donar: fullName, email: userEmail }, marks: { donar: fullName, email: userEmail } });
	} catch (error) {
	  console.error("Error during donor registration:", error);
	  res.status(500).send("An error occurred during donor registration. Please try again.");
	}
  };
  const oregister = async (req, res) => {
	try {
	  const { orgname, orgtype, num1, num2, nop, pannumber, add, pin } = req.body;
	  const userEmail = req.sessionData.email;
	  const documentId = req.sessionData.documentId;  
	  const certFile = req.files['Certificate'] ? req.files['Certificate'][0] : null;
	  const vatFile = req.files['vat'] ? req.files['vat'][0] : null;
  
	  const fileUrls = await Promise.all([
		certFile ? uploadFile(certFile) : Promise.resolve(null),
		vatFile ? uploadFile(vatFile) : Promise.resolve(null)
	  ]);
  
	  const [certUrl, vatUrl] = fileUrls;
  
	  const updates = {
		organisationdata: {
		  organisationname: orgname,
		  organisationType: orgtype,
		  organisationnumber: num2,
		  No_of_people: nop,
		  Organisation_certificate: certUrl,
		  vat_certificate: vatUrl
		},
		fullName: orgname,
		phoneNumber: num1,
		PANCARD_NUMBER: pannumber,
		Pincode: pin,
		address: add,
		Role: "Organiser"
	  };
  
	  await updateDocument("users", documentId, updates);
	  await createDocument("Needs", documentId, { userId: documentId, food: [], clothes: [], others: [] });
  
	  res.render("organ", { mark: { organiser: orgname, email: userEmail } });
	} catch (error) {
	  console.error("Error during registration:", error);
	  res.status(500).send("An error occurred during registration. Please try again.");
	}
  };
module.exports = {
	dregister,
	oregister
}