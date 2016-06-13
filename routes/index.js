var express = require('express');
var router = express.Router();

//At Uni
var pg = require('pg').native;
var database = "postgres://depot:5432/Swen301";

//At Home
//var pg = require('pg');
//var database = "postgres://postgres:w2sybb57@localhost:5432/swen301";

pg.connect(database, function (err) {
  if (err) {
    console.error('Could not connect to the database.');
    console.error(err);
    return;
  }

  console.log('Connected to database.');
});

var websiteName = 'KPS';
var signedInUser = '';
var signedInUserRealname = '';
var manager='';
var signedInUserUID = 0;
var money = 0.0;






/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money),manager: manager });
});
/* GET home page. */
router.get('/mainPage', function(req, res) {
  res.render('mainPage', { title: websiteName, signedInUser: signedInUser, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money),manager: manager });
});

/* GET deleteRoute page. */
router.get('/deleteRoute', function(req, res) {
  res.render('deleteRoute', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
});


/* GET routes page. */
router.get('/routes', function(req, res) {
  res.render('routes', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
});

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
});



router.get('/login', function(req, res) {
  res.render('login', { title: websiteName, message: req.query.message, signedInUser: signedInUser, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money),manager: manager });
});

router.get('/editRoute', function(req, res) {
  res.render('editRoute', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
});


router.get('/addRoute', function(req, res) {
  res.render('addRoute', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
});


/* GET deleteRoute page. */
router.get('/checkFigure', function(req, res) {
  res.render('checkFigure', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
});



router.get('/logout', function(req, res) {
	signedInUser= false
  res.render('mainPage', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
});





router.get('/doLogin', function(req, res) {
  var username = req.query.username;
  var password = req.query.password;
 
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }

    client.query("SELECT * FROM Users;", function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        return;
      }

      var message = "Invalid username or password.";
		
      for (var i = 0; i < result.rows.length; i++) {
        if (result.rows[i].username == username) {
          if (result.rows[i].password == password) {
            message = "Signed in successfully.";
				
            signedInUser = username;
            signedInUserRealname = result.rows[i].realname;
            signedInUserUID = result.rows[i].uid;
            manager = result.rows[i].manager;
            
            
            money = result.rows[i].money;
            
            res.render('mainPage', { title: websiteName,signedInUser: signedInUser, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money),manager: manager });
          }
          else {
            message = "Incorrect password.";
          }
        }
      }

      res.render('index', { title: websiteName,signedInUser: signedInUser, message: message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money), manager: manager});
    });
  });
});






router.get('/doSignUp', function(req, res) {
  if (req.query.password != req.query.confirmPassword) {
    res.render('signUp', { title: websiteName, message: "The passwords do not match." });
  }
  else if (req.query.username == "" || req.query.realname == "") {
    res.render('signUp', { title: websiteName, message: "Please fill out the entire form." });
  }
  else {
    pg.connect(database, function (err, client, done) {
      if (err) {
        console.error('Could not connect to the database.');
        console.error(err);
        return;
      }

      var query = "INSERT INTO Users (username, realname, password, manager) VALUES ('";
      query += req.query.username;
      query += "', '";
      query += req.query.realname;
      query += "', '";
      query += req.query.password;
      query += "', '";
      if(req.query.manager!=null){
			query += req.query.manager;
      	query += "');"; 
      }
      else {
      	query += "f');";
      }
      

      client.query(query, function (error, result) {
        done();
        if (error) {
          console.error('Failed to execute query.');
          console.error(error);
          return;
        }

        res.render('mainPage', { title: websiteName,signedInUser: signedInUser, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money),manager: manager });
      });
    });
  }
});



router.get('/doAddRoute', function(req,res){
	var AddressOrigin=req.query.AddressOrigin; 	
	var SuburbOrigin=req.query.SuburbOrigin; 
	var RegionOrigin=req.query.RegionOrigin; 
	var CountryOrigin=req.query.CountryOrigin; 
	var AddressDes=req.query.AddressDes; 
	var SuburbDes=req.query.SuburbDes;
	var RegionDes=req.query.RegionDes; 
	var CountryDes=req.query.CountryDes;
	var Priority= req.query.Priority
	var Land = req.query.Land
	var Sea = req.query.Sea
   var Air= req.query.Air
	
	pg.connect(database, function (err,client,done) {
  if (err) {
    console.error('Could not connect to the database.');
    console.error(err);
    return;
  }
   var query = "INSERT INTO Routes (addressorigin, suburborigin, regionorigin, countryorigin, addressdes,suburbdes,regiondes,countrydes,priority,land,sea,air) VALUES ('";
      query += AddressOrigin
      query += "', '";
      query += SuburbOrigin
      query += "', '";
      query += RegionOrigin
      query += "', '";
      query += CountryOrigin
      query += "', '";
      query += AddressDes
      query += "', '";
      query += SuburbDes
      query += "', '";
      query += RegionDes
      query += "', '";
      query += CountryDes
      query += "', '";
      query += Priority
      query += "', '";
      
      if(req.query.Land!=null){
			query += req.query.Land;
      	query += "', '";
      }
      else {
      	query += "f', '";
      }
      
		if(req.query.Sea!=null){
			query += req.query.Sea;
      	query += "', '";
      }
      else {
      	query += "f', '";
      }
      
      if(req.query.Air!=null){
			query += req.query.Air;
      	query += "');"; 
      }
      else {
      	query += "f');";
      }
  
  console.log(AddressOrigin+" "+SuburbOrigin+" "+RegionOrigin+" "+CountryOrigin+" "+AddressDes+" "+SuburbDes+" "+RegionDes+" "+CountryDes+ " "+Priority+" "+Land+" "+Sea+" "+Air); 

	client.query(query, function (error, result) {
        done();
        if (error) {
          console.error('Failed to execute query.');
          console.error(error);
          return;
        }
        
	res.render('addRoute', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager});
  
  });
  });
  
	
	
	
	
	
	});
	
module.exports = router;
