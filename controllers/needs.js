const express = require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const { admin,db,auth,doc, getDoc, createUserWithEmailAndPassword,getUIDByEmail,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp } = require('../models/firebase');
const needform = async (req, res) => {
    try {
        const d = req.body.picker;
        const n = req.body.fname;
        const ph = req.body.tel;
        const time = req.body.time;
        const date = req.body.date;
        const add = req.body.location;
        const gite = req.body.items2 ;
        const gquan=req.body.txt2;
        const cquan=req.body.txt3;
        const fitem=req.body.items1;
        const fnop=req.body.nop;
        const other = req.body.text;
        const cate = req.body.chk ? "checked" : "unchecked";
        const cat = req.body.kids;
        const gender = req.body.male;
        const foodType = req.body.type;
        const email = req.sessionData.email;

        console.log(d, n, ph, time, date, add, cquan, gite, other, cate, cat, gender, foodType);

        const documentId = req.sessionData.documentId;
        const now = new Date(); // Current timestamp
        
        const re = await db.collection("Needs").doc(documentId).get();
        if (!re.exists) {
            res.status(404).send("Document not found.");
            return;
        }
        switch (d) {
            case "div1":
                // Food needs
                const foodItems = re.data().food || [];
                foodItems.push({
                    needId: uuidv4(),
                    name: n,
                    need: "Food",
                    type: foodType,
                    item: fitem,
                    No_of_people:fnop,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    fullfilledby:"",
                    CreatedAt: now
                });
                await db.collection("Needs").doc(documentId).update({ "food": foodItems });
                res.send("Food need updated successfully.");
                break;

            case "div2":
                // Groceries needs
                const groceryItems = re.data().groceries || [];
                groceryItems.push({
                    needId: uuidv4(),
                    name: n,
                    need: "Groceries",
                    item: gite,
                    quantity: gquan,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    fullfilledby:"",
                    CreatedAt: now
                });
                await db.collection("Needs").doc(documentId).update({ "groceries": groceryItems });
                res.send("Groceries need updated successfully.");
                break;

            case "div3":
                // Clothes needs
                const clothesItems = re.data().clothes || [];
                clothesItems.push({
                    needId: uuidv4(),
                    name: n,
                    need: "Clothes",
                    category: cat,
                    gender: gender,
                    quantity: cquan,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    fullfilledby:"",
                    CreatedAt: now
                });
                await db.collection("Needs").doc(documentId).update({ "clothes": clothesItems });
                res.send("Clothes need updated successfully.");
                break;
            case "div4":
                // Other needs
                const otherItems = re.data().others || [];
                otherItems.push({
                    needId: uuidv4(),
                    name: n,
                    need: "Others",
                    about: other,
                    number: ph,
                    location: add,
                    time: time,
                    date: date,
                    status: "open",
                    fullfilledby:"",
                    CreatedAt: now
                });
                await db.collection("Needs").doc(documentId).update({ "others": otherItems });
                res.send("Other need updated successfully.");
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
const foodneed = async (req, response) => {
	var dax = [];
	var refe = await db.collection("Needs").get();
	try {
		refe.forEach((doc) => {
			const data=doc.data();
			if(data.food && data.food.length>0){
				dax.push(...data.food);
                dax.push(...data.userId);

			}
			
		});
		if (dax.length > 0) {
			console.log(dax);
			response.render("needs", { marks: dax });
		} else {
			response.send("There are no donations regarding groceries.");
		}
	} catch (error) {
		console.error("Error retrieving data: ", error);
		response.status(500).send("Internal Server Error");
	}
};

const clothneed = async (req, response) => {
	var refe = await db.collection("Needs").get();
	var dax = [];
	try {
		refe.forEach((doc) => {
			const data=doc.data();
			if(data.clothes && data.clothes.length>0){
				dax.push(...data.clothes);
                dax.push(...data.userId);
			}
		});
		if (dax.length > 0) {
			console.log(dax);
			response.render("Needs", { marks: dax });
		} else {
			response.send("There are no donations regarding groceries.");
		}

	}
	catch (error) {
		console.error("error retrieving data:", error);
		response.status(500).send("Internal Server error");
	}
}
const oneed = async (req, response) => {
	const ref = await db.collection("Needs").get();
	const dax = [];
	ref.forEach((doc) => {
		const data = doc.data();
		if (data.groceries && data.groceries.length > 0) {
			dax.push(...data.groceries);
            dax.push(...data.userId);
		}
	});
	if (dax.length > 0) {
		console.log(dax);
		response.render("Needs", { marks: dax });
	} else {
		response.send("There are no donations regarding groceries.");
	}
}
module.exports = {
	needform,
    foodneed,
    clothneed,
    oneed
}