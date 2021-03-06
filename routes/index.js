var express = require('express');
var router = express.Router();
var queries = require('../queries');
var eventlogger = require('../eventlogger');

var config = require('config');
var pg = require('pg');
pg.defaults.ssl = true;

var database = "postgres://" + config.get('db.user') + ":"
  + config.get('db.pass') + "@" + config.get('db.host')
  + "/" + config.get('db.name');

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
  var totalEvent = 0;
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
    
    
    eventlogger.getNumberOfEvents(function(total) {
      totalEvent = total;
    });

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
        res.render('metrics', {  numberofroutes:routes, totalRev:revenue,totalExpenditure:expenditure,totalMail: mail, totalEvent:totalEvent});
      }
    });
  }); 
});

module.exports = router;
