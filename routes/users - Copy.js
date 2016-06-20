var express = require('express');
var router = express.Router();

var queries = require('../queries');

var signedInUserRealname = '';
var manager='';
var signedInUserUID = 0;

router.get('/signup', function(req, res) {
  res.render('signup' );
});

module.exports = router;
