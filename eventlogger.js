var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

/* result is json, convert back to xml */
exports.logEvent = function(json_event) {
  fs.readFile('event_log.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
      console.log(result);

      //not correct way to append the json
      result.simulation = json_event;

      var xml = builder.buildObject(result);
      fs.writeFile('event_log.xml', xml, function(err) {
        if(err){
          console.log(err);
        }
      });
    });
  });
}