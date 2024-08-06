
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000;
const session = require('express-session');
const sessionMiddleware = require('./controllers/sessiondata'); 
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

const secret = crypto.randomBytes(32).toString('base64');
const envFile = '.env';

fs.appendFile(envFile, `SESSION_SECRET=${secret}\n`, (err) => {
  if (err) throw err;
  console.log('SESSION_SECRET updated in .env file');
});
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false } // Set `secure: true` if you're using HTTPS
  }));
app.set("view engine","ejs");
app.use(express.static('public'));


app.use((req, res, next) => {
	res.setHeader('X-Content-Type-Options', 'nosniff');
	
	next();
  });
  const loginRoutes = require('./routes/loginroute');
  const dr = require('./routes/registerroute');
  const or = require('./routes/registerroute');
  const profiles = require('./routes/profileroute');

 app.use(sessionMiddleware) ;
app.get("/",(req,res)=>{
	res.render('main');
});
app.post("/main",(req,res)=>{
	res.render("ss");
});
app.use(express.static('public'));

const firebase = require('./models/firebase'); 
app.post("/needfor",(req,res)=>{
	res.render("needform");
});
// routes for signup,login
app.use(loginRoutes);
const l = require('./routes/loginroute');
app.post('/loginsubmit', l);
//app.post('/signupsubmit',l);
//routes for donor registrations
app.post("/donorReg",(req,res)=>{
	res.render("donorReg");
});
app.use(dr);

// routes for organiser registrations
app.get("/organReg",(req,res)=>{
	res.render("organReg");
});
app.use(or);
// routes for donor and organiser profile pages
app.use(profiles);
app.post('/opedit', function(req, res) {
	var m="Edit option will be available soon";
	res.send(`<script>alert("${m}"); window.history.go(-2);</script>`);
});
//needcollection
const needf = require('./routes/needroute');
app.use(needf);
//funds list form
const fundf = require('./routes/fundroute');
app.use(fundf);

app.get("/dn",async(req,res)=>{
	res.render("donor");
})
app.post('/req', function(req, res) {
	var m="Your request is collected";
	res.send(`<script>alert("${m}"); window.history.go(-1);</script>`);
	// Perform your actions using the data
});

app.post("/fo",(req,res)=>{
	res.render("fundforms");
});
//donor needs form
app.get('/acc', function(req, res) {
	const recipientNumber = req.query.number;
	const mg=req.query.msg;
	// You can use recipientNumber in your route logic
	res.send("Recipient Number: " + recipientNumber +"Message:"+mg);
	
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
