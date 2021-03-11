const express = require('express');
const app = express();
const path = require('path');

app.use(express.static("JournalToGo"));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

//Index page
app.get("/", function(req, res) {
  console.log("Received request for root /");
//   res.render('pages/index');

  res.write("This is the root");
  res.end();
});

// about page
// app.get('/about', function(req, res) {
//     res.render('pages/about');
//     res.write("This is the about page");
//     res.end();
// });

// register page
app.get('/register', function(req, res) {
    const request = req.query;
    res.render('pages/register');
    res.write("This is the registration page");
    res.end();
});






require('dotenv').config();
const { Pool } = require('pg');


const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString});

var sql = "SELECT * FROM customer";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result);
    // console.log(result.rows);


}); 