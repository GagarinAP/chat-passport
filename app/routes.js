let Rooms = require('./models/rooms.js');
let User  = require('./models/user');
let Msg  = require('./models/message.js');

module.exports = function(app, passport) {

// normal routes ===============================================================    
    
    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.send({
            user : req.user
        });
    });
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // ALL USERS ===========================
    app.get('/users', isLoggedIn, function(req, res, next) {
        User.find(function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================        
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile',
            failureRedirect : '/',
            failureFlash : true
        }));
        // SIGNUP =================================
        app.get('/signup', function(req, res){
            res.redirect('/');
        });
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile',
            failureRedirect : '/signup',
            failureFlash : true
        }));

    // facebook -------------------------------
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/',
                failureRedirect : '/'
            }));
    // twitter --------------------------------
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/',
                failureRedirect : '/'
            }));
    // google ---------------------------------
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile',
            failureRedirect : '/connect/local',
            failureFlash : true
        }));

    // facebook -------------------------------
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // google ---------------------------------
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        let user            = req.user;
        user.local.email    = undefined;
        user.local.displayName    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        let user            = req.user;
        user.facebook = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        let user           = req.user;
        user.twitter = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        let user          = req.user;
        user.google = undefined;
        user.save(function(err) {
            res.redirect('/');
        });
    });

// =============================================================================
// ROOMS API CRUD  =============================================================
// =============================================================================
    app.get('/rooms', isLoggedIn, function(req, res, next) {
        Rooms.find(function (err, room) {
            if (err) return next(err);
            res.json(room);
        });
    });
    app.post('/rooms', isLoggedIn, function(req, res, next) {
        req.body.author = req.session.passport.user;
        Rooms.create(req.body, function (err, room) {
            if (err) return next(err);
            res.json(room);
        });
    });
    app.get('/rooms/:id', isLoggedIn, function(req, res, next) {
        Rooms.findById(req.params.id, function (err, room) {
            if (err) return next(err);
            res.json(room);
        });
    });
    app.put('/rooms/:id', isLoggedIn, function(req, res, next) {
        Rooms.findByIdAndUpdate(req.params.id, req.body, function (err, room) {
            if (err) return next(err);
            res.json(room);
        });
    });
    app.delete('/rooms/:id', isLoggedIn, function(req, res, next) {
        Rooms.findByIdAndRemove(req.params.id, req.body, function (err, room) {
            if (err) return next(err);
            res.json(room);
        });
    });
// =============================================================================
// MESSAGE API CRUD  =============================================================
// =============================================================================
    app.post('/room/:id/message', isLoggedIn, function(req, res, next) {
        //console.log(req.session.passport.user);
        req.body.author = req.session.passport.user;
        Msg.create(req.body, function (err, room) {
            if (err) return next(err);
            res.json(room);
        });
    });
    app.get('/room/:id/message', isLoggedIn, function(req, res, next) {
        let id = req.params.id;
        Msg.find({"roomId": id},function (err, message) {
            if (err) return next(err);
            res.json(message);
        });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
