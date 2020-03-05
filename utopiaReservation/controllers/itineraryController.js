var routes = require('express').Router();
var itineraryDao = require('../dao/itineraryDao');

/* Itinerary Object
    itineraryId
    flightNo
    availableSeats
    departureDate
 */

routes.get('/itineraries/:itineraryId', (request, response) => {
    var itineraryId = request.params.itineraryId;

    itineraryDao.getItinerary(itineraryId, (err, itineraryRes) =>{
        if(err) throw error;

        if (itineraryRes.length == 0) {
            const result = {message: "Record not found"};
            response.status(404).send(result);
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(itineraryRes);
        }
    });
});

module.exports = routes;