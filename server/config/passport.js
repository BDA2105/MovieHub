const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

let _messages;
function initialize(passport) {
    passport.use(new LocalStrategy({username : 'username'}, function (username, password, done) {

        User.findOne({username}, function (err, user) {
            if (err)
                console.log(err);

            if (!user) {
                return done(null, false, _messages= {message : 'No user found!'});
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err)
                    console.log(err);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, _messages = {message :'Wrong password.'});
                }
            });
        });

    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

module.exports = initialize;