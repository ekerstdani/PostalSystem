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

/* GET add mail page. */
router.get('/add', function(req, res) {
	res.render('addMail');
});

/* POST add mail */
router.post('/add', function(req,res) {
	var mail = {
		creationDate: req.body.creation_date,
		originID: req.body.originID,
		destinationID: req.body.destinationID, 
		priority: req.body.Priority,
		weight: req.body.weight, 
		volume: req.body.volume
	}
  
	queries.addMail(mail, function(err) {
		if(err){
			res.render('addMail', { message: "Failed to add Mail." });
		} else {
			res.redirect('/mail');
		}
	});
});

/* POST delete mail */
router.post('/delete/:id', function(req, res) {
  var id = req.params.id;
  console.log(id)
  queries.removeMail(id, function(err) {
    if(err){
      res.render('deleteRoute', { message: "Failed to remove mail." });
    } else {
      res.redirect('/mail');
    }
  });
});

module.exports = router;