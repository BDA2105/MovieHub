require('dotenv').config({path: 'config.env'});

module.exports = {
    database: process.env.MONGO_URI
}