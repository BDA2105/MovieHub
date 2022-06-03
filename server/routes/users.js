const express = require( 'express')
const router = express.Router();
const passport = require ('passport')
const bcrypt = require ('bcryptjs')
const initializePassport = require('../config/passport.js')
initializePassport(passport)

// Get Users model
const User = require ('../models/user.js')

let errors;
/*
 * GET register
 */
router.get('/register', function (req, res) {
    res.render('web_fies/register.ejs');
});

/*
 * POST register
 */
router.post('/register', function (req, res) {

    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password2;

    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('email', 'Email is required!').isEmail();
    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password2', 'Passwords do not match!').equals(password);

    errors = req.validationErrors();

    if (errors) {
        res.render('web_fies/register.ejs', {
            errors: errors,
            user: null,
        });
    } else {
        User.findOne({username: username}, function (err, user) {
            if (err)
                console.log(err);

            if (user) {
                req.flash('danger', 'Username exists, choose another!');
                res.redirect('/users/register');
            } else {
                let user = new User({
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    admin: 0
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err)
                            console.log(err);

                        user.password = hash;

                        user.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                req.flash('success', 'You are now registered!');
                                res.redirect('/users/login')
                            }
                        });
                    });
                });
            }
        });
    }

});

/*
 * GET login
 */
router.get('/login', function (req, res) {

    res.render('web_fies/login.ejs');

    if (res.locals.user) res.redirect('/');
});

/*
 * POST login
 */
router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true}),
    function (req, res, next){
    res.redirect('/')
    });

/*
 * GET logout
 */

// Exports
module.exports = router;
