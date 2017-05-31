<<<<<<< HEAD
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
=======
>>>>>>> ca1493373a7b4f2bf64dbc41fb79f856bb7d3876
const express = require("express");
const bodyParser = require("body-parser");
// const expressHandlebars = require("express-handlebars");
// const methodOverride = require("method-override"); // might not need
const passport = require('passport');
const session = require('express-session');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

<<<<<<< HEAD
// <<<<<<< HEAD
// Override with POST having ?_method=DELETE
//app.use(methodOverride("_method")); // might not use

// Set Handlebars =============================================================
var exphbs = require("express-handlebars");
=======
// Override with POST having ?_method=DELETE
//app.use(methodOverride("_method")); // might not use

// Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

>>>>>>> ca1493373a7b4f2bf64dbc41fb79f856bb7d3876

// path doesn't exist yet nor does auth.js route
// //load passport strategies
// require('./config/passport/passport.js')(passport, models.user);

<<<<<<< HEAD
// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/reward-api-routes.js")(app);

=======
// Routes - not set up yet =============================================================
// var authRoute = require('./routes/auth.js')(app,passport);

require("./routes/html-routes.js")(app);
require("./routes/reward-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
>>>>>>> ca1493373a7b4f2bf64dbc41fb79f856bb7d3876

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true}).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});