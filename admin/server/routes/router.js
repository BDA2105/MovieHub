const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');


route.get('/', services.homeRoutes);


route.get('/add-user', services.add_user)

route.get('/sortingByCity', services.homeRoutes);

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);

route.delete('/api/users/:id', controller.delete);


module.exports = route