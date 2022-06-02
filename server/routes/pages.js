const express = require('express')
const router = express.Router()

//Exports
module.exports = router;

router.get('/', function (req,res){
    res.render('index.ejs')
});