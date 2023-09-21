const express = require("express");
const app=express();

const router = express.Router();
const { admin,db,auth,doc, getDoc, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp } = require('../models/firebase');
const needform= (req,res)=>{
	var m="Your Needs Collected sucessfully";
	//const d=req.body.picker;
	//console.log(d)
	const n=req.body.name;
	const o=req.body.Orgname;
	const ph=req.body.tel;
	const stre=req.body.lname;
	const pin=req.body.pin;
	const add=req.body.add;
	const cate= req.body.chk ? "checked" : "unchecked"; // extract checkbox value from form data
	const cat= req.body.r;
	console.log(cat);
	var item1 = [];
	//item1.push({"name":n,"organ":o, "number": ph,"category1":cat[0],"category2":cat[1],"strength":stre,"Address":add});
	console.log(item1)
	const item = [];
	const re = db.collection("needs").doc(ph).get();
	re.then((doc) => {
		if (doc.exists) {
			console.log(doc.id);
			const item = doc.data().need || [];
            if(cat.length== 3){
                item.push({"name":n,"organ":o, "number": ph,"category1":cat[0],"category2":cat[1],"category3":cat[2],"strength":stre,"Address":add});
            }
            else{
                item.push({"name":n,"organ":o, "number": ph,"category1":cat[0],"category2":cat[1],"strength":stre,"Address":add});
            }
			db.collection("needs").doc(ph).update({
				"need": item
			  }).then(() => {
				  console.log(item);
                  res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);
			  })
		}
		else{
			const item1 = doc.data() || [];
            if(cat.length== 3){
                item1.push({"name":n,"organ":o, "number": ph,"category1":cat[0],"category2":cat[1],"category3":cat[2],"strength":stre,"Address":add});
            }
            else{
                item1.push({"name":n,"organ":o, "number": ph,"category1":cat[0],"category2":cat[1],"category2":cat[1],"strength":stre,"Address":add});
          
            }  
			db.collection("needs").doc(ph).set({
					"need": item1
			}).then(()=>{
                res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);
            })
	        
			

		}
    })
}
const need= async(request,response)=>{
        var refer = await db.collection("needs").where("need","!=",null).get();
        var datax=[];
        refer.forEach((doc) => {
            datax.push(doc.data().need);
        });
        response.render("needs",{ marks: datax});
        console.log("this is datax")
        console.log(datax);
}


module.exports = {
	needform,
    need
}