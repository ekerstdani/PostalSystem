var express = require('express');
var router = express.Router();

//At Uni
//var pg = require('pg').native;
//var database = "postgres://depot:5432/Swen301";

//At Home
var pg = require('pg');
var database = "postgres://postgres:w2sybb57@localhost:5432/swen301";

pg.connect(database, function (err) {
  if (err) {
    console.error('Could not connect to the database.');
    console.error(err);
    return;
  }

  console.log('Connected to database.');
});

var websiteName = 'KPS';
var signedInUser = '';
var signedInUserRealname = '';
var manager='';
var signedInUserUID = 0;







/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: websiteName, signedInUser: signedInUser, message: "Logged Out", id: signedInUserUID, manager: manager });
});
/* GET home page. */
router.get('/mainPage', function(req, res) {
  res.render('mainPage', { title: websiteName, signedInUser: signedInUser, message: req.query.message, redirect: req.query.redirect, id: signedInUserUID,manager: manager });
});

/* GET deleteRoute page. */
router.get('/deleteRoute', function(req, res) {
  res.render('deleteRoute', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, manager: manager});
});


/* GET routes page. */
router.get('/routes', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        var query = "SELECT * FROM Routes" ;
        client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }
            res.render('routes', { title: websiteName, list: result.rows, message: req.query.message, signedInUser: signedInUser, redirect: req.query.redirect, id: signedInUserUID,manager: manager });
        });
    });
});

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, manager: manager});
});



router.get('/login', function(req, res) {
  res.render('login', { title: websiteName, message: req.query.message, signedInUser: signedInUser, redirect: req.query.redirect, id: signedInUserUID, manager: manager });
});

router.get('/editRoute', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        var query = "SELECT * FROM Routes WHERE sid=" + req.query.sid + ";";

        client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }

            var product = result.rows[0];

            if (product.quantity > 0)
                res.render('editRoute', { title: websiteName, signedInUser: signedInUser, product: product, inStock: true, id: signedInUserUID });
            else
                res.render('editRoute', { title: websiteName, signedInUser: signedInUser, product: product, inStock: false, id: signedInUserUID });
        });
    });
});


router.get('/addRoute', function(req, res) {
  res.render('addRoute', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, manager: manager});
});


/* GET deleteRoute page. */
router.get('/checkFigure', function(req, res) {
  res.render('checkFigure', { title: websiteName, signedInUser: signedInUser, message: "", id: signedInUserUID, manager: manager});
});









router.get('/doLogin', function(req, res) {
  var username = req.query.username;
  var password = req.query.password;
 
  pg.connect(database, function (err, client, done) {
    if (err) {
      console.error('Could not connect to the database.');
      console.error(err);
      return;
    }

    client.query("SELECT * FROM Users;", function (error, result) {
      done();
      if (error) {
        console.error('Failed to execute query.');
        console.error(error);
        return;
      }

      var message = "Invalid username or password.";
		
      for (var i = 0; i < result.rows.length; i++) {
        if (result.rows[i].username == username) {
          if (result.rows[i].password == password) {
            message = "Signed in successfully.";
				
            signedInUser = username;
            signedInUserRealname = result.rows[i].realname;
            signedInUserUID = result.rows[i].uid;
            manager = result.rows[i].manager;
            
            

            
            res.render('mainPage', { title: websiteName,signedInUser: signedInUser, message: "Logged in as "+ signedInUser, redirect: req.query.redirect, id: signedInUserUID, manager: manager });
          }
          else {
            message = "Incorrect password.";
          }
        }
      }

      res.render('index', { title: websiteName,signedInUser: signedInUser, message: message, redirect: req.query.redirect, id: signedInUserUID,  manager: manager});
    });
  });
});






router.get('/doSignUp', function(req, res) {
  if (req.query.password != req.query.confirmPassword) {
    res.render('signUp', { title: websiteName, message: "The passwords do not match." });
  }
  else if (req.query.username == "" || req.query.realname == "") {
    res.render('signUp', { title: websiteName, message: "Please fill out the entire form." });
  }
  else {
    pg.connect(database, function (err, client, done) {
      if (err) {
        console.error('Could not connect to the database.');
        console.error(err);
        return;
      }

      var query = "INSERT INTO Users (username, realname, password, manager) VALUES ('";
      query += req.query.username;
      query += "', '";
      query += req.query.realname;
      query += "', '";
      query += req.query.password;
      query += "', '";
      if(req.query.manager!=null){
			query += req.query.manager;
      	query += "');"; 
      }
      else {
      	query += "f');";
      }
      

      client.query(query, function (error, result) {
        done();
        if (error) {
          console.error('Failed to execute query.');
          console.error(error);
          return;
        }

        res.render('mainPage', { title: websiteName,signedInUser: signedInUser, message: "Signed Up "+req.query.username+" Successfully", redirect: req.query.redirect, id: signedInUserUID, manager: manager });
      });
    });
  }
});



router.get('/doAddRoute', function(req,res){
	var AddressOrigin=req.query.AddressOrigin; 	
	var SuburbOrigin=req.query.SuburbOrigin; 
	var RegionOrigin=req.query.RegionOrigin; 
	var CountryOrigin=req.query.CountryOrigin; 
	var AddressDes=req.query.AddressDes; 
	var SuburbDes=req.query.SuburbDes;
	var RegionDes=req.query.RegionDes; 
	var CountryDes=req.query.CountryDes;
	var Priority= req.query.Priority;
	var Land = req.query.Land;
	var Sea = req.query.Sea;
    var Air= req.query.Air;

    if (req.query.Land == null && req.query.Sea == null && req.query.Air == null) {
        res.render('addRoute', { title: websiteName, message: "Choose a Transpostation" });
    }

    else{
        pg.connect(database, function (err,client,done) {
            if (err) {
                console.error('Could not connect to the database.');
                console.error(err);
                return;
            }


            var query = "INSERT INTO Routes (addressorigin, suburborigin, regionorigin, countryorigin, addressdes,suburbdes,regiondes,countrydes,priority,land,sea,air) VALUES ('";
            query += AddressOrigin
            query += "', '";
            query += SuburbOrigin
            query += "', '";
            query += RegionOrigin
            query += "', '";
            query += CountryOrigin
            query += "', '";
            query += AddressDes
            query += "', '";
            query += SuburbDes
            query += "', '";
            query += RegionDes
            query += "', '";
            query += CountryDes
            query += "', '";
            query += Priority
            query += "', '";

            if(req.query.Land!=null){
                query += req.query.Land;
                query += "', '";
            }
            else {
                query += "f', '";
            }

            if(req.query.Sea!=null){
                query += req.query.Sea;
                query += "', '";
            }
            else {
                query += "f', '";
            }

            if(req.query.Air!=null){
                query += req.query.Air;
                query += "');";
            }
            else {
                query += "f');";
            }



            client.query(query, function (error, result) {
                done();
                if (error) {
                    console.error('Failed to execute query.');
                    console.error(error);
                    return;
                }

                client.query("SELECT * FROM Routes;", function (error, result) {
                    done();
                    if (error) {
                        console.error('Failed to execute query.');
                        console.error(error);
                        return;
                    }


                    res.render('routes', {
                        title: websiteName,
                        list: result.rows,
                        message: "Added Succesfully",
                        signedInUser: signedInUser,
                        redirect: req.query.redirect,
                        id: signedInUserUID,
                        manager: manager,
                        product: result.rows[0]
                    });

                });
            });
        });
    }
});

router.get('/doDeleteRoute', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        client.query("DELETE FROM Routes WHERE sid=" + req.query.sid + ";", function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }

            client.query("SELECT * FROM Routes;", function (error, result) {
                done();
                if (error) {
                    console.error('Failed to execute query.');
                    console.error(error);
                    return;
                }


                res.render('routes', {
                    title: websiteName,
                    list: result.rows,
                    message: "Deleted Succesfully",
                    signedInUser: signedInUser,
                    redirect: req.query.redirect,
                    id: signedInUserUID,
                    manager: manager
                });

            });
        });
        });
    });




router.get('/doEditRoute', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        var query = "UPDATE route SET " +
            "uid = " + signedInUserUID + ", " +
            "addressorigin="+ req.query.AddressOrigin +","+
            "suburborigin=" + req.query.SuburbOrigin+","+
            "regionorigin=" +req.query.RegionOrigin+","+
            "countryorigin="+req.query.CountryOrigin+","+
            "addressdes="+req.query.AddressDes+","+
            "suburbdes="+req.query.SuburbDes+","+
            "regiondes="+req.query.RegionDes+","+
            "countrydes="+req.query.CountryDes+","+
            "priority="+req.query.Priority+","+
            "land="+req.query.Land+","+
            "sea="+req.query.Sea+","+
            "air="+req.query.Air+
            ";"


        if(req.query.Land!=null){
            query += req.query.Land;
            query += "', '";
        }
        else {
            query += "f', '";
        }

        if(req.query.Sea!=null){
            query += req.query.Sea;
            query += "', '";
        }
        else {
            query += "f', '";
        }

        if(req.query.Air!=null){
            query += req.query.Air;
            query += "');"+"' WHERE sid=" + req.query.sid + " " +
                "RETURNING sid;";;
        }
        else {
            query += "f');"+"' WHERE sid=" + req.query.sid + " " +
                "RETURNING sid;";;
        }


        client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }

            client.query("SELECT * FROM route WHERE sid=" + result.rows[0].sid, function (error, result) {
                done();
                if (error) {
                    console.error('Failed to execute query.');
                    console.error(error);
                    return;
                }

                client.query("SELECT * FROM route WHERE uid=" + signedInUserUID + ";", function (error, result) {
                    done();
                    if (error) {
                        console.error('Failed to execute query.');
                        console.error(error);
                        return;
                    }


                        res.render('routes', {title: websiteName, signedInUser: signedInUser, list: result.rows, id: signedInUserUID, user: result2.rows[0] });
                    });
            });
        });
    });
});


/* GET routes page. */
router.get('/editAccount', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        var query = "SELECT * FROM Users" ;
        client.query(query, function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }
            res.render('editAccount', { title: websiteName, list: result.rows, message: req.query.message, signedInUser: signedInUser, redirect: req.query.redirect, id: signedInUserUID,manager: manager });
        });
    });
});




router.get('/doDeleteAccount', function(req, res) {
    pg.connect(database, function (err, client, done) {
        if (err) {
            console.error('Could not connect to the database.');
            console.error(err);
            return;
        }

        client.query("DELETE FROM Users WHERE uid=" + req.query.uid + ";", function (error, result) {
            done();
            if (error) {
                console.error('Failed to execute query.');
                console.error(error);
                return;
            }

            client.query("SELECT * FROM Users;", function (error, result) {
                done();
                if (error) {
                    console.error('Failed to execute query.');
                    console.error(error);
                    return;
                }


                res.render('editAccount', {
                    title: websiteName,
                    list: result.rows,
                    message: "Deleted Succesfully",
                    signedInUser: signedInUser,
                    redirect: req.query.redirect,
                    id: signedInUserUID,
                    manager: manager
                });

            });
        });
    });
});



module.exports = router;
