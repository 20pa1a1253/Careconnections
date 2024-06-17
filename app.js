const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
const port = 8000;
const { admin,db,auth, createUserWithEmailAndPassword,signInWithEmailAndPassword,getIdToken,verifyIdToken,onAuthStateChanged,getFirestore, QuerySnapshot,initializeApp } = require('../models/firebase');

app.set("view engine","ejs");
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('ssc');

})
app.post('/login',(req,res)=>{
    const email = req.body.email;
	const password = req.body.pwd;
	const role = req.body.role;
    console.log(email,password,role);

    db.collection('users').doc(email).add({
        email:email,
        pass:password,
        role:role
    }).then(()=>{
        res.send("success");
    })
	// const documentId=email;
    
})
app.listen(port,()=>{
	console.log(`You are in port number ${port}`);
})