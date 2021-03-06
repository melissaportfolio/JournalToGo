const express = require('express');
const app = express();
const path = require('path');
// const session = require('client-sessions');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
var sessInfo;
const expressSanitizer = require('express-sanitizer');
// const expressValidator = require('express-validator');
const sanitizer = require('sanitize')();
const format = require('pg-format');


require('dotenv').config();

const {
    Pool
} = require('pg');
const { body } = require('express-validator');
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
    secret: 'shhh...',
    saveUninitialized: true,
    resave: true,
    // store: new FileStore(),
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));

app.use(function printSession(req, res, next) {
    console.log('req.session', req.session);
    return next();
});
app.use(express.urlencoded({extended:true}))//support url encoded bodies
app.use(require('morgan')('dev'));
app.use(express.json());
app.use(expressSanitizer());
// app.use(expressValidator());

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
// app.use(logRequest);
// app.use(verifyLogin);




//Root page
app.get("/", function (req, res) {
    // console.log("Received request for root /");
    // res.render('pages/index');

    res.write("This is the root");
    res.end();
});

//index page
app.get('/index', function (req, res) {
    // const request = req.query;
    // if (req.session.loggedin = true) {
    //     res.render('pages/entries');
    // }
    // else {
    //     res.render('pages/index');
    // }
    sessInfo = req.session;
    // console.log("this is sessioninfo start", sessInfo);
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
    // body('email').isEmail();
    
    const full_name = req.body.full_name;
    const email = req.sanitize(req.body.email);
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
app.post("/addJournalEntry", addJournalEntry);
function addJournalEntry(req, res) {
    console.log("Posting data");
    // var id = req.query.id;
    //body is for post, query is for get
    const customer_id = req.session.user;
    const journal_entry_date = req.body.journal_entry_date;
    const journal_entry = req.body.journal_entry;
    const params = [journal_entry, journal_entry_date];

    addEntryFromDataLayer(customer_id, params, function (error, addEntry) {
        console.log("Back From the addEntryFromDataLayer:", addEntry);
        if (error || addEntry == null) {
            res.status(500).json({
                success: false,
                data: error
            });
        } 
        else {
            // res.json(result);
            res.status(200).json(addEntry);
        }
    });
}

async function addEntryFromDataLayer(customer_id, params, callback) {
    console.log("addEntryFromDataLayer called with id");
    console.log("this is customer id inside the data layer",customer_id, "this is after the customer id");
    var sql = "INSERT INTO journal (journal_entry, journal_entry_date, customer_id) VALUES('"+params[0]+"', '"+params[1]+"', '"+customer_id+"')";
    // var sql = "INSERT INTO journal (journal_entry, journal_entry_date, customer_id) VALUES($1::text, $2::text, '"+customer_id+"')";
    // var params = [id];
    const client = await pool.connect();
    const result = await client.query(sql);
    console.log(result);
    // pool.query(sql, customer_id, params, function (err, addEntry) {
    //     if (err) {
    //         console.log("error in database connection");
    //         console.log(err);
    //         callback(err, null);
    //     }
    //     console.log("Found DB result:" + JSON.stringify(addEntry));
    //     callback(null, addEntry);
    // });
}







//Customer LOGIN
app.post("/customerLogin", customerLogin);
function customerLogin(req, res) {
    // console.log(req.session);
    const email = req.body.email;
    const password = req.body.password;
    // const customer_id = req.body.customer_id;
    const params = [email, password];
    req.session.loggedin = true;
    req.session.email = email;
    console.log(req.session.email);


    // var id = req.query.id;
    loginFromDataLayer(params, function (error, result) {
        console.log("Back From the loginFromDataLayer:", result);
        
        if (error || result == null) {
            res.status(500).json({
                success: false,
                data: error,
                message: 'There is an error in retreiving the result'
            })}
        if (result.rowCount > 0){
            //Save session data here
            req.session.user = result.rows[0].customer_id;
            console.log(req.session.user, 'this is the user number');
            // res.redirect('/getJournal');
            res.redirect('/entries');
            
        }
            // console.log("Error message");
            // const error = "Please try logging in again.";
            // res.render('pages/index', error = {message: message});
            // res.render('pages/index');
            // $("#errorMessage").text("Error logging in, please try again.");

        
        else {
            // res.json(result);
            // res.status(200).json(result);
            console.log(JSON.stringify(result));
            // req.session.user = result.rows[0].customer_id;
            // req.session.user = result.rows[0].email;
            // console.log(req.session.user);
            //render page
            res.render('pages/index');
            res.send("Incorrect email or password");
            

        }
        // callback(null, result.rows);
        // res.end();
    });
}

//this is coming back as undefined
function loginFromDataLayer(params, callback) {
    console.log("loginFromDataLayer called with id");
    var sql = "SELECT customer_id FROM customer WHERE email = $1::text AND password = $2::text";
    // var sql = "SELECT customer_id FROM customer";
    
    
    
    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log("error in database connection");
            console.log(err);
            callback(err, null);
            return;
        }
        // console.log("Found DB result:" + JSON.stringify(result.rows));
        console.log("Found DB result:" + JSON.stringify(result));
        // callback(null, result.rows);
        callback(null, result);
    });
}










//Customer LOGOUT
app.post("/customerLogout", customerLogout);
function customerLogout(req, res) {
    console.log("This is the stored user:", req.session.user);
    if (req.session.user) {
        req.session.destroy();
        console.log("inside the logout function on server page");
        res.render("pages/index");
    }
    else {
        
        res.render("pages/index");
    }
    console.log("Session logout");
    console.log("this is the session user info", req.session.user);
}










//GET JOURNAL ENTRIES
//DATABASE CALL from app.get
app.get("/getJournal", getJournal);
function getJournal(req, res) {
    console.log("Getting data");
    
       
   
    const user = req.session.user;
    // if (req.session.loggedin = false){
    //     $('#loginMessage').html("Please login", loginMessage);
    // }
    // var id = req.query.id;
   
    getJournalFromDataLayer(user, function (error, result) {
        console.log("Back From the getJournalFromDataLayer:", result);
        if (error || result == null) {
            // document.getElementById("loginMessage").innerHTML = "Please login to view this page.";
            res.status(500).json({
                success: false,
                data: error
            });
        } 
        else {
        //     res.redirect('pages/index');
        // $('#loginMessage').html("Please login", loginMessage);
            // res.json(result);
            res.status(200).json(result);
            // res.render('pages/entries');
        }
    });
}


function getJournalFromDataLayer(user, callback) {
    console.log("getJournalFromDataLayer called with id");
    console.log('this is the user const: ', user);
   
    var sql = "SELECT journal_id, journal_entry, journal_entry_date, customer_id FROM journal WHERE customer_id = '"+user+"'";
    // var params = [id];
    pool.query(sql, function (err, result) {
        if (err) {
            console.log("error in database connection");
            console.log(err);
            callback(err, null);
            // $('#loginMessage').html("Please login", loginMessage);
            
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