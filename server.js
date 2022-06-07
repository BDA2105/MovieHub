const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const server = require('./server/config/database');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session');


//Init app
const app = express();

//Connect to DB
mongoose.connect(server.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

//View engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine','ejs');
app.engine('ejs', require('ejs').renderFile);

//Set public folder
//the static middleware To render static files
app.use(express.static(path.join(__dirname, '')));

// Set global errors variable
app.locals.errors = null;

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Get user Model
const User = require('./server/models/user.js');

// Get all categories to pass to header.ejs
User.find(function (err, user) {
    if (err) {
        console.log(err);
    } else {
        app.locals.users = user;
    }
});

// Express Flash middleware
app.use(flash());
// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    //cookie: { secure: true }
}));

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            const extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Passport Config
require('./server/config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set routes
const users = require('./server/routes/users.js');
const pages = require('./server/routes/pages.js');
const comments = require('./server/routes/comments.js');


app.use('/users', users);
app.use('/comments', comments);
app.use('/', pages);


//Start the server
let port = process.env.PORT;

if (port == null || port == "") {
    port = 9000;
}
app.listen(port, function (){
    console.log('Server started on port ' + port)
});