var db = require('./database');

exports.getFlights = (flightFilter, callback) => {
    var sql = 'select * from Flights ' + 
        'left join Itinerary on Flights.flightNo = Itinerary.flightNo ' + 
        'where departureAirport = ? and arrivalAirport = ? and departureDate = ? and availableSeats > 0 ' +
        'union ' +
        'select * from Flights right join Itinerary on Flights.flightNo = Itinerary.flightNo ' +
        'where departureAirport = ? and arrivalAirport = ? and departureDate = ? and availableSeats > 0';

    db.query(sql, [flightFilter.departureAirport, flightFilter.arrivalAirport, flightFilter.departureDate, 
        flightFilter.departureAirport, flightFilter.arrivalAirport, flightFilter.departureDate], (err, flights) => { 
        
            callback(err, flights); 
    });
};

exports.getFlightByNo = (flightNo, callback) => {
    db.query('select * from Flights where flightNo = ?',[flightNo], (err, res) => {
        callback(err, res); 
    });
};