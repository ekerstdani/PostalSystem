var pg = require('pg');
var eventlogger = require('./eventlogger');

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

    var query = "SELECT * FROM Routes;";
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

    var query = `INSERT INTO Routes (origin_name, destination_name, land,
    sea, air,trans_weight_cost,trans_volume_cost,cust_weight_cost,cust_volume_cost) VALUES ('${route.origin_name}', '${route.destination_name}','`;

    route.land !=null ? query += route.land + "', '" : query += "f', '";
    route.sea !=null ? query += route.sea + "', '" : query += "f', '";
    route.air !=null ? query += route.air + "', " : query += "f',";
    query += `${route.trans_weight_cost},`
    query += `${route.trans_volume_cost},`
    query += `${route.cust_weight_cost},`
    query += `${route.cust_volume_cost}`
    query += ");";

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

    var query = `UPDATE Routes SET  
    trans_weight_cost='${route.trans_weight_cost}', 
    trans_volume_cost='${route.trans_volume_cost}', 
    cust_weight_cost='${route.cust_weight_cost}', 
    cust_volume_cost='${route.cust_volume_cost}'`;
    query += 'WHERE id=' + route.id + ";"

    client.query(query, function (error, result) {
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

exports.removeMail = function(id, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }

    client.query("DELETE FROM Mail WHERE id=" + id + ";", function (error, result) {
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

exports.getAllLocations = function(callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = "SELECT * FROM Locations ORDER BY name ASC;";
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

exports.getLocationById = function(id, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = "SELECT * FROM Locations WHERE id=" + id + ";";
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

exports.addLocation = function(location, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = `INSERT INTO Locations VALUES ('${location.name}');`;
    client.query(query, function(error, result){
      done();
      if(error){
        console.error('Failed to add location.');
        console.error(error);
        callback(err);
        return;
      }
      callback(null);
    });
  });
}

exports.addUser = function(user, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }
    console.log(user.username);
    var query = `INSERT INTO Users VALUES ('${user.username}','${user.realname}','${user.password}','${user.manager}') `;


    client.query(query, function(error, result){
      done();
      if(error){
        console.error('Failed to add user.');
        console.error(error);
        callback(err);
        return;
      }
      console.log('added query')
      callback(null);
    });
  });
}

exports.editLocationById = function(id, name, callback){
  pg.connect(database, function (err,client,done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = `UPDATE Locations SET name='${name}'`;
    query += 'WHERE id=' + id + ";"

    client.query(query, function (error, result) {
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

exports.getAllMail = function(callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = "SELECT * FROM Mail ORDER BY creation_date ASC;";
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

exports.addMail = function(mail, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }
    var query = `INSERT INTO Mail (creation_date, origin_name, destination_name,
    priority , weight , volume) 
    VALUES ('${mail.creationDate}', '${mail.originID}', 
    '${mail.destinationID}', '${mail.priority}', 
    '${mail.weight}', '${mail.volume}') `;

    client.query(query, function(error, result){
      done();
      if(error){
        console.error('Failed to add mail.');
        console.error(error);
        callback(err);
        return;
      }
      eventlogger.logEvent(mail, 'mail');
      callback(null);
    });
  });
}

exports.getAllUsers = function(callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = "SELECT * FROM Users;";
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

exports.getAccountById = function(id, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      callback(err);
      return;
    }

    var query = "SELECT * FROM Users WHERE uid=" + id + ";";
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

/* -------- EXPERIMENTAL ROUTING -------- */

/* current location, callback constructs graph for neighbours */
exports.getNeighbouringLocations = function(location, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }

    var query = "SElECT * FROM Locations l " + 
    "LEFT JOIN routes r ON l.name = r.destination_name WHERE r.origin_name = '" +
    location + "';";
    client.query(query, function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        callback(err);
        return;
      }
      callback(err, result);   
    });
  });
}
exports.deleteLocation = function(name, callback){
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }

    client.query("DELETE FROM Locations WHERE name='" + name + "';", function (error, result) {
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

exports.getSignedInUser = function(){
  return signedInUser;
}

exports.isManager = function(){
  return manager;
}