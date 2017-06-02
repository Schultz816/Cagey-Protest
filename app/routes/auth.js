var authController = require('../controllers/authcontroller.js');
var passport = require('passport');

module.exports = function(app, passport) {

    app.get('/', authController.signin);

    app.get('/signup', authController.signup);

    app.get('/userSignup', authController.userSignup);

    app.get('/signin', authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup'
        }
    ));

    app.post('/userSignup', passport.authenticate('local-userSignup', {
            successRedirect: '/userProfile',
            failureRedirect: '/signup'
        }
    ));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/reward', isLoggedIn, authController.reward);

    app.get('/chore', isLoggedIn, authController.chore);

    app.get('/profile', isLoggedIn, authController.profile);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
            // successRedirect: '/dashboard',
            failureRedirect: '/signin'
        }),
        function (req, res) {
            if (req.user.group === 'admin') {
                res.redirect('/dashboard')
            } else if (req.user.group === 'user') {
                res.redirect('/profile')
            }
        }
        );



    app.get('/adminPage',
        isLoggedIn,
        needsGroup('admin'),
        authController.adminPage
        );

    app.get('/userProfile',
        isLoggedIn,
        needsGroup('child'),
        authController.userProfile
    );

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    function needsGroup(group) {
        return function(req, res, next) {
            if (req.user && req.user.group === group)
                next();
            else
                res.send(401, 'Unauthorized');
        };
    };



}