var express = require('express');
var router = express.Router();
var queries = require('../queries');

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
//var database = "postgres://postgres:123456@localhost:5432/postgres";
//var pg = require('pg');
var database = "postgres://postgres:postgres@localhost:5432/swen301";
var items = [];
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
  res.render('mainPage', { message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, manager: manager,items:items });
});

router.get('/checkFigure', function(req, res){
  var routes = 0;
  var revenue = 0;
  var expenditure = 0;
  var mail = 0;
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
    var query = "SELECT COUNT(*) FROM Mail" ;
    client.query(query, function (error, result) {
        done();
        if (error) {
            console.error('Failed to execute query.');
            console.error(error);
            return;
        }
        else{
         mail= result.rows[0].countl;
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
          expenditure = result.rows[0].expenditure;
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

          res.render('checkFigure', {  numberofroutes:routes, totalRev:revenue,totalExpenditure:expenditure,totalMail: mail});

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

/* GET routes page. */
router.get('/search', function(req, res) {
   
var items =[];
pg.connect(database, function (err, client, done) {
    if (err) {
        console.error('Could not connect to the database.');
        console.error(err);
        return;
    }

    var query = "SELECT * FROM Routes" ;
    client.query(query, function (error, result) {
        done();
        if (error) {
            console.error('Failed to execute query.');
            console.error(error);               
            return;
        }

        for(var i=0; i<result.rows.length; i++){
            var item = {
                addressorigin: result.rows[i].addressorigin,
                suberborigin: result.rows[i].suberborigin,
                regionorigin: result.rows[i].regionorigin,
                addressdes: result.rows[i].addressdes,
                suburbdes: result.rows[i].suburbdes,
                regiondes: result.rows[i].regiondes,
                countrydes: result.rows[i].countrydes,
                priority: result.rows[i].priority,

            };
            items.push(item);
        }
        console.error(items); 
        console.log(item.regiondes);
        res.render('mainPage', { message: req.query.message, redirect: req.query.redirect, id: signedInUserUID, manager: manager,items:items});

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
