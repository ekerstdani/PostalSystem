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

 it('should add to routes table', function(){
  var route = {
    AddressOrigin: 'test',
    AddressDes:  'test',
    land: '',
    sea: '',
    air: ''}
    queries.addRoute(route, function(err, result){
      assert(result.AddressOrigin == 'test');
      assert(result.AddressDes == 'test');
    });
 });
});

describe('mail database queries', function() {
 it('should list all mail', function() {
    queries.getAllMail(function(err, result){
      assert(result.length > 0);
    });
 }); 

 it('should add to mail table', function(){
  var mail = {
    creationDate: '12-10-10',
    originID: 'Auckland',
    destinationID: 'Wellington', 
    priority: '',
    weight: 10, 
    volume: 10
  }
  queries.addMail(mail, function(err, result){
    assert(result.creationDate = '12-10-10');
    assert(result.originID = 'Auckland');
    assert(result.destinationID = 'Wellington');
  });
 });
});

describe('location database queries', function() {
 it('should list all locations', function() {
    queries.getAllLocations(function(err, result){
      assert(result.length > 0);
    });
 }); 
 it('should add to location table', function(){
  var location = {
    name: 'newLocation'
  }
    queries.addLocation(location, function(err, result){
      assert(result.name = 'newLocation');
    });
 });
});

describe('user database queries', function() {
 it('should list all users', function() {
    queries.addUser(function(err, result){
      assert(result.length > 0);
    });
 }); 
 it('should add user', function(){
  var user = {
    username : 'test',
    password : 'test',
   confirmPassword : 'test',
   realname : 'test'
  }
  queries.addUser(user, function(err, result){
    assert(result.username = 'test');
  });
 });
});