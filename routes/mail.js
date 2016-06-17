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
	var mail = {
		creatinDate: req.body.creation_date,
		originID: req.body.origin_id,
		destinationID: req.body.destination_ID, 
		priority: req.body.priority,
		weight: req.body.weight, 
		volume: req.body.volume
	}
		queries.addMail(mail, function(err) {
			if(err){
				res.render('addMail', { message: "Failed to add Route." });
			} else {
				res.redirect('/mail');
			}
		});
	});




module.exports = router;