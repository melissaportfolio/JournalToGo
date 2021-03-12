const express = require('express');
const app = express();
const path = require('path');


//app listener
app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function() {
console.log("Now listening on port: ", app.get("port"));
});



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
    // const request = req.query;
    res.render('pages/register');
    res.write("This is the registration page");
    res.end();
});






require('dotenv').config();
const { Pool } = require('pg');


const connectionString = process.env.DATABASE_URL;

const pool = new Pool({connectionString: connectionString,
ssl: {
    rejectUnauthorized: false
}
});









//DATABASE CALL from app.get
app.get("/getCustomers", getCustomers);

function getCustomers(req, res) {
console.log("Gettting data");
var id = req.query.id;
getCustomersFromDataLayer(id, function(error, result) {
console.log("Back From the getCustomersFromDataLayer:", result);
if(error || result == null || result.length !=1) {
res.status(500).json({success:false, data: error});
}
else
{
res.json(result[0]);
}
});
}

function getCustomersFromDataLayer (id, callback) {
console.log("getCustomersFromDataLayer called with id", id);

var sql = "SELECT * FROM customer";
var params = [id];

pool.query(sql, params, function(err, result) {
if (err) {
console.log("error in database connection");
console.log(err);
callback(err, null);
}

console.log("Found DB result:" + JSON.stringify(result.rows));

callback(null, result.rows);

});
}





// // var sql = "SELECT * FROM customer";

// pool.query(sql, function(err, result) {
//     // If an error occurred...
//     if (err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }

//     // Log this to the console for debugging purposes.
//     console.log("Back from DB with result:");
//     console.log(result);
//     // console.log(result.rows);


// }); 