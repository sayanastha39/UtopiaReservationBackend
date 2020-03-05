'use strict'
//
var db = require('./database');

//get this itineraryId from ticket that is chosen
exports.updateItinerary = (itineraryId, newAvailSeats, callback) => {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('update Itinerary set availableSeats = ? where itineraryId = ?', [newAvailSeats, itineraryId], (err, res) => {
            if(err) {
                db.rollback(function(err) {
                    callback(err, res);
                });
            }

            db.commit(function(err) {
                callback(err, res);
            });
        });
    });
};

exports.getItinerary = (itineraryId, callback) => {
    db.query('select * from Itinerary where itineraryId = ?',[itineraryId], (err, res) => {
        callback(err, res); 
    });
};