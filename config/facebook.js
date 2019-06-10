const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['id', 'email', 'first_name', 'last_name']
    },
    function(accessToken, refreshToken, { _json : profile }, callback) {
        const user = {
            firstName: profile.first_name,
            lastName: profile.last_name,
            email: profile.email,
        };
        // Hmm, this area still needs some work...
        User.findOneAndUpdate({ 'socials.type': 'facebook', 'socials.id': profile.id },
            user,
            { upsert: true, new: true },
            function(err, user) {
                callback(err, user);
            });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;