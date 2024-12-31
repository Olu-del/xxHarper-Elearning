// Setup express and ejs
var express = require ('express')
var ejs = require('ejs')
var mysql = require('mysql2'); //This line to require the mysql module
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var session = require('express-session');

// Create the express application object
const app = express()
const port = 8000

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the body parser 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Set up css
app.use(express.static(__dirname + '/public'));

// MySQL connection
 const connection = mysql.createConnection({
    host: 'localhost',
   user: 'harper_elearning_app',
   password: 'abquarmt',
   database: 'user_elearning'
});



connection.connect(function(err) {
   if (err) throw err;
   console.log('Connected to MySQL Database.');
});

// Make the connection available globally
app.locals.connection = connection;


// Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))