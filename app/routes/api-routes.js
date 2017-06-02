// Requiring our models
var db = require("../models/index");

// Routes
// =============================================================
module.exports = function(app) {

    // // POST route for saving a new post
    // app.post("/api/users", function(req, res) {
    //     db.users.create({
    //         username: req.body.username,
    //         email: req.body.email
    //     }).then(function(dbUser) {
    //         res.json(dbUser);
    //     });
    // });
    //
    // app.get("/api/users", function(req, res) {
    //     db.users.findAll({}).then(function(dbUser) {
    //         res.json(dbUser);
    //     });
    // });

  app.get("/api/child/:pid", function(req, res) {
    db.users.findAll({
      where: {
        parentId: req.params.pid
      }
    }).then(function(dbUser) {
      console.log(
        "in api/child/pid .then dbUser= " +
        JSON.stringify(dbUser, null, 2));
      res.json(dbUser[0]);
    });
  });


  app.get("/api/chores/:id", function(req, res) {
    db.users.findAll({

      include: [{
        model: db.chores,
        where: { userId: req.params.id}
      }]

    }).then(function(user) {
      let chores = user[0].chores; // chores is an array
      console.log(
      "in api/chores/id .then chores= " +
      JSON.stringify(chores, null, 2));
      res.json(chores);
    });
  });

};

// works because Chores has a userId column
// i.e., Chores has a Users foreign-key
// Users.findAll({
//   include: [{
//     model: Chores,
//     where: { userId: 1}
//   }]
// }).then(data => {
//   console.log("User Id 1's chores: " + JSON.stringify(data, null, 2));
// })