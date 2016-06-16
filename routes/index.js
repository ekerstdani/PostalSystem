var express = require('express');
var router = express.Router();
var queries = require('../queries');

//At Uni
//var pg = require('pg').native;
//var database = "postgres://depot:5432/Swen301";

//At Home
var pg = require('pg').native;
//Daniel
//var database = "postgres://postgres:w2sybb57@localhost:5432/swen301";
//Pas
//var database = "postgres://postgres:pasi1105@localhost:5432/postgres";
//Alex
//var database = "postgres://postgres:123456@localhost:5432/postgres";
//var pg = require('pg');
var database = "postgres://postgres:postgres@localhost:5432/swen301";

pg.connect(database, function (err) {
  if (err) {
    console.error('Could not connect to the database.');
    console.error(err);
    return;
  }

  console.log('Connected to database.');
});

var signedInUserRealname = '';
var manager='';
var signedInUserUID = 0;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { message: "Logged Out", id: signedInUserUID, manager: manager });
});

/* GET home page. */
router.get('/mainPage', function(req, res) {
  res.render('mainPage', { message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, manager: manager });
});

router.get('/checkFigure', function(req, res){
  var routes = 0;
  var revenue = 0;
  var expendeture = 0;
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        var query = "SELECT COUNT(*) FROM Routes" ;
        client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }
            else{
              routes = result.rows[0].count;
            }    
        });

        var query = "SELECT * FROM Expenditure" ;
        client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }
            else{
              expendeture = result.rows[0].expendeture;
            }         
        });

        var query = "SELECT * FROM Revenue" ;
          client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }
            else{
              revenue = result.rows[0].revenue;
             
               res.render('checkFigure', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, money: parseInt(money) ,manager: manager, numberofroutes:routes, totalRev:revenue,totalExpendeture:expendeture});

            }
            });
          
         
    }); 
  });

/* GET routes page. */
router.get('/editAccount', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        var query = "SELECT * FROM Users" ;
        client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }
            res.render('editAccount', { title: websiteName, list: result.rows, message: req.query.message, signedInUser: signedInUser, redirect: req.query.redirect, id: signedInUserUID,manager: manager });
        });
    });
});

router.get('/doDeleteAccount', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        client.query("DELETE FROM Users WHERE uid=" + req.query.uid + ";", function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }

            client.query("SELECT * FROM Users;", function (error, result) {
                done();
                if (error) {
                    console.error('Failed to execute query.');
                    console.error(error);
                    return;
                }


                res.render('editAccount', {
                    title: websiteName,
                    list: result.rows,
                    message: "Deleted Succesfully",
                    signedInUser: signedInUser,
                    redirect: req.query.redirect,
                    id: signedInUserUID,
                    manager: manager
                });

            });
        });
    });
});

module.exports = router;
