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
            successRedirect: '/userProfile',
            failureRedirect: '/signup'
        }
    ));
    //add rewards
    app.get('/reward', isLoggedIn, authController.reward);
    //add chores
    app.get('/chore', isLoggedIn, authController.chore);


    //ADMIN dashboard
    app.get('/dashboard',
        isLoggedIn,
        needsGroup('admin'),
        authController.dashboard
    );



    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }

    function needsGroup(group) {
        return function (req, res, next) {
            if (req.user && req.user.group === group)
                next();
            else
                res.send(401, 'Unauthorized');
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