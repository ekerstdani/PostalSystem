var express = require('express');
var router = express.Router();

var queries = require('../queries');

/* GET routes page. */
router.get('/', function(req, res) {
  queries.getAllRoutes(function(err, result){
    if(err){
      console.log(err);
    } else {
      res.render('routes', { list: result, message: req.query.message, redirect: req.query.redirect });
    }
  });
});

/* GET edit routes page. */
router.get('/edit/:id', function(req, res) {
  queries.getRouteById(req.params.id, function(err, result){
    if(err){
      res.redirect('/routes');
    } else {
      res.render('editRoute', { product: result });
    }
  });
});

/* POST edit route. */
router.post('/edit/:id', function(req, res) {
  var route = {
    Id: req.params.id,
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

  queries.editRouteById(route, function(err){
    if(err){
      res.render('editRoute', { signedInUser: signedInUser, product: product, inStock: false, id: signedInUserUID });
    } else {
      res.redirect('/')
    }
  });
});

/* GET addRoute page. */
router.get('/add', function(req, res) {
  res.render('addRoute', { });
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

/* POST delete route */
router.post('/delete/:id', function(req, res) {
  var id = req.params.id;
  console.log(id)
  queries.removeRouteById(id, function(err) {
    if(err){
      res.render('deleteRoute', { message: "Failed to remove Route." });
    } else {
      res.redirect('/routes');
    }
  });
});

module.exports = router;
