var express = require('express');
var router = express.Router();

//var pg = require('pg');
var pg = require('pg').native;

//var database = "postgres://postgres:admin@localhost:5432/swen303";
var database = "postgres://depot:5432/Swen301";
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
var signedInUserUID = 0;
var money = 0.0;







/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) });
});

/* GET deleteRoute page. */
router.get('/deleteRoute', function(req, res) {
  res.render('deleteRoute', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) });
});


/* GET routes page. */
router.get('/routes', function(req, res) {
  res.render('routes', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) });
});

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) });
});



router.get('/login', function(req, res) {
  res.render('login', { title: websiteName, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money) });
});

router.get('/editRoute', function(req, res) {
  res.render('editRoute', { title: websiteName, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money) });
});


router.get('/addRoute', function(req, res) {
  res.render('addRoute', { title: websiteName, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money) });
});


router.get('/checkFigure', function(req, res) {
  res.render('checkFigure', { title: websiteName, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money) });
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
            money = result.rows[i].money;
            
            res.render('index', { title: websiteName, message: message, signedInUser: signedInUser, id: signedInUserUID, money: parseInt(money) });
          }
          else {
            message = "Incorrect password.";
          }
        }
      }

      res.render('login', { title: websiteName, message: message, redirect: req.query.redirect, id: signedInUserUID, money: parseInt(money) });
    });
  });
});

module.exports = router;
