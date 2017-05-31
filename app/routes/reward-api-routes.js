// <<<<<<< HEAD:app/routes/reward-api-routes.js
// var db = require("../models/index");
// =======
 // Created by Julia on 5/28/2017.

var db = require("../models");
julia2:routes/reward-api-routes.js

module.exports = function(app) {
	app.get("/api/rewards", function(req, res) {
		db.Reward.findAll({
			include: [db.Post]
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.get("/api/rewards/:id", function(req, res) {
		db.Reward.findOne({
			where: {
				id: req.params.id
			},
			include: [db.Post]
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.post("/api/rewards", function(req, res) {
		db.Reward.create(req.body).then(function(dbReward) {
			res.json(dbReward);
		});
	});

	app.delete("/api/rewards/:id", function(req, res) {
		db.Reward.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(dbReward) {
			res.json(dbReward);
		});
	});

};