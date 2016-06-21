var express = require('express');
var router = express.Router();
var queries = require('../queries');
var eventlogger = require('../eventlogger');
//At Uni
//var pg = require('pg').native;
//var database = "postgres://depot:5432/Swen301";

//At Home
var pg = require('pg');
//Daniel
//var database = "postgres://postgres:w2sybb57@localhost:5432/swen301";
//Pas
//var database = "postgres://postgres:pasi1105@localhost:5432/postgres";
//Alex
//var database = "postgres://postgres:123456@localhost:5432/swen301";
var database = "postgres://postgres:postgres@localhost:5432/swen301";
pg.connect(database, function (err) {
  if (err) {
    console.error('Could not connect to the database.');
    console.error(err);
    return;
}

console.log('Connected to database.');
});

/* GET home page. */
router.get('/', function(req, res) {
  if(req.query.loggedOut == "true"){
    res.render('index', { message: "Logged Out" });
  }
  res.render('index', { message: "Welcome to KPS system"});
});

/* GET home page. */
router.get('/mainPage', function(req, res) {
  res.render('mainPage', { message: req.query.message });
});

router.get('/metrics', function(req, res){
  var routes = 0;
  var revenue = 0;
  var expenditure = 0;
  var mail = 0;
  var events = 0;
  pg.connect(database, function (err, client, done) {
    if (err) {
        console.error('Could not connect to the database.');
        console.error(err);
        return;
    }

    var query = "SELECT COUNT(*) FROM Routes";
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
    
    var query = "SELECT COUNT(*) FROM Mail";
    client.query(query, function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        return;
      }
      else{
       mail= result.rows[0].count;
      }         
    });
    
    
    events = eventlogger.getNumberOfEvents();

    var query = "SELECT * FROM Expenditure";
    client.query(query, function (error, result) {
      done();
      if (error) {
          console.error('Failed to execute query.');
          console.error(error);
          return;
      }
      else{
        expenditure = result.rows[0].expenditure;
      }         
    });

    var query = "SELECT * FROM Revenue";
    client.query(query, function (error, result) {
      done();
      if (error) {
          console.error('Failed to execute query.');
          console.error(error);
          return;
      }
      else{
        revenue = result.rows[0].revenue;
        res.render('metrics', {  numberofroutes:routes, totalRev:revenue,totalExpenditure:expenditure,totalMail: mail, totalEvent:events});
      }
    });
  }); 
});

module.exports = router;
