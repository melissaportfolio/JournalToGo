const express = require('express');
const app = express();
const path = require('path');

app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
  console.log("Received request for root /");

  res.write("This is the root");
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