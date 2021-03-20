const express = require('express');
const app = express();
const path = require('path');
const session = require('client-sessions');
const session2 = require('express-session');

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
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));
app.use(express.urlencoded({extended:true}))//support url encoded bodies
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

// entries page
app.get('/entries', function (req, res) {
    // const request = req.query;
    res.render('pages/entries');
   
});

// new entry page
app.get('/addentry', function (req, res) {
    // const request = req.query;
    res.render('pages/addentry');
   
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
    //body is for post, query is for get
    
    const full_name = req.body.full_name;
    const email = req.body.email;
    const password = req.body.password;
    const params = [full_name, email, password];
    addCustomerFromDataLayer(params, function (error, input) {
        console.log("Back From the addCustomerFromDataLayer:", input);
        if (error || input == null) {
            res.status(500).json({
                success: false,
                data: error
            });
        } 
        else {
            // res.json(result);
            res.status(200).json(input);
        }
    });
}

function addCustomerFromDataLayer(params, callback) {
    console.log("addCustomerFromDataLayer called with id");
    var sql = "INSERT INTO customer (full_name, email, password) VALUES($1::text, $2::text, $3::text)";
    // var params = [id];
    pool.query(sql, params, function (err, input) {
        if (err) {
            console.log("error in database connection");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result:" + JSON.stringify(input));
        callback(null, input);
    });
}










//ADD JOURNAL ENTRY
app.post("/addEntry", addEntry);
function addEntry(req, res) {
    console.log("Posting data");
    // var id = req.query.id;
    //body is for post, query is for get
    
    const journal_entry_date = req.body.journal_entry_date;
    const journal_entry = req.body.journal_entry;
    const params = [journal_entry_date, journal_entry];

    addEntryFromDataLayer(params, function (error, addJournalEntry) {
        console.log("Back From the addEntryFromDataLayer:", addJournalEntry);
        if (error || addJournalEntry == null) {
            res.status(500).json({
                success: false,
                data: error
            });
        } 
        else {
            // res.json(result);
            res.status(200).json(addJournalEntry);
        }
    });
}

function addEntryFromDataLayer(params, callback) {
    console.log("addEntryFromDataLayer called with id");
    var sql = "INSERT INTO journal (journal_entry, journal_entry_date) VALUES($1::text, $2::date)";
    // var params = [id];
    pool.query(sql, params, function (err, addJournalEntry) {
        if (err) {
            console.log("error in database connection");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result:" + JSON.stringify(addJournalEntry));
        callback(null, addJournalEntry);
    });
}




//Login and display entries
app.get("/login", login);
function login(req, res) {
    console.log("Getting data");
    // var id = req.query.id;
    loginFromDataLayer(function (error, result) {
        console.log("Back From the loginFromDataLayer:", result);
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

function loginFromDataLayer(callback) {
    console.log("loginFromDataLayer called with id");
    var sql = "SELECT journal_entry j FROM journal j JOIN customer c ON j.customer_id = c.customer_id WHERE j.customer_id = c.customer_id";
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







//GET JOURNAL ENTRIES
//DATABASE CALL from app.get
app.get("/getJournal", getJournal);
function getJournal(req, res) {
    console.log("Getting data");
    // var id = req.query.id;
    getJournalFromDataLayer(function (error, result) {
        console.log("Back From the getJournalFromDataLayer:", result);
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

function getJournalFromDataLayer(callback) {
    console.log("getJournalFromDataLayer called with id");
    var sql = "SELECT * FROM journal";
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