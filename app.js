require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();
const port = process.env.port;

const authRoute = require('./routes/auth-routes');
const profileRoute = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');

// mongodb setup
const db = process.env.db_connection_string.replace('<password>', process.env.password);
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}, (error) => {
    if(!error) {
        console.log('connected to OAuth db!')
    }
});

// set up view engine
app.set('view engine', 'ejs');

// set static folder
app.use(express.static('public'));

// initial passport and cookie setup
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', authRoute);
app.use('/profile', profileRoute);

// root route 
app.get('/', (req, res) => {
    res.render('home', {user: req.user})
});

// server
app.listen(port, () => {
    console.log(`server is listenting on port ${port}!`)
});