var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        username : req.body.username,
        email : req.body.email,
        name : req.body.name,
        sort1 : req.body.sort1

    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/admin/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else {
        Userdb.find().sort({name: 1}) // sorting users by name in ascending order
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error Occurred while retriving user information"})
            })
    }
}

/*else {
        Userdb.find().sort({name: 1}) // sorting users by name in ascending order
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error Occurred while retriving user information"})
            })
    }*/




// Update a new idetified user by user id

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}