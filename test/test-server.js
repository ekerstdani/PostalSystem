var chai = require('chai');
var chaiHttp = require('chai-http');
var queries = require('../queries');
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);
var pg = require('pg');
var database = "postgres://postgres:postgres@localhost:5432/swen301";



describe('database queries', function() {
  //it('check user is logged on');
  it('check mocha is working', function() {
    var arr = [];
    assert.equal(arr.length, 0);
   });
  it('count routes', function() {
    var query = "SELECT COUNT(*) FROM Routes";
  	 pg.connect(query, function (error, result) {
        done();
        if (error) {
           return
        }
        else{
          assert.equal(result.length, 2);
      }   
    });    
   });
  it('check user', function() {
    pg.connect(database, function (err, client, done) {
    if (err) {
     
      return;
    }
    client.query("DELETE FROM Mail WHERE id=" + id + ";", function (error, result) {
      done();
      if (error) {       
        return;
      }
       assert.equal(result.length, 4);
    });
  	});   
   }); 
  it('check user', function() {
    pg.connect(database, function (err, client, done) {
    if (err) {
     
      return;
    }
    client.query("DELETE FROM Mail WHERE id=" + id + ";", function (error, result) {
      done();
      if (error) {       
        return;
      }
       assert.equal(result.length, 4);
    });
  	});   
   }); 
  it('add location', function() {
    pg.connect(database, function (err, client, done) {
    if (err) {
     
      return;
    }
    client.query("DELETE FROM Mail WHERE id=" + id + ";", function (error, result) {
      done();
      if (error) {       
        return;
      }
       assert.equal(result.length, 4);
    });
  	});   
   }); 

});
