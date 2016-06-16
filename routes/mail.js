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

module.exports = router;