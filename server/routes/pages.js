const express = require('express')
const User = require("../models/user.js");
const router = express.Router()
const messages = require('../config/passport')

//Exports
module.exports = router;

//Get homepage
router.get('/', checkAuthenticated, function (req,res){
    res.render('index.ejs', {username: req.user.username})
});

//Get anime page
router.get('/anime', checkAuthenticated, function (req,res){
    res.render('web_fies/anime.ejs', {username: req.user.username})
});

//Get cartoons
router.get('/cartoons', checkAuthenticated,function (req,res){
    res.render('web_fies/cartoons.ejs', {username: req.user.username})
});

//Get drama
router.get('/drama',checkAuthenticated, function (req,res){
    res.render('web_fies/drama.ejs', {username: req.user.username})
});

//Get film
router.get('/film',checkAuthenticated, function (req,res){
    res.render('web_fies/film.ejs', {username: req.user.username})
});

//Get soundtrack
router.get('/soundtrack', checkAuthenticated,function (req,res){
    res.render('web_fies/NewSoundPage.ejs', {username: req.user.username})
});

//Get pay
router.get('/pay', checkAuthenticated,function (req,res){
    res.render('web_fies/pay.ejs', {username: req.user.username})
});

//Get pricing table
router.get('/pricing_table', checkAuthenticated,function (req,res){
    res.render('web_fies/pricing_table.ejs', {username: req.user.username})
});

//Get profile
router.get('/profile', checkAuthenticated,function (req,res){
    res.render('web_fies/profile.ejs', {name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    })
});

//Get tvshow
router.get('/tvshow', checkAuthenticated,function (req,res){
    res.render('web_fies/tvshow.ejs', {username: req.user.username})
});

//Get filter
router.get('/filter', checkAuthenticated,function (req,res){
    res.render('web_fies/filter.ejs', {username: req.user.username})
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    else
    res.redirect('/users/login')
}