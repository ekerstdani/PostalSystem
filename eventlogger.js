var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

/* only works if an event of the type is already present */
exports.logEvent = function(event, type) {
  fs.readFile('event_log.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
      switch(type) {
        case 'mail': //new mail
          result.simulation.mail.push(event);
          break;
        case 'cost': //trans cost update
          result.simulation.cost.push(event);
          break;
        case 'price': //cust price update
          result.simulation.price.push(event);
          break;
        case 'discontinue': //discontinue route
          result.simulation.price.push(event);
          break;
        default:
          console.log(err);
      } 
      console.log(result);
      var xml = builder.buildObject(result);
      fs.writeFile('event_log.xml', xml, function(err) {
        if(err){
          console.log(err);
        }
      });
    });
  });
}