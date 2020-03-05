var routes = require('express').Router();
var airportDao = require('../dao/airportDao');

routes.get('/airports',function(request ,response){
    airportDao.getAllAirports(function(error, airports){
      if(error) throw error;
      
      response.setHeader('Content-Type', 'application/json');
      response.send(airports);
    });
});

routes.get('/airports/departureAirport/:departureAirport/arrivalAirport/:arrivalAirport', (request, response) => {
  var departureAirport = request.params.departureAirport;
  var arrivalAirport = request.params.arrivalAirport;

  airportDao.getAirport(departureAirport, arrivalAirport, (err, airportRes) =>{
      if(err) throw error;

      if (airportRes.length == 0) {
          const result = {message: "Record not found"};
          response.status(404).send(result);
      } else {
          response.setHeader('Content-Type', 'application/json');
          response.status(200).send(airportRes);
      }
  });
});

module.exports = routes;