const express = require( 'express')
const router = express.Router();


// Get Comment model
const Comment = require ('../models/comment.js')

let errors;

//Get posts
router.get('/posts', checkAuthenticated,function (req,res){
    Comment.find(function (err,comments){
        if(err)
            console.log(err);

        res.render('web_fies/posts.ejs', {
            user: req.user,
            comments: comments,
        })
    })
});

/*
 * POST comments
 */
router.post('/posts', function (req, res) {

    let username = req.user.username;
    let film = req.body.film;
    let text = req.body.text;
    let time = Date();

    req.checkBody('film', 'Film\'s name is required!').notEmpty();
    req.checkBody('text', 'Post should contain a comment!').notEmpty();

    errors = req.validationErrors();

    if (errors) {

        Comment.find(function (err,comments){
            if(err)
                console.log(err);

            res.render('web_fies/posts.ejs', {
                errors: errors,
                comment: null,
                user: req.user,
                comments: comments,
            })
        })
    } else {
        let comment = new Comment({
            username: username,
            film: film,
            text: text,
            time: time
        });

        comment.save(function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/comments/posts')
            }
        });
    }

});

// Exports
module.exports = router;

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    else
        res.redirect('/users/login')
}