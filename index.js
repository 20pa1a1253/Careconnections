
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000;
app.set("view engine","ejs");
app.use(express.static('public'));

app.use((req, res, next) => {
	
	//  res.setHeader('Cache-Control', 'no-store, must-revalidate, max-age=0');
	res.setHeader('X-Content-Type-Options', 'nosniff');
	// res.setHeader('Content-Security-Policy', "script-src 'self' https://trusted-cdn.com");

	// Other common headers...
	next();
  });
  
app.get("/",(req,res)=>{
	res.render('main');
});
app.post("/main",(req,res)=>{
	res.render("ss");
});
const firebase = require('./models/firebase');
app.post("/needfor",(req,res)=>{
	res.render("needform");
});
// routes for signup,login
const l = require('./routes/loginroute');
app.post('/loginsubmit', l);
app.post('/signupsubmit',l);
//routes for donor registrations
app.post("/donorReg.ejs",(req,res)=>{
	res.render("donorReg");
});
const dr = require('./routes/registerroute');
app.post("/dr",dr);
// routes for organiser registrations
app.get("/organReg.ejs",(req,res)=>{
	res.render("organReg");
});
const or = require('./routes/registerroute');
app.post("/or",or);
// routes for donor and organiser profile pages
const p = require('./routes/profileroute');
app.get('/profile/:useremail',p);
app.get('/P/:email',p);
app.post('/opedit', function(req, res) {
	var m="Edit option will be available soon";
	res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);
});
//needcollection
const needf = require('./routes/needroute');
app.post("/needform",needf);
app.get("/ned",needf);
//funds list form
const fundf = require('./routes/fundroute');
app.post("/form",fundf);
// food funds
app.get("/fun",fundf);
// cloth funds
app.get("/fun1",fundf);
// other funds
app.get("/fun2",fundf)

app.get("/dn",async(req,res)=>{
	res.render("donor");
})
app.post('/req', function(req, res) {
	// const nam = req.body.nam;
	// const loc = req.body.loc;
	// const number = req.body.number;
	// const item = req.body.item;
	// console.log(nam);
	// console.log(number);
	// db.collection("funds").where("food","==",nam[0]).doc(number[0])
	// .get().delete().then(() => {
	// 	conle.log("Document successfully deleted!");
	// })
	var m="Your request is collected";
	res.send(`<script>alert("${m}"); window.history.go(-1);</script>`);
	// Perform your actions using the data
  });

app.post("/fo",(req,res)=>{
	res.render("fundforms");
});
//donor needs form
app.post('/acc', function(req, res) {
	res.render("models");
	
// 	const data = req.body;
// var m="Thanks! for accepting,we will connect you with them shortly";
 	// res.send(`<script>alert("${m}"); window.history.go(-1);</script>`);
	// Process the data as needed
	// console.log('Received data:', data

  
	// Respond to the client
	// res.json({ message: 'Data received on the server' });
	// Perform your actions using the data
  });

app.get("/login",(req,res)=>{
	res.render("login");
});

app.get("/signup",(req,res)=>{
	res.render("ss");
});
app.get("/we",(req,res)=>{
	res.render("landing");
});
app.get("/d",(req,res)=>{
	res.render("donor");
});
const dc=[];

app.post('/request', function(req, res) {
	var m="Your request is collected";
	res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);

  });
 app.post('/accept', function(req, res) {
	var m="Your request is collected";
	res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);

  });
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
    })
	// const documentId=email;
    
})
app.listen(port,()=>{
	console.log(`You are in port number ${port}`);
})
