'use strict'

var routes = require('express').Router();
var flightDao = require('../dao/flightDao');

/* Flight Object in flights array
    flightNo - Flights
    totalSeats - Flights
    departureAirport - Flights
    arrivalAirport - Flights
    departureTime - Flights
    arrivalTime - Flights
    availableSeats - Itinerary
    departureDate - Itinerary
    itineraryId - Itinerary
    flightPrice - Ticket
 */

//get flight numbers based on departure and arrival airport
routes.get('/flights/from/:depAirport/to/:arrAirport/on/:depDate', (request, response) => {
    const flightFilter = new Object();
    flightFilter.departureAirport = request.params.depAirport;
    flightFilter.arrivalAirport = request.params.arrAirport;
    flightFilter.departureDate = request.params.depDate;

    flightDao.getFlights(flightFilter, (err, flights) => {
        if(err) throw error;

        if (flights.length == 0) {
            const result = {message: "Record not found"};
            response.status(404).send(result);
        } else {
            response.setHeader('Content-Type', 'application/json');

            Array.prototype.forEach.call(flights, flight => {
                flight.flightPrice = 150;
            });

            response.status(200).send(flights);
        }
    });
});

/* Flight Object in flights array
    flightNo - Flights
    totalSeats - Flights
    departureAirport - Flights
    arrivalAirport - Flights
    departureTime - Flights
    arrivalTime - Flights
 */

routes.get('/flights/:flightNo', (request, response) => {
    var flightNo = request.params.flightNo;

    flightDao.getFlightByNo(flightNo, (err, flightRes) =>{
        if(err) throw error;

        if (flightRes.length == 0) {
            const result = {message: "Record not found"};
            response.status(404).send(result);
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(flightRes);
        }
    });
});

module.exports = routes;