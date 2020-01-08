const profileRouter = require('express').Router();

// auth check
const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user not logged in
        res.redirect('/auth/login')
    } else {
        // if logged in
        next()
    }
};

profileRouter.get('/', authCheck, (req, res) => {
    res.send('you are logged in and this your profile: ' + req.user.username)
});

module.exports = profileRouter;