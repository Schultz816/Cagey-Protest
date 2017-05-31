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
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    app.get("/api/testHome", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/testHome.html"));
    });

    app.get("/rewards", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/test-reward.html"));
    });

    app.get("/home/:id", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/admin-home.html"));
    });

    app.get("/profile/:id", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/user-home.html"));
    });
};
