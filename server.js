const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const {
    Pool
} = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");



//Root page
app.get("/", function (req, res) {
    console.log("Received request for root /");
    //   res.render('pages/index');

    res.write("This is the root");
    res.end();
});

//index page
app.get('/index', function (req, res) {
    // const request = req.query;
    res.render('pages/index');

});







// register page
app.get('/register', function (req, res) {
    // const request = req.query;
    res.render('pages/register');
   
});















//GET CUSTOMER
//DATABASE CALL from app.get
app.get("/getCustomers", getCustomers);
function getCustomers(req, res) {
    console.log("Getting data");
    // var id = req.query.id;
    getCustomersFromDataLayer(function (error, result) {
        console.log("Back From the getCustomersFromDataLayer:", result);
        if (error || result == null) {
            res.status(500).json({
                success: false,
                data: error
            });
        } 
        else {
            // res.json(result);
            res.status(200).json(result);
        }
    });
}

function getCustomersFromDataLayer(callback) {
    console.log("getCustomersFromDataLayer called with id");
    var sql = "SELECT * FROM customer";
    // var params = [id];
    pool.query(sql, function (err, result) {
        if (err) {
            console.log("error in database connection");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result:" + JSON.stringify(result.rows));
        callback(null, result.rows);
    });
}




//ADD CUSTOMER
app.post("/addCustomer", addCustomer);
function addCustomer(req, res) {
    console.log("Posting data");
    // var id = req.query.id;
    addCustomerFromDataLayer(function (error, result) {
        console.log("Back From the addCustomerFromDataLayer:", result);
        if (error || result == null) {
            res.status(500).json({
                success: false,
                data: error
            });
        } 
        else {
            // res.json(result);
            res.status(200).json(result);
        }
    });
}

function addCustomerFromDataLayer(callback) {
    console.log("addCustomerFromDataLayer called with id");
    var sql = "INSERT INTO customer (full_name, email, password) VALUES($.full_name, $.email, $.password);";
    // var params = [id];
    pool.query(sql, function (err, result) {
        if (err) {
            console.log("error in database connection");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result:" + JSON.stringify(result.rows));
        callback(null, result.rows);
    });
}







//app listener
app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"), function () {
    console.log("Now listening on port: ", app.get("port"));
});


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