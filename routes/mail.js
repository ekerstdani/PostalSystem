var express = require('express');
var router = express.Router();

var queries = require('../queries');

/* GET mail page. */
router.get('/', function(req, res) {
  queries.getAllMail(function(err, result){
    if(err){
      console.log(err);
    } else {
      res.render('mail', { mail: result });
    }
  });
});

/* GET addRoute page. */
router.get('/add', function(req, res) {
  res.render('addMail', { });
});

/* POST add route */
router.post('/add', function(req,res) {
  var route = {
    AddressOrigin: req.body.AddressOrigin,
    SuburbOrigin: req.body.SuburbOrigin,
    RegionOrigin: req.body.RegionOrigin, 
    CountryOrigin: req.body.CountryOrigin,
    AddressDes: req.body.AddressDes, 
    SuburbDes: req.body.SuburbDes,
    RegionDes: req.body.RegionDes,
    CountryDes: req.body.CountryDes,
    Priority: req.body.Priority,
    Land: req.body.Land,
    Sea: req.body.Sea,
    Air: req.body.Air
  };

  if (req.body.Land === null && req.body.Sea === null && req.body.Air === null) {
    res.render('addRoute', { message: "Choose a Transpostation" });
  }

  queries.addRoute(route, function(err) {
    if(err){
      res.render('addRoute', { message: "Failed to add Route." });
    } else {
      res.redirect('/routes');
    }
  });
});

module.exports = router;