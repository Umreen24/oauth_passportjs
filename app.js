require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const authRoute = require('./routes/auth-routes');
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

// routes
app.use('/auth', authRoute);

// root route 
app.get('/', (req, res) => {
    res.render('home')
});

app.listen(port, () => {
    console.log(`server is listenting on port ${port}!`)
});