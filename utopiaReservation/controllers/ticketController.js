var routes = require('express').Router();
var ticketDao = require('../dao/ticketDao');
var itineraryDao = require('../dao/itineraryDao');

routes.post('/reservations/:reservationId/tickets', (request, response) => {
  var ticket = request.body;
  ticket.reservationId = request.params.reservationId;

  /* Ticket Body
    reservationId
    flightPrice
    itineraryId
    totalTravelers
  */

  itineraryDao.getItinerary(ticket.itineraryId, (err, itineraryRes) => {
    if (err) throw error;

    if (itineraryRes.length == 0) {
      const result = { message: "Record not found" };
      response.status(404).send(result);
    } else {

      if (itineraryRes[0].availableSeats > 0 && ticket.totalTravelers <= itineraryRes[0].availableSeats) {
        
        for (let i = 0; i < ticket.totalTravelers; i++) {
          
          ticketDao.createTicket(ticket, (err, ticketRes) => {
            if (err) {
              console.log(err);
              const result = { message: "Invalid input" };
              response.status(400).send(result);
            }

            //minus the number of available seats on the plane
            itineraryRes[0].availableSeats = itineraryRes[0].availableSeats - 1;

            itineraryDao.updateItinerary(ticket.itineraryId, itineraryRes[0].availableSeats, (err, itinerary) => {
              if (err) {
                console.log(err);
                result.status(404);
              }
            });
          });
        }

        const result = { message: "Tickets created" };
        response.status(201).send(result);
      } else {
        const result = { message: "Not enough seats are available on this flight" };
        response.status(404).send(result);
      }

    }
  });
});

routes.get('/reservations/:reservationId/tickets', (request, response) => {
  var reservationId = request.params.reservationId;

  ticketDao.getTicket(reservationId, (err, tickets) => {
    if (err) throw error;

    if (tickets.length == 0) {
      const result = { message: "Record not found" };
      response.status(404).send(result);
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).send(tickets);
    }
  });
});

//validate ticket and reservation
routes.delete('/reservations/:reservationId/tickets/:ticketId', (request, response) => {
  var reservationId = request.params.reservationId;
  var ticketId = request.params.ticketId;

  ticketDao.deleteTicket(reservationId, ticketId, (err, ticket) => {
    if (err) {
      console.log(err);
      const result = { message: "Record not found" };
      response.status(404).send(result);
    }

    response.status(204);
  });
});

module.exports = routes;