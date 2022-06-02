const express = require('express')
const router = express.Router()

//Exports
module.exports = router;

//Get homepage
router.get('/', function (req,res){
    res.render('index.ejs')
});

//Get anime page
router.get('/anime', function (req,res){
    res.render('web_fies/anime.ejs')
});

//Get cartoons
router.get('/cartoons', function (req,res){
    res.render('web_fies/cartoons.ejs')
});

//Get drama
router.get('/drama', function (req,res){
    res.render('web_fies/drama.ejs')
});

//Get film
router.get('/film', function (req,res){
    res.render('web_fies/film.ejs')
});

//Get soundtrack
router.get('/soundtrack', function (req,res){
    res.render('web_fies/NewSoundPage.ejs')
});

//Get pay
router.get('/pay', function (req,res){
    res.render('web_fies/pay.ejs')
});

//Get pricing table
router.get('/pricing_table', function (req,res){
    res.render('web_fies/pricing_table.ejs')
});

//Get profile
router.get('/profile', function (req,res){
    res.render('web_fies/profile.ejs')
});

//Get tvshow
router.get('/tvshow', function (req,res){
    res.render('web_fies/tvshow.ejs')
});