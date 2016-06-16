var express = require('express');
var router = express.Router();

var queries = require('../queries');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: websiteName, signedInUser: signedInUser, message: "Logged Out", id: signedInUserUID, manager: manager });
});

module.exports = router;