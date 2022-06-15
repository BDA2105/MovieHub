const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('https://moviehub01.herokuapp.com/admin/api/users')
        .then(function(response){
            res.render('admin/views/admin.ejs', {
                user: req.user,
                users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('admin/views/add_user', {user: req.user});
}


