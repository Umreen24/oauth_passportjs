const authRouter = require('express').Router();
const passport = require('passport');

// auth login
authRouter.get('/login', (req, res) => {
    res.render('login')
});

//auth logout
authRouter.get('/logout', (req, res) => {
    //handle with passport
    res.send('logging out')
});

// auth with Google
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
authRouter.get('/google/redirect', (req, res) => {
    res.send('you reached the callback uri')
});

module.exports = authRouter;