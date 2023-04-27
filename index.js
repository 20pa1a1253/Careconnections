//const e = require("express");
const express = require("express");
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
const port = 3000;


const functions = require('firebase-functions');
const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore, QuerySnapshot } = require("firebase-admin/firestore");




var serviceAccount = require("./key.json");
const { combinations, log } = require("mathjs");
//const { ref } = require("firebase-functions/lib/v1/providers/database");
initializeApp({
	credential: cert(serviceAccount),
});


const db = getFirestore();
//const db = firebase.firestore();

app.set("view engine","ejs");
app.use(express.static('public'));

app.get("/",(req,res)=>{
	res.render('main');
});
app.post("/main",(req,res)=>{
	res.render("ss");
});
app.post("/needfor",(req,res)=>{
	res.render("needform");
});
//needcollection
app.post("/needform",(req,res)=>{
	res.render("organ");
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
	item1.push({"name":n,"organ":o, "number": ph,"category1":cat[0],"category2":cat[1],"strength":stre,"Address":add});
	console.log(item1)
				
	 db.collection("needs").doc(ph).get().then((doc) => {
		db.collection("needs").doc(ph).update({
			"need": item1
		  }).then(() => {
			  console.log(item1);
			console.log("Item added successfully");
		  })
	})
   db.collection("needs").doc(ph).set({
	"need": item1
   })


});
//funds list form
app.get("/ned",async(request,response)=>{
	//res.send("happiee happieee");
	
	var refer = await db.collection("needs").where("need","!=",null).get();
	var datax=[];
    refer.forEach((doc) => {
		datax.push(doc.data().need);
	});
	response.render("needs",{ marks: datax});
	console.log(datax);
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
  res.render("donor")
	// Perform your actions using the data
  });
//delete funds after accept
app.post('/accept', function(req, res) {
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
  res.render("organ")
	// Perform your actions using the data
  });

app.post("/fo",(req,res)=>{
	res.render("fundforms");
});
//donor needs form
app.post("/form",async(req,res)=>{
	res.render("donor");
	const d=req.body.picker;
	console.log(d)
	const n=req.body.fname;
			const ph=req.body.tel;
			const loc=req.body.location;
			const time=req.body.time;
			const date=req.body.date;
			const stre=req.body.strength;
			const item=req.body.items;
			const pin=req.body.pin;
			const add=req.body.add;
			const txt=req.body.text;
			const cate= req.body.chk ? "checked" : "unchecked"; // extract checkbox value from form data
			const cat= req.body.kids;
			const gender = req.body.male;

	
	switch (d) {
		

		case "div1":
			const item1 = [];
				
				// Add the new item to the items array
				item1.push({"name":n, "number": ph,"item":item,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add,"Strength":stre});		
			db.collection("funds").doc(ph).get().then((doc) => {
					db.collection("funds").doc(ph).update({
						"food": item1
					  }).then(() => {
						  console.log(item1);
						console.log("Item added successfully");
					  })
				
				
				// Update the items array in the document
				
			})
			db.collection("funds").doc(ph).set({
				"food": item1
			  })
			  break;
		case "div2":
			
			db.collection("funds").doc(ph).get().then((doc) => {
				const items = [];
				
				// Add the new item to the items array
				items.push({"name":n, "number": ph,"item":item,"gender":gender,"location":loc,"time":time,"date":date,"category":cat,"Pincode":pin,"Address":add});
				
				// Update the items array in the document
				db.collection("funds").doc(ph).update({
				  "food": items
				}).then(() => {
					console.log(items);
				  console.log("Item added successfully");
				}).catch((error) => {
				  console.error("Error adding item: ", error);
				});
			  }).catch((error) => {
				console.error("Error getting document: ", error);
			  });

		  // Show grocery related content
		  break;
		case "div3":
			
			const q = req.body.txt; // extract dropdown value from form data
			console.log("Dropdown value:", gender);
			const items = [];
				
				// Add the new item to the items array
				items.push({"name":n, "number": ph,"category":cat[0],"gender":gender[1],"quantity":q,"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add});
				
			db.collection("funds").doc(ph).get().then((doc) => {
				
				// Update the items array in the document
				db.collection("funds").doc(ph).update({
				  "clothes": items
				}).then(() => {
					console.log(items);
				  console.log("Item added successfully");
				})
			  })
			  db.collection("funds").doc(ph).set({
				"clothes": items
			  }).then(() => {
				  console.log(items);
				console.log("Item added successfully");
			  })
		
		  // Show clothes related content
		  break;
		case "div4":
			const item4 = [];
				
				// Add the new item to the items array
				item4.push({"name":n, "number": ph,"item":txt[0],"location":loc,"time":time,"date":date,"Pincode":pin,"Address":add});
				
			db.collection("funds").doc(ph).get().then((doc) => {
				// Update the items array in the document
				db.collection("funds").doc(ph).update({
					"others": item4
				  }).then(() => {
					  console.log(items);
					console.log("Item added successfully");
				  })
			})
			db.collection("funds").doc(ph).set({
				"others": item4
			  })


		  // Show others related content
		  break;
		default:
			console.log("something fucked up")
		  // Hide all content
		  break;
	  }
	
	
	//}
  });
  
app.get("/ss",(req,res)=>{
	const n=req.query.nam;
	db.collection("users").add({
		name:n
	})
	.then(()=>{
		res.send("index");

	})
	
});

app.get("/login",(req,res)=>{
	res.render("login");
});
app.get("/loginsubmit",(req,res)=>{
	const email=req.query.email;
	const pwd=req.query.pwd;
	const role=req.query.role;
	console.log(role);
	if(role=="organiser"){
		db.collection("Organisers")
		.where("email","==",email)
	    .where("pwd","==",pwd)
	    .get()
	    .then((docs) => {
			if(docs.size > 0){
			console.log("pwd");
			res.render("organ");
			}
		})
    }
	else if(role=="donor"){
		db.collection("donors")
		.where("email","==",email)
	    .where("pasword","==",pwd)
	    .get()
	    .then((docs) => {
			if(docs.size > 0){
				console.log("pwd");
				res.render("donor");
			}

		})
    }
	else{
		res.send("loginfailed");
	}
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
app.get("/donorReg.ejs",(req,res)=>{
	res.render("donorReg");
});
app.get("/dr",async(req,res)=>{
	const fname=req.query.fname;
	const lname=req.query.lname;
	const phn=req.query.tel;
	const emailid = req.query.email;
	const pwd = req.query.pwd;
	const add= req.query.add;
	console.log(emailid);
	console.log(fname);
	db.collection("donors").add({
		donar: fname+""+lname,
		email:emailid,
		pasword:pwd,
		address:add,
		phonenum:phn,
	}).then(()=>{
	res.render("donor");
	 })

 })
app.get("/organReg.ejs",(req,res)=>{
	res.render("organReg");
});
app.get("/Or",async(req,res)=>{
	const fname=req.query.org;
	const lname=req.query.orgname;
	const phn1=req.query.num1;
	const phn2=req.query.num2;
	const count=req.query.pp;
	const emailid = req.query.email;
	const pwd = req.query.pwd;
	const add= req.query.add;
	console.log(emailid);
	console.log(fname);
	db.collection("Organisers").add({
		organisation: fname,
		organiser:lname,
		phone1:phn1,
		phone2:phn2,
		count:count,
		email:emailid,
		pwd:pwd,
		address:add,
	}).then(()=>{
		res.render("organ");
	 })

 })
 const p =[];
 app.get("/p",async(req,res)=>{

	const mencl=req.query.men;
	const food=req.query.food;
	const phn=req.query.phn;
	const other = req.query.othr;
	const menum = req.query.menum;
	const othrnum= req.query.othrnum;
	console.log(food);
	console.log(phn);
	p.push(phn);
	p.push(food);
	p.push(mencl);
	p.push(menum);
	p.push(other);
	p.push(othrnum);
	//console.log(p);
	//res.send("success");
	var snapshot= await db.collection("donors").get();
	var re= db.collection("donors")
	.where("phonenum","==",phn).get();
	re.then((docs)=>{
		res.send("Thanks for your contribution your'e p collected :))");

	})
	
	re.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(doc.id);
			
			//exports.myFunction = functions.https.onCall((data, context) => {
				db.collection("donors").doc(doc.id).get().then((doc) => {
					const items = doc.data().p || [];
					
					// Add the new item to the items array
					items.push({"number":phn,"food":food,"clothes":mencl,"clothcount":menum,"others":other,"othercount":othrnum});
					console.log(items);
					
					// Update the items array in the document
					db.collection("donors").doc(doc.id).update({
					  "p": items
				    })
				});
	    })
	
	
	
 })
})
 app.get("/needs",(req,res)=>{
	const ned=req.query.needs;
	const num=req.query.number;
	//const pwd=req.query.pwd;
	const a=[];
	var re= db.collection("Organisers").where("phone1","==",num);
	console.log(num);
	console.log(ned);
	res.send("thankyou!!you're needs collected succesfully");
	re.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			db.collection("Organisers").doc(doc.id).update({
				needs:ned,
				
			})
			
			a.push(doc.id);
			console.log(doc.id);
		});
	});
	
});
const dc=[];
app.get("/signupsubmit",async(req,res)=>{
	const name=req.query.user;
	const email=req.query.email;
	const pwd=req.query.pwd;
	console.log(name);
	console.log(email);
	
	
    var re=await db.collection("customers")
		.where("email","==",email)
	    .where("pwd","==",pwd)
		.get();
		//.then((docs)=>{
			re.forEach(doc=>{
				dc.push(doc.data())
			})
			//console.log("the")
			//doc.push(docs.data());

		//})
	//console.log(dc);
	res.render ("landing");
	    
		
		
});
app.get("/fun",async(req,response)=>{
	var refer = await db.collection("funds").where("food","!=",null).get();
	var datax=[];
	
		//var re = await db.collection("funds").where("clothes","!=",null).get();
		refer.forEach((doc) => {
			datax.push(doc.data().food);
			
			console.log(datax);
		});
		response.render("fund",{ marks: datax});
	
});
app.get("/fun1",async(req,response)=>{
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
});
app.get("/fun2",async(req,response)=>{
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
});
app.listen(port,()=>{
	console.log(`You are in port number ${port}`);
})
