const express = require('express');
const app = express();
const port = 3000

// set up view engine
app.set('view engine', 'ejs');

//set static folder
app.use(express.static('public'));

//home route 
app.get('/', (req, res) => {
    res.render('home')
});

app.listen(port, () => {
    console.log(`server is listenting on port ${port}!`)
});