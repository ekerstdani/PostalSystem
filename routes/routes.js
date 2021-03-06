var express = require('express');
var router = express.Router();

var queries = require('../queries');
var eventlogger = require('../eventlogger');

/* GET routes page. */
router.get('/', function(req, res) {
  queries.getAllRoutes(function(err, result){
    if(err){
      console.log(err);
    } else {
      res.render('routes', { routes: result });
    }
  });
});

/* GET addRoute page. */
router.get('/add', function(req, res) {
  queries.getAllLocations(function(err, result){
    if(err){
      console.log(err);
    } else {
      console.log(result)
      res.render('addRoute', { locations: result });
    }
  });
});

/* GET edit routes page. */
router.get('/edit/:id', function(req, res) {
  queries.getRouteById(req.params.id, function(err, route){
    if(err){
      res.redirect('/routes');
    } else {
      res.render('editRoute', { route: route });
    }
  });
});

/* POST edit route. */
router.post('/edit/:id', function(req, res) {
  var route = {
    id: req.params.id,
    trans_weight_cost: req.body.trans_weight_cost,
    trans_volume_cost: req.body.trans_volume_cost,
    cust_weight_cost: req.body.cust_weight_cost,
    cust_volume_cost: req.body.cust_volume_cost
  };

  queries.editRouteById(route, function(err){
    if(err){
      res.render('editRoute', { route: route });
    } else {
      res.redirect('/routes')
    }
  });
});

/* POST add route */
router.post('/add', function(req,res) {
  console.log(req.body)
  var route = {
    id: req.params.id,
    origin_name: req.body.AddressOrigin,
    destination_name: req.body.AddressDes,
    land: req.body.Land,
    sea: req.body.Sea,
    air: req.body.Air,
    trans_weight_cost: req.body.trans_weight_cost,
    trans_volume_cost: req.body.trans_volume_cost,
    cust_weight_cost: req.body.cust_weight_cost,
    cust_volume_cost: req.body.cust_volume_cost
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
  queries.getRouteById(id, function(err, result){
    console.log(result);
    eventlogger.logEvent(result, 'discontinue');
  });
  queries.removeRouteById(id, function(err) {
    if(err){
      res.render('deleteRoute', { message: "Failed to remove Route." });
    } else {
      res.redirect('/routes');
    }
  });
});

module.exports = router;
