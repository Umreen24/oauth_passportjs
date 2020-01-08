require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user)
    })
});

passport.use(
    new GoogleStrategy({
    //options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: clientID,
    clientSecret: clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //check if user already exists in db
    User.findOne({googleId: profile.id})
    .then((currentUser) => {
        if(currentUser) {
            // user already registered
            console.log('user already registered: ' + currentUser)
            done(null, currentUser)
        } else {
            // create new user
            new User({
                username: profile.displayName,
                googleId: profile.id
            })
            .save()
            .then((newUser) => {
                console.log('new user created: ' + newUser)
                done(null, newUser)
            })
        }
    })
}));