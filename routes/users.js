var express = require('express');
var router = express.Router();

var queries = require('../queries');

var signedInUserRealname = '';
var manager='';
var signedInUserUID = 0;

/* GET login page. */
router.get('/login', function(req, res) {
  res.render('login', { message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, manager: manager });
});

/* POST login page */
router.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  queries.login(username, password, function(err, result){
    if(err){
      res.redirect('/');
    } else {          
      res.render('mainPage', { message: "Logged in as "+ result.realname, redirect: req.query.redirect, id: signedInUserUID, manager: manager });
    }
  });
});

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup', { message: "", id: signedInUserUID, manager: manager});
});

/* POST signup page */
router.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var realname = req.body.realname;

  if (password != confirmPassword) {
    res.render('signUp', { message: "The passwords do not match." });
  }
  else if (username == "" || realname == "") {
    res.render('signUp', { message: "Please fill out the entire form." });
  }
  queries.signUp(realname, username, password, confirmPassword, function(err){
    if(err){
      res.render('signUp', { message: "Failed to signup a new user" });
    } else {
      res.redirect('/login');
    }
  });
});

/* GET edit account page. */
router.get('/edit/:id', function(req, res) {
  queries.getAccountById(req.params.id, function(err, result){
    if(err){
      res.redirect('/users/edit');
    } else {
      res.render('editAccount', { user: result });
    }
  });
});

/* POST edit account. */
router.post('/edit/:id', function(req, res){
  var id = req.params.id;
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var realname = req.body.realname;

  if (req.body.password != req.query.confirmPassword) {
    res.render('editAccount', { message: "The passwords do not match." });
  }
  else if (req.query.username == "" || req.query.realname == "") {
    res.render('editAccount', { message: "Please fill out the entire form." });
  }

  queries.editAccount(id, username, realname, password, function(err){
    if(err){
      res.render('editAccount', { message: "Failed to edit account" });
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
