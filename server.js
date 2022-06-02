const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const server = require('./server/config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator')
const passport = require('passport');
const ejs = require('ejs')

//Init app
const app = express();

//Connect to DB
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(server.database);
}

//View engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);

//Set public folder
//the static middleware To render static files
app.use(express.static(path.join(__dirname, '')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

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
const adminPages = require('./server/routes/admin_pages.js');

app.use('/users', users);
app.use('/admin/pages', adminPages);
app.use('/', pages);

//Start the server
const port = 3000
app.listen(port, function (){
    console.log('Server started on port ' + port)
})