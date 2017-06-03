// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies

//set up express app
const express = require("express");
const app = express();
//required for authentication
const passport = require('passport')
const session = require('express-session')
//parse request bodies into JSON
const bodyParser = require("body-parser");
//handles environment variables
const env = require('dotenv').load();
const exphbs = require("express-handlebars");

//set up port
const PORT = process.env.PORT || 8080;

//requiring our models for syncing
const db = require("./app/models/index");

//require path
var path = require("path");

// Sets up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// For Passport
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static(path.join(__dirname, "/app/public")));


// Set Handlebars

// app.set('views', './app/views')
// app.engine("hbs", exphbs({
//     defaultLayout: "main"
// }));
// app.set("view engine", ".hbs");

app.set('views', path.join(__dirname, 'views')); // dynamic variable : all views in views directory
app.engine('handlebars', exphbs({defaultLayout: 'main'}));//Master page
app.set('view engine', 'handlebars');


// ROUTES
require('./app/routes/auth.js')(app, passport);
require('./app/config/passport/passport.js')(passport, db.user);
require("./app/routes/reward-api-routes.js")(app);
require("./app/routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({force: true}).then(function () {

    console.log('Nice! Database looks fine')

    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });


  db.user.create({
    parent_id: null,
    firstname: "Pam",
    username: "bossmom1",
    email: "pam@aol.com",
    password: "test",
    points_earned: null,
  });

  db.user.create({
    parentId: 1,
    firstname: "Susie",
    username: "lilsuze",
    email: "suze@aol.com",
    password: "test",
    points_earned: null,
  });

  // creating 3 chores for susie

  db.chores.create({
    name: "dishes",
    pointsWorth: 150,
    userId: 2
  });

  db.chores.create({
    name: "laundry",
    pointsWorth: 250,
    userId: 2
  });

  db.chores.create({
    name: "trash",
    pointsWorth: 50,
    userId: 2
  });

  db.rewards.create({
    name: "movie ticket",
    redeemAmount: "200",
    userId: 2
  });

  db.rewards.create({
    name: "pool party",
    redeemAmount: "500",
    userId: 2
  });


}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!");

});
