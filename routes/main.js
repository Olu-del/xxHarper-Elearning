// Create a new router
const express = require("express");
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcryptjs');


// Define our data
var appData = {appName: "Harper"}


// Handle our routes
router.get('/', function(req, res) {
     // Render the index page with appData
   res.render('index.ejs', appData);
});


router.get('/about', function(req, res) {
    // Render the about page with appData
    res.render('about.ejs', appData);
});


router.get('/contact', function(req, res) {
    // Render the contact page with appData
    res.render('contact.ejs', appData);
});


router.post('/contact', function(req, res) {
    // Extract form data from the request body
    const { first, last, email, phone, question } = req.body;

    // Insert the contact data into the database
    req.app.locals.connection.query('INSERT INTO contacts SET ?', { first_name: first, last_name: last, email, phone, question }, function(err, result) {
        if (err) throw err;
        // Send a response to the client
        res.send('Thank you for contacting Harper E-learning. We will get back to you within three working days.');
    });
});


router.get('/login', function(req, res) {
    // Render the login page with appData
    res.render('login.ejs', appData);
});


router.post('/login',function (req, res) {
    // Extract login data from the request body
    const { email, password } = req.body;

    // Query the database for the user with the provided email
    req.app.locals.connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        // Check if the user exists and the password matches
        if (results.length && bcrypt.compareSync(password, results[0].password)) {
            // Set session variables
            req.session.loggedin = true;
            req.session.username = results[0].first_name;
            req.session.userId = results[0].id;
            // Redirect to the welcome page
            res.redirect('/account');
        } else {
            // Send an error message if the login fails
            res.send('Incorrect Email and/or Password!');
        }
    });
});


router.get('/register', function(req, res) {
    // Render the register page with appData
    res.render('register.ejs', appData);
});


router.post('/register', function(req, res)  {
    // Extract registration data from the request body
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Check if the email already exists
    req.app.locals.connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.send('This email is already registered. Please use a different email.');
        }

        // Insert the new user into the database
        req.app.locals.connection.query('INSERT INTO users SET ?', { first_name, last_name, email, password: hashedPassword }, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.send('This email is already registered. Please use a different email.');
                }
                throw err;
            }
            // Set session variables
            req.session.loggedin = true;
            req.session.username = first_name;
            req.session.email = email;

            // Redirect to the welcome page
            res.redirect('/account');
        });
    });
});


router.get('/account', function(req, res) {
     if (req.session.loggedin) {
         const userId = req.session.userId;

        // Fetch user's search history
       req.app.locals.connection.query('SELECT search_query, timestamp FROM search_history WHERE user_id = ? ORDER BY timestamp DESC LIMIT 5', [userId], (err, searchhistory) => {
            if (err) throw err;

            // Render the welcome page with the username and search history
            res.render('account.ejs', {
                 username: req.session.username,
                 searchhistory: searchhistory
            });
        });
     } else {
         // Send an error message if the user is not logged in
         res.send('Please log in to view your account!');
    }
 });


router.get('/signout-confirmation', function(req, res) {
     // Destroy the session to sign out the user
    req.session.destroy(function(err) {
         if (err) {
             return res.send('Error signing out.');
         }
         // Redirect to the home page after sign-out
        res.redirect('/');
    });
 });


 router.get('/search-result',function (req, res) {
     const keyword = req.query.keyword;
     const videoId = req.query.videoId;
     const userId = req.session.userId;
    

     // Fetch all video titles
     req.app.locals.connection.query('SELECT id, title FROM videos', (err, videoTitles) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error');
        }

     // First query: fetch videos based on `videoId` or `keyword`
     if (videoId) {
        req.app.locals.connection.query('SELECT * FROM videos WHERE id = ?', [videoId], (err, results) => {
             if (err) {
                 console.error('Database error:', err);
                return res.status(500).send('Database error');
            }
            // Render the search results page with the fetched videos
            res.render('search-result.ejs', { videos: results, keyword: '' });
        });
     } else if (keyword) {
        req.app.locals.connection.query('SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?', [`%${keyword}%`, `%${keyword}%`], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send('Database error');
            }

            // Save the search query to the database only if the keyword is present
             req.app.locals.connection.query('INSERT INTO search_history (user_id, search_query) VALUES (?, ?)', [userId, keyword], (err) => {
                if (err) {
                    console.error('Database error while saving search history:', err);
                    return res.status(500).send('Database error while saving search history');
                }
                 // Render the search results page with the fetched videos
                res.render('search-result.ejs', { videos: results, keyword: keyword });
            });
         });
    } else {
        // Render the search results page with no videos if no keyword is provided
         res.render('search-result.ejs', { videos: [], keyword: '' });
    }
 });
 });
 

 // Route to fetch and display videos 
        router.get('/videos', function(req, res) {
            req.app.locals.connection.query('SELECT * FROM videos', (err, results) => {
                if (err) {
                    return res.status(500).send('Error fetching videos');
                }
                res.render('videos.ejs', { videos: results });
            });
        });
        

// Export the router object so index.js can access it
module.exports = router;

