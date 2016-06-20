var chai = require('chai');
var queries = require('../queries');
var should = chai.should();
var assert = chai.assert;

describe('routes database queries', function() {

 it('should list all routes', function() {
    queries.getAllRoutes(function(err, result){
      assert(result.length > 0);
    });
 });

 it('should get a route by id', function(){
    queries.getRouteById(1, function(err, result){
      assert(result.id == 1);
    });
 });

});
