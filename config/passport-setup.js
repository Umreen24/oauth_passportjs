require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const clientID = process.env.clientID
const clientSecret = process.env.clientSecret

passport.use(
    new GoogleStrategy({
    //options for google strategy
    clientID: clientID,
    clientSecret: clientSecret
}), () => {
    //passport callback function
})