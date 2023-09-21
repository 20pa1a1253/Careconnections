const express = require("express");
const app=express();

const router = express.Router();
const { admin,db,auth,doc, getDoc, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp } = require('../models/firebase');
const dregister= async(req,res)=>{
	const fname=req.body.fname;
	const lname=req.body.lname;
	const phn=req.body.tel;
	const emailid = req.body.email;
	const pin = req.body.pin;
	const add= req.body.add;
	console.log(emailid);
	console.log(fname);
	var f=[];
    const collectionName = "donors";
	const documentId = emailid; // You can replace this with your desired document ID

	// Create a reference to the document
	const docRef = db.collection(collectionName).doc(documentId);
	
	const data ={
        donar: fname+" "+lname,
		email:emailid,
		pincode:pin,
		address:add,
		phonenum:phn,
    }
	const nam = data.donar;
    const useremail = data.email;

	docRef.set(data).then(()=>{
		f.push({"donar": fname,
		"email":emailid,
		"pincode":pin,
		"address":add,
		"phonenum":phn})
		console.log(f)
	    res.render("donor", { mark: { donar: nam, email: useremail }, marks: { donar: nam, email: useremail } });

	 })
     .catch((error) => {
		console.error("Error writing document: ", error);
		// Handle the error, e.g., send an error response to the client
		res.status(500).json({ error: "Error writing document" });
	  });

 }
 const oregister= async (req,res)=>{
	const fname=req.body.org;
	const lname=req.body.orgname;
	const phn1=req.body.num1;
	const phn2=req.body.num2;
	const count=req.body.pp;
	const emailid = req.body.email;
	const id = req.body.pwd;
	const add= req.body.add;
	const pin= req.body.pin;
	console.log(pin);
	var f=[];
	f.push(lname)
	const collectionName = "Organisers";
	const documentId = emailid; // You can replace this with your desired document ID

	// Create a reference to the document
	const docRef = db.collection(collectionName).doc(documentId);
	const data = {
		organisation: fname,
		organiser: lname,
		phone1: phn1,
		phone2: phn2,
		count: count,
		email: emailid,
		darpanid: id,
		address: add,
		pincode:pin
	  };
	 const nam = data.organiser;
     const useremail = data.email;
	docRef.set(data)
	  .then(() => {
	
		res.render("organ",{mark:{ organiser: nam, email: useremail }});
	 })
	 .catch((error) => {
		console.error("Error writing document: ", error);
		// Handle the error, e.g., send an error response to the client
		res.status(500).json({ error: "Error writing document" });
	  });
    }
module.exports = {
	dregister,
	oregister
}