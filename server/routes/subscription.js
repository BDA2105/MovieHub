const express = require('express')
const User = require("../models/user.js");
const router = express.Router()

router.post('/subscribe', function (req, res) {

        User.findOne({username: req.user.username}, function (err, user) {
            if (err)
                console.log(err);
            else {
                User.findOneAndUpdate({username: req.user.username},{$set:{isSubscribed:1}}, function (err,user){
                    if (err)
                        console.log(err)
                    else {
                        req.flash('success', 'You are now subscribed!');
                        res.redirect('/')
                    }
                });
            }
        });

});
// Exports
module.exports = router;
