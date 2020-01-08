const authRouter = require('express').Router();
const passport = require('passport');

// auth login
authRouter.get('/login', (req, res) => {
    res.render('login', {user: req.user})
});

//auth logout
authRouter.get('/logout', (req, res) => {
    //handle with passport
    req.logOut()
    res.redirect('/')
});

// auth with Google+
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile')
});

module.exports = authRouter;