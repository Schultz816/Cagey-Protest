 // Created by Julia on 5/28/2017.

var db = require("../models");

module.exports = function(app) {
	app.get("/api/rewards", function(req, res) {
		db.rewards.findAll({
			include: [db.Post]
		}).then(function(dbReward) {
			res.json(dbReward);
		});
		// res.send("reward-api is working!");
	});

	app.get("/api/rewards/:id", function(req, res) {
		db.rewards.findOne({
			where: {
				id: req.params.id
			},
			include: [db.Post]
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.post("/api/rewards", function(req, res) {
		db.rewards.create(req.body).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.delete("/api/rewards/:id", function(req, res) {
		db.rewards.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

};