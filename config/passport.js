let LocalStrategy    = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let TwitterStrategy  = require('passport-twitter').Strategy;
let GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;


let User       = require('../app/models/user');
let configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        if(email) email = email.toLowerCase();
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null, null);
                }
                if(!user.validPassword(password)) {
                    return done(null, null);
                } else {
                    return done(null, user);
                }
            });
        });
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        displayNameField : 'displayName',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, displayName, password, done) {
        if(email) email = email.toLowerCase();
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if(err) return done(err);
                    if(user) {
                        return done(null, false);
                    } else {
                        let newUser            = new User();
                        newUser.local.email    = email;
                        newUser.local.displayName    = displayName;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err) return done(err);
                            return done(null, newUser);
                        });
                    }

                });
            } else if ( !req.user.local.email ) {
                User.findOne({ 'local.email' :  email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false);
                    } else {
                        let user = req.user;
                        user.local.email = email;
                        user.local.displayName = displayName;
                        user.local.password = user.generateHash(password);

                        user.save(function (err) {
                            if(err) return done(err);
                            return done(null,user);
                        });
                    }
                });
            } else {
                return done(null, req.user);
            }
        });
    }));
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    let fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;

    passport.use(new FacebookStrategy(fbStrategy, function(req, token, refreshToken, profile, done) {
        process.nextTick(function() {
            //console.log(profile._json.picture.data);
            if (!req.user) {
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if(err) return done(err);
                    if(user) {
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.displayName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                            user.facebook.photos = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                            user.save(function(err) {
                                if(err) return done(err);
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    } else {
                        let newUser            = new User();
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.displayName;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.facebook.photos = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                        newUser.save(function(err) {
                            if(err) return done(err);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                let user            = req.user;
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.displayName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                user.facebook.photos = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                user.save(function(err) {
                    if(err) return done(err);
                    return done(null, user);
                });
            }
        });
    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true
    },
    function(req, token, tokenSecret, profile, done) {
        //console.log(profile);
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if(err) return done(err);
                    if(user) {
                        if (!user.twitter.token) {
                            user.twitter.token       = token;
                            user.twitter.username    = profile.username;
                            user.twitter.name        = profile.displayName;
                            user.twitter.photos      = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                            user.save(function(err) {
                                if(err) return done(err);
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    } else {
                        let newUser                 = new User();
                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.name        = profile.displayName;
                        newUser.twitter.photos      = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                        newUser.save(function(err) {
                            if(err) return done(err);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                let user                 = req.user;
                user.twitter.id          = profile.id;
                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.name        = profile.displayName;
                user.twitter.photos      = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                user.save(function(err) {
                    if(err) return done(err);
                    return done(null, user);
                });
            }
        });
    }));
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true
    },
    function(req, token, refreshToken, profile, done) {
        //console.log(profile);
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err) return done(err);
                    if (user) {
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase();
                            user.google.photos = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                            user.save(function(err) {
                                if(err) return done(err);
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    } else {
                        let newUser          = new User();
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.google.photos = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                        newUser.save(function(err) {
                            if(err) return done(err);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                let user          = req.user;
                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase();
                user.google.photos = profile.photos ? profile.photos[0].value : '/img/default-user.png';

                user.save(function(err) {
                    if(err) return done(err);
                    return done(null, user);
                });
            }
        });
    }));
};
