const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { admin, db, auth, doc, getDoc,getUIDByEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, getIdToken, verifyIdToken, onAuthStateChanged, getFirestore, QuerySnapshot, initializeApp } = require('../models/firebase');
const fundform = async (req, res) => {
  try{
	const d = req.body.picker;
    const n = req.body.fname;
    const ph = req.body.tel;
    const time = req.body.time;
    const date = req.body.date;
    const add = req.body.location;
    const quantity = req.body.txt;
	const quantity2 = req.body.txt2;
    const ite = req.body.itms;
    const other = req.body.text;
    const cate = req.body.chk ? "checked" : "unchecked";
    const cat = req.body.kids;
    const gender = req.body.male;
    const foodType = req.body.type;
	const email = req.sessionData.email;
	const documentId = req.sessionData.documentId;
    const now = new Date(); // Current timestamp
	const re = await db.collection("Donations").doc(documentId).get();
        if (!re.exists) {
            res.status(404).send("Document not found.");
            return;
        }
		switch (d) {
            case "div1":
                // Food Donations
                const foodItems = re.data().food || [];
                foodItems.push({
                    DonationId: uuidv4(),
                    name: n,
                    Donation: "Food",
                    type: foodType,
                    item: ite,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    usedby:"",
                    CreatedAt: now
                });
                await db.collection("Donations").doc(documentId).update({ "food": foodItems });
                var m = "Thanks for the contribution,funds collected succesfully";
	            res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);
                break;
            case "div2":
                // Groceries Donations
                const groceryItems = re.data().groceries || [];
                groceryItems.push({
                    DonationId: uuidv4(),
                    name: n,
                    Donation: "Groceries",
                    item: ite,
                    quantity: quantity2,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    Usedby:"",
                    CreatedAt: now
                });
				console.log(groceryItems);
                await db.collection("Donations").doc(documentId).update({ "groceries": groceryItems });
                var m = "Thanks for the contribution,funds collected succesfully";
	            res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);               
				 break;
            case "div3":
                // Clothes Donations
                const clothesItems = re.data().clothes || [];
                clothesItems.push({
                    DonationId: uuidv4(),
                    name: n,
                    Donation: "Clothes",
                    category: cat,
                    gender: gender,
                    item: ite,
                    quantity: quantity,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    usedby:"",
                    CreatedAt: now
                });
                await db.collection("Donations").doc(documentId).update({ "clothes": clothesItems });
                var m = "Thanks for the contribution,funds collected succesfully";
	            res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);               
				 break;
            case "div4":
                // Other Donations
                const otherItems = re.data().others || [];
                otherItems.push({
                    DonationId: uuidv4(),
                    name: n,
                    Donation: "Others",
                    about: other,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    fullfilledby:"",
                    CreatedAt: now
                });
                await db.collection("Donations").doc(documentId).update({ "others": otherItems });
                var m = "Thanks for the contribution,funds collected succesfully";
	            res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);                
				break;
            default:
                res.status(400).send("Invalid picker value.");
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred: " + error.message);
    }
};
const foodfun = async (req, response) => {
	var dax = [];
	var refe = await db.collection("Donations").get();
     var m="There are no funds on clothes placed by Donors";
	try {
		refe.forEach((doc) => {
			const data=doc.data();
			if(data.food && data.food.length>0){
				dax.push(...data.food)
			}
			
		});
			console.log(dax);
			response.render("funds", { marks: dax });
		
	} catch (error) {
		console.error("Error retrieving data: ", error);
		response.status(500).send("Internal Server Error");
	}
};

const clothfun = async (req, response) => {
	var refe = await db.collection("Donations").get();
	var dax = [];
    var m="There are no funds on clothes placed by Donors"
	try {
		refe.forEach((doc) => {
			const data=doc.data();
			if(data.clothes && data.clothes.length>0){
				dax.push(...data.clothes)
			}
		});
		
			console.log(dax);
			response.render("funds", { marks: dax });
		}
	
	catch (error) {
		console.error("error retrieving data:", error);
		response.status(500).send("Internal Server error");
	}
}
const ofun = async (req, response) => {
	const ref = await db.collection("Donations").get();
    var m="There are no funds on clothes placed by Donors";
	const dax = [];
	ref.forEach((doc) => {
		const data = doc.data();
		if (data.groceries && data.groceries.length > 0) {
			dax.push(...data.groceries);
		}
	});
	
		console.log(dax);
		response.render("funds", { marks: dax });
	
}
module.exports = {
	fundform,
	foodfun,
	clothfun,
	ofun
}