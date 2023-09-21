const express = require("express");
const app=express();

const router = express.Router();
const { admin,db,auth,doc, getDoc, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp } = require('../models/firebase');
const fundform=async(req,res)=>{
	var m="Thanks for the contribution,funds collected succesfully";
	res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);
	const d=req.body.picker;
	console.log(d)
	const n=req.body.fname;
			const ph=req.body.tel;
			const loc=req.body.location;
			const time=req.body.time;
			const date=req.body.date;
			const str=req.body.stre;
			const stre=req.body.txt;
			const ite=req.body.items;
			const pin=req.body.pin;
			const add=req.body.add;
			const txt=req.body.text;
			const cate= req.body.chk ? "checked" : "unchecked"; // extract checkbox value from form data
			const cat= req.body.kids;
			const gender = req.body.male;
	switch (d) {
		case "div1":
			const Type = req.body.type;
			console.log(Type);
			const item = [];
				const re = db.collection("funds").doc(ph).get();
				re.then((doc) => {
					if (doc.exists) {
						console.log(doc.id);
						const items = doc.data().food || [];
						// Add the new item to the items array
						items.push({"name":n, "type":Type,"item":ite,"number": ph,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add}); 
						console.log(items);
						// Update the items array in the document
						db.collection("funds").doc(doc.id).update({
							"food": items
						});
					} else {
						const items = doc.data() || [];
						// Add the new item to the items array
						items.push({"name":n, "type":Type,"item":ite,"number": ph,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add}); 
						console.log(items);
						db.collection("funds").doc(ph).set({
							"food": items
						});
						// console.log("No such document!");
					}
				}).catch((error) => {
					console.log("Error getting document:", error);
				});
			  break;
		case "div2":
			const gitem=req.body.itms;
			const gq=req.body.txt2;
			const se = db.collection("funds").doc(ph).get();
				se.then((doc) => {
					if (doc.exists) {
						console.log(doc.id);
						const item2 = doc.data().grocery || [];
						// Add the new item to the items array
						item2.push({"name":n, "number": ph,"location":loc,"time":time,"date":date,"item":gitem,"quatity":gq,"Pincode":pin,"Address":add,}); 
						console.log(item2);
						//Update the items array in the document
						db.collection("funds").doc(doc.id).update({
							"grocery": item2
						});
					} else {
                        const items = doc.data() || [];
                        items.push({"name":n, "number": ph,"location":loc,"time":time,"date":date,"item":gitem,"quatity":gq,"Pincode":pin,"Address":add,}); 
						console.log(items);
						//Update the items array in the document
						db.collection("funds").doc(ph).set({
							"grocery": items
						});
					}
				}).catch((error) => {
					console.log("Error getting document:", error);
				});
		  // Show grocery related content
		  break;
		case "div3":
			const q = req.body.txt; // extract dropdown value from form data
			console.log("Dropdown value:", gender);
			const te = db.collection("funds").doc(ph).get();
				te.then((doc) => {
					if (doc.exists) {
						console.log(doc.id);
						const item3 = doc.data().clothes || [];
						// Add the new item to the items array
						item3.push({"name":n, "number": ph,"category":cat,"gender":gender,"quantity":q,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add});
				         console.log(item3);
						// Update the items array in the document
						db.collection("funds").doc(doc.id).update({
							"clothes": item3
						});
					} else {
                        const item31 = doc.data().clothes || [];
						// Add the new item to the items array
						item31.push({"name":n, "number": ph,"category":cat,"gender":gender,"quantity":q,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add});
                        db.collection("funds").doc(doc.id).update({
							"clothes": item31
						});
				         console.log(item31);
					}
				}).catch((error) => {
					console.log("Error getting document:", error);
				});
		  // Show clothes related content
		  break;
		case "div4":
			const de = db.collection("funds").doc(ph).get();
				de.then((doc) => {
					if (doc.exists) {
						console.log(doc.id);
						const item4 = doc.data().others || [];
						// Add the new item to the items array
						item4.push({"name":n, "number": ph,"item":txt,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add});
						  console.log(item4);
						// Update the items array in the document
						db.collection("funds").doc(doc.id).update({
							"others": item4
						});
					} else {
                        const item4 = doc.data().others || [];
						// Add the new item to the items array
						item4.push({"name":n, "number": ph,"item":txt,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add});
                        db.collection("funds").doc(doc.id).update({
							"others": item4
						});
						  console.log(item4);
					}
				}).catch((error) => {
					console.log("Error getting document:", error);
				});
		  break;
		default:
			console.log("something sucked up again")
            res.send("something sucked up again")
		  // Hide all content
		  break;
	  }
};
const foodfun= async(req,response)=>{
	var refer = await db.collection("funds").where("food","!=",null).get();
	var datax=[];
	
		//var re = await db.collection("funds").where("clothes","!=",null).get();
		refer.forEach((doc) => {
			datax.push(doc.data().food);
			
			console.log(datax);
		});
		response.render("fund",{ marks: datax});
	
};
const clothfun = async(req,response)=>{
	var refe = await db.collection("funds").where("clothes","!=",null).get();
	var data=[];
	if(refe != undefined){
		refe.forEach((doc) => {
			data.push(doc.data().clothes);
			//response.render("cfund",{ marks: datax});
			
			console.log(data);
		});
		response.render("cfund",{ marks: data});
		
	}
	else{
		response.send("There are No Funds regarding clothes")
	}
}
const ofun=async(req,response)=>{
	var ref = await db.collection("funds").where("others","!=",null).get();
	var dax=[];
	if(ref!=undefined){
		ref.forEach((doc) => {
			dax.push(doc.data().others);
			console.log(dax);
		});
		response.render("ofund",{ marks: dax});

	}
	else{
		response.send("There are No Funds regarding others")
	}
}
module.exports = {
	fundform,
    foodfun,
    clothfun,
    ofun
}