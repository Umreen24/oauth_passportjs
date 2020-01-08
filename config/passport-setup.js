require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const clientID = process.env.clientID
const clientSecret = process.env.clientSecret
const User = require('../models/user');

passport.use(
    new GoogleStrategy({
    //options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: clientID,
    clientSecret: clientSecret
}, (accessToken, refreshToken, profile, done) => {
    //passport callback function
    console.log('passport callback function fired')
    console.log(profile)
    new User({
        username: profile.displayName,
        googleId: profile.id
    }).save()
    .then((newUser) => {
        console.log('new user created: ' + newUser)
    });
}));