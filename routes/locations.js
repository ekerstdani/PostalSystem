var express = require('express');
var router = express.Router();

var queries = require('../queries');

/* GET locations page. */
router.get('/', function(req, res) {
  queries.getAllLocations(function(err, result){
    if(err){
      console.log(err);
    } else {
      res.render('locations', { locations: result });
    }
  });
});

/* GET add location page. */
router.get('/add', function(req, res) {
  res.render('addLocation', { });
});

/* GET edit locations page. */
router.get('/edit/:id', function(req, res) {
  queries.getLocationById(req.params.id, function(err, result){
    if(err){
      res.redirect('/locations');
    } else {
    	console.log(result);
      res.render('editLocation', { location: result });
    }
  });
});

/* POST edit location. */
router.post('/edit/:id', function(req, res) {
  queries.editLocationById(req.params.id, req.body.location_name, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/locations')
    }
  });
});

/* POST add location */
router.post('/add', function(req,res) {
  var mail = {
    location: req.body.name
  }
  
  queries.addLocation(mail, function(err) {
    if(err){
      res.render('addLocation', { message: "Failed to add Location." });
    } else {
      res.redirect('/locations');
    }
  });
});

module.exports = router;