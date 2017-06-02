// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // POST route for saving a new post
    app.post("/api/users", function(req, res) {
        db.Users.create({
            username: req.body.username,
            email: req.body.email
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.get("/api/users", function(req, res) {
        db.User.findAll({}).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/chores", function(req, res) {
        db.Chore.save({}).then(function(err, data) {
            res.json(data);
        })
    })

};

