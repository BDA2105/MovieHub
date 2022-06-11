const express = require('express')
const User = require("../models/user.js");
const router = express.Router()
const messages = require('../config/passport')

//Exports
module.exports = router;



//Get homepage
router.get('/',  function (req,res){
    res.render('index.ejs', {user: req.user})
});

//Get anime page
router.get('/anime', function (req,res){
    res.render('web_fies/anime.ejs', {user: req.user})
});

//Get cartoons
router.get('/cartoons',function (req,res){
    res.render('web_fies/cartoons.ejs', {user: req.user})
});

//Get drama
router.get('/drama', function (req,res){
    res.render('web_fies/drama.ejs', {user: req.user})
});

//Get film
router.get('/film', function (req,res){
    res.render('web_fies/film.ejs', {user: req.user})
});

//Get soundtrack
router.get('/soundtrack',function (req,res){
    res.render('web_fies/NewSoundPage.ejs', {user: req.user})
});

//Get pay
router.get('/pay', checkAuthenticated,function (req,res){
    res.render('web_fies/pay.ejs', {user: req.user})
});

//Get pricing table
router.get('/pricing_table',function (req,res){
    res.render('web_fies/pricing_table.ejs', {user: req.user})
});

//Get pricing table for unauthorized
router.get('/pricing_table-un',function (req,res){
    res.render('web_fies/pricing_table-unauth.ejs', {user: req.user})
});

//Get payment cancel
router.get('/cancel',function (req,res){
    res.render('web_fies/cancel.ejs', {user: req.user})
});

//Get payment sucksess
router.get('/success',function (req,res){
    res.render('web_fies/success.ejs', {user: req.user})
});

//Get profile
router.get('/profile', checkAuthenticated,function (req,res){
    res.render('web_fies/profile.ejs', {user: req.user})
});

//Get tvshow
router.get('/tvshow',function (req,res){
    res.render('web_fies/tvshow.ejs', {user: req.user})
});

//Get filter
router.get('/filter',function (req,res){
    res.render('web_fies/filter.ejs', {user: req.user})
});


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    else
    res.redirect('/users/login')
}