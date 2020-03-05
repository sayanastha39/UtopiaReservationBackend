var routes = require('express').Router();
var userDao = require('../dao/userDao');

/* Traveler Object
    firstName
    lastName
    phoneNumber
    email
    address
*/

routes.post('/users', (request, response) => {
    var traveler = request.body;

    userDao.createUser(traveler, (err, travelerRes) => {
        if (err) {
            console.log(err);
            const result = { message: "Invalid input" };
            response.status(400).send(result);
        }

        response.status(201).send(travelerRes);
    });
});

routes.get('/users', (request, response) => {
    var userId = request.header('userId');

    userDao.getUser(userId, (err, user) =>{
        if(err) throw error;

        if (user.length == 0) {
            const result = {message: "Record not found"};
            response.status(404).send(result);
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(user);
        }
    });
});

module.exports = routes;