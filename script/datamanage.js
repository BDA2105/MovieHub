const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://arimaz:123@cluster0.hqvwy.mongodb.net/movieHub?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("movieHub");
        let myobj = {
            name: document.getElementById('name').value,
            nickname: document.getElementById('nickname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        dbo.collection("users").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });

});
