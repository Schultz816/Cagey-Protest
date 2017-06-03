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
app.use(express.static("./app/public"));


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

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function () {

    console.log('Nice! Database looks fine')

    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!");

});
