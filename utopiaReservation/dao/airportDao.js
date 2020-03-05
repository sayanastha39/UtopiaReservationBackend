var db = require('./database');

exports.getAllAirports = function(cb){
    db.query('select * from Airport', function(err, result) {
        cb(err, result);
    });
};

exports.getAirport = (departureAirport, arrivalAirport, callback) => {
    db.query('select * from Airport where airportCode = ? or airportCode = ?',[arrivalAirport, departureAirport], (err, res) => {
        callback(err, res); 
    });
};