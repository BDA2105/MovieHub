const mongodb = require("mongodb");

let mongoClient = new mongodb.MongoClient('mongodb+srv://arimaz:123@cluster0.hqvwy.mongodb.net/movieHub?retryWrites=true&w=majority');

mongoClient.connect(async function(error, mongo) {
    if (!error) {
        let db = mongo.db('movieHub');
        let coll = db.collection('users');

        let user = await coll.find({}).toArray(); //код будет выводить только данные вошедшего пользователя, на основе его уникального айди, записанного в куки
        let data = JSON.stringify(user[0])
            .split(",")
            .map(name => name
                .split(":"))
            .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: value}), {});
        console.log(data['"name"']);
        //пока что код выводит всех юзеров, потому что там есть только один
        document.getElementById("name").innerHTML=data['"name"']


    } else {
        console.error(err);
    }
});
