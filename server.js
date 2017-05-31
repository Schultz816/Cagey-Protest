// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies

//set up express app
const express = require("express");
const app = express();
//required for authentication
const passport   = require('passport')
const session    = require('express-session')
//parse request bodies into JSON
const bodyParser = require("body-parser");
//handles environment variables
const env = require('dotenv').load();
const exphbs = require("express-handlebars");

//set up port
const PORT = process.env.PORT || 8080;

//requiring our models for syncing
const db = require("./app/models");

// Sets up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("./public"));

// Set Handlebars
app.set('views', './app/views')
app.engine("handlebars", exphbs({
    extname: '.handlebars'
}));
app.set("view engine", ".handlebars");

// Routes - not set up yet =============================================================

require("./app/routes/html-routes.js")(app);
require("./app/routes/api-routes.js")(app);
require('./app/routes/auth.js')(app, passport);
require('./app/config/passport/passport.js')(passport, db.user);
require("./routes/reward-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {

  console.log('Nice! Database looks fine')

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});;
