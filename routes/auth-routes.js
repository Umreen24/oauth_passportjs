const authRouter = require('express').Router();

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
authRouter.get('/google', (req, res) => {
    //handle with passport
    res.send('logging in with Google')
});

module.exports = authRouter;