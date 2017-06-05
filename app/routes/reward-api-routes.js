// <<<<<<< HEAD:app/routes/reward-api-routes.js
// var db = require("../models/index");
// =======
 // Created by Julia on 5/28/2017.

var db = require("../models/index");
// julia2:routes/reward-api-routes.js

module.exports = function(app) {

  // app.get("/api/child/:pid", function(req, res) {
  //   db.user.findAll({
  //     where: {
  //       parentId: req.params.pid
  //     }
  //   }).then(function(dbUser) {
  //     console.log(
  //       "in REWARD -api/child/pid .then user= " +
  //       JSON.stringify(dbUser, null, 2));
  //     res.json(dbUser[0]);
  //   });
  // });

	app.get("/api/user/:id", function(req, res) {

		db.user.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(user) {
      console.log("in find user,  user: "
        + JSON.stringify(user,null,1));

			res.json(user);
		});

	});

  app.get("/api/rewards/:id", function(req, res) {
    db.user.findAll({

      include: [{
        model: db.rewards,
        where: { userId: req.params.id}
      }]

    }).then(function(user) {
      // console.log("uzzer= " + JSON.stringify(user,null,1));
			// console.log('typeof user ' + typeof user );

      //if(typeof user !== 'object') {
      if(typeof user[0] !== 'undefined') {
        let rewards = user[0].rewards; // chores is an array
        // console.log(
        //   "in api/chores/id .then chores= " +
        //   JSON.stringify(chores, null, 2));
        res.json(rewards);
      }
      else {
      	console.log("IN rewards/id GET, user = undef")
        res.json(null);
      }

    });
  });

  app.post("/api/rewards/:id", function(req, res) {
    console.log("in POST rewards, id: " + req.params.id);

    db.rewards.create({
      name: req.body.name,
      redeemAmount: req.body.redeemAmount,
      userId: req.params.id
    })
      .then( newChore => {
        console.log(
          "in Reward-post then: "
          + JSON.stringify(newChore));
        res.json(newChore)
      });

  });


  app.delete("/api/rewards/:id", function(req, res) {

    console.log("in delete rewards/id: " + req.params.id);

    db.rewards.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
      console.log("in chore-delete then");
    });

  });

  app.put("/api/rewards/:id", function(req, res){
    console.log("in PUT rewards, id: " + req.params.id);

    var points = 0;

    db.rewards.findOne({
      where: {
        id: req.params.id
      }
    }).then(reward => {
      console.log("choreeeee: " + JSON.stringify(reward, null,1));

      points += reward.redeemAmount;

      db.user.findOne({
				where: {
					id: reward.userId
				}
			}).then( user => {

				points = user.pointsEarned - points;

				db.user.upsert({
					id: user.id,
					firstname: user.firstname, //"Wowwwwwwwww!",
					username: user.username,
					password: user.password,
					pointsEarned: points,
					group: user.group,
					parentId: user.parentId
					// where: {
					//   id: req.params.id
					// }
				}).then( chore => {
					console.log(
						"in -PUT then: "
						+ JSON.stringify(chore));
					res.json(chore)
				})

      })

    });
  })




  // app.get("/api/rewards/:cId", function(req, res) {
  //
  //   db.user.findOne({
  //     where: {
  //       id: req.params.cId
  //     }
  //   }).then(function(child) {
  //     res.json(child);
  //   });
  //
  // });

	// app.get("/api/rewards/:id", function(req, res) {
	// 	db.rewards.findOne({
	// 		where: {
	// 			id: req.params.id
	// 		},
	// 		include: [db.Post]
	// 	}).then(function(dbReward) {
	// 		res.json(dbReward);
	// 	});
	// });
  //
	// app.post("/api/rewards", function(req, res) {
	// 	db.rewards.create(req.body).then(function(dbReward) {
	// 		res.json(dbReward);
	// 	});
	// });
  //
	// app.delete("/api/rewards/:id", function(req, res) {
	// 	db.rewards.destroy({
	// 		where: {
	// 			id: req.params.id
	// 		}
	// 	}).then(function(dbReward) {
	// 		res.json(dbReward);
	// 	});
	// });

};