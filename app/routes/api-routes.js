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
      //console.log("uzzer= " + JSON.stringify(user,null,1));

      if(typeof user[0] !== 'undefined') {
        let chores = user[0].chores; // chores is an array
        console.log(
          "in api/chores/id .then chores= " +
          JSON.stringify(chores, null, 2));
        res.json(chores);
      }
      else {
        res.json(null);
      }

    });
  });


  app.delete("/api/chores/:id", function(req, res) {

    console.log("in delete chores/id: " + req.params.id);

    db.chores.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      //res.json(dbAuthor);
      console.log("in chore-delete then");
    });


  });

  app.put("/api/chores/:id", function(req, res){
    console.log("in PUT chores, id: " + req.params.id);

    db.chores.findOne({
      where: {
        id: req.params.id
      }
    }).then(chore => {
      console.log("choreeeee: " + JSON.stringify(chore, null,1));

      db.chores.upsert({
        id: req.params.id,
        name: chore.name, //"Wowwwwwwwww!",
        completed: true,
        pointsWorth: chore.pointsWorth
        // where: {
        //   id: req.params.id
        // }
      }).then( chore => {
        console.log(
          "in chore-PUT then: "
          + JSON.stringify(chore));
        res.json(chore)
      })
    });
  })

  app.post("/api/chores/:id", function(req, res) {
    console.log("in POST chores, id: " + req.params.id);

    db.chores.create({
      name: req.body.name,
      pointsWorth: req.body.pointsWorth,
      userId: 2
    })
      .then( newChore => {
        console.log(
          "in chore-post then: "
          + JSON.stringify(newChore));
        res.json(newChore)
      });

  });


}; // end function(app)


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