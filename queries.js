var pg = require('pg').native;

var database = "postgres://postgres:postgres@localhost:5432/swen301";

var signedInUser = '';
var manager = false;

exports.getRouteById = function(id, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = "SELECT * FROM Routes WHERE id=" + id + ";";
    client.query(query, function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(err);
        return;
      }
      callback(null, result.rows[0]);
    });
  });
}

exports.getAllRoutes = function(callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = "SELECT * FROM Routes" + ";";
    client.query(query, function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(error)
        return;
      }
      callback(null, result.rows);
    });
  });
}

exports.addRoute = function(route, callback){
  pg.connect(database, function (err,client,done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = `INSERT INTO Routes (addressorigin, suburborigin, regionorigin, 
    countryorigin, addressdes,suburbdes, regiondes, countrydes, priority, land,
    sea, air) VALUES ('${route.AddressOrigin}', '${route.SuburbOrigin}', 
    '${route.RegionOrigin}', '${route.CountryOrigin}', 
    '${route.AddressDes}', '${route.SuburbDes}', '${route.RegionDes}', '${route.CountryDes}', 
    '${route.Priority}', '`;

    route.Land!=null ? query += route.Land + "', '" : query += "f', '";
    route.Sea!=null ? query += route.Sea + "', '" : query += "f', '";
    route.Air!=null ? query += route.Air + "')" : query += "f')"
    query += " RETURNING id;";

    console.log(query);

    client.query(query, function(error, result){
      done();
      if(error){
        console.error('Failed to add route.');
        console.error(error);
        return;
      }
      callback(null);
    });
  });
}

exports.editRouteById = function(route, callback){
  pg.connect(database, function (err,client,done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = `UPDATE Routes SET AddressOrigin='${route.AddressOrigin}', 
    SuburbOrigin='${route.SuburbOrigin}', RegionOrigin='${route.RegionOrigin}', 
    CountryOrigin='${route.CountryOrigin}', AddressDes='${route.AddressDes}', 
    SuburbDes='${route.SuburbDes}', CountryDes='${route.CountryDes}', 
    Priority='${route.Priority}', Land='${route.Land}', Sea='${route.Sea}',
    Air='${route.Air}'`;
    query += 'WHERE uid=' + route.Id + ";"

    client.query(query, function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(err);
        return;
      }
      callback(err);   
    });
  });
}

exports.removeRouteById = function(id, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }

    client.query("DELETE FROM Routes WHERE id=" + id + ";", function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(err);
        return;
      }
      callback(null);
    });
  });
}

exports.login = function(username, password, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    client.query("SELECT * FROM Users WHERE Username='" + username + "' AND Password='" + password + "';", function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(err);
        return;
      }
      if (result.rows[0] == null){
        callback('error');
        return
      }
      signedInUser = result.rows[0].realname;
      manager = result.rows[0].manager;
      console.log(signedInUser);
      callback(null, result.rows[0]);
    });
  });
}

exports.signup = function(username, realname, password, manager, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }
    var query = `INSERT INTO Users VALUES ('${username}', '${realname}', 
    '${password}', '`;
    manager!=null ? query += manager + "');" : query += "f');"; 

    client.query(query, function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(err);
        return;
      }
      callback(err);   
    });
  });
}

exports.editAccount = function(id, username, realname, password, manager, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }
    var query = `UPDATE Users SET username='${username}', realname='${realname}', 
    password='${password}', '`;   
    manager!=null ? query += manager + "';" : query += "f';";
    query += 'WHERE uid=' + id + ";"

    client.query(query, function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(err);
        return;
      }
      callback(err);   
    });
  });
}

exports.getSignedInUser = function(){
  return signedInUser;
}