// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // POST route for saving a new post
    app.post("/api/user", function(req, res) {
        db.User.create({
            username: req.body.username,
            email: req.body.email
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/user", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    });

};

