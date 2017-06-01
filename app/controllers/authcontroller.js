var exports = module.exports = {}

//sign up
exports.signup = function(req, res) {
    res.render('signup');
}

//sign in
exports.signin = function(req, res) {
    res.render('signin');
}

//dashboard
exports.dashboard = function(req, res) {
    res.render('dashboard');
}

//rewards
exports.reward = function(req, res) {
    res.render('reward');
}

//chores
exports.chore = function(req, res) {
    res.render('chore');
}

//profile
exports.profile = function(req, res) {
    res.render('profile');
}

//logout
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}