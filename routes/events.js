var express = require('express');
var router = express.Router();

var eventlogger = require('../eventlogger');

/* GET mail event page. */
router.get('/mail', function(req, res) {
  eventlogger.getAllMailEvents(function(err, result){
    if(err){
      console.log(err);
    } else {
      res.render('mailevent', { events: JSON.stringify(result) });
    }
  });
});

/* GET cost event page. */
router.get('/cost', function(req, res) {
  eventlogger.getAllCostEvents(function(err, result){
    if(err){
      console.log(err);
    } else {
      res.render('costevent', { events: JSON.stringify(result) });
    }
  });
});

/* GET discontinue event page. */
router.get('/discontinue', function(req, res) {
  eventlogger.getAllDiscontinueEvents(function(err, result){
    if(err){
      console.log(err);
    } else {
      res.render('discontinueevent', { events: JSON.stringify(result) });
    }
  });
});

module.exports = router;