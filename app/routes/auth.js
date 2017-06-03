var authController = require('../controllers/authcontroller.js');
var passport = require('passport');

module.exports = function (app, passport) {

    //ALL ACCESS READS AND POSTS
    //****************
    //root sign in GET
    app.get('/', authController.signin);
    //general sign in GET
    app.get('/signin', authController.signin);
    //general sign in POST
    app.post('/signin', passport.authenticate('local-signin', {
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
    //sign up ADMIN GET
    app.get('/signup', authController.signup);
    //sign up ADMIN POST
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup'
        }
    ));
    //USER profile GET
    app.get('/profile', isLoggedIn, authController.profile);
    //LOGOUT
    app.get('/logout', authController.logout);


    //RESTRICTED ACCESS READS
    //****************
    //sign up USER GET
    app.get('/userSignup', authController.userSignup);
    //sign up USER POST
    app.post('/userSignup', passport.authenticate('local-userSignup', {
            successRedirect: '/profile',
            failureRedirect: '/signin'
        }
    ));
    //add rewards GET
    app.get('/reward',
        isLoggedIn,
        needsGroup('admin'),
        authController.reward);
    //add chores GET
    app.get('/chore',
        isLoggedIn,
        needsGroup('admin'),
        authController.chore);
    //ADMIN dashboard GET
    app.get('/dashboard',
        isLoggedIn,
        needsGroup('admin'),
        authController.dashboard
    );

    //AUTHENTICATION AND REDIRECTION
    //****************
    //testing whether logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
    //checking permissions for routes
    function needsGroup(group) {
        return function (req, res, next) {
            if (req.user && req.user.group === group)
                next();
            else
                res.render('noPeaking'  );
        };
    };
}

//OLD CODE
// app.get('/dashboard', isLoggedIn, authController.dashboard);
// successRedirect: '/dashboard',
// app.get('/userProfile',
//     isLoggedIn,
//     needsGroup('user'),
//     authController.userProfile
// );