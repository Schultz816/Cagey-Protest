 // Created by Julia on 5/28/2017.

var Reward = require("../models/reward.js");

module.exports = function(app) {
	app.get("/api/rewards", function(req, res) {
		Reward.findAll({
			// include: [db.Post]
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.get("/api/rewards/:id", function(req, res) {
		Reward.findOne({
			where: {
				id: req.params.id
			},
			// include: [db.Post]
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.post("/api/rewards", function(req, res) {
		Reward.create(req.body).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.delete("/api/rewards/:id", function(req, res) {
		Reward.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

};