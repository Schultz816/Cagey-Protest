// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get("/",  function(req, res) {
		res.sendFile(path.join(__dirname, "../public/assets/test/index-jps.html"));
	});

	// rewards route loads test-reward.html
	app.get("/rewards", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/assets/test/test-reward.html"));
	});

};