var db = require('./database');

exports.createTicket = (ticket, callback) => {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('insert into Ticket(reservationId, flightPrice, itineraryId) values(?,?,?)', [ticket.reservationId, ticket.flightPrice, ticket.itineraryId], (err, res) => {
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

exports.getTicket = (reservationId, callback) => {
    db.query('select * from Ticket where reservationId = ?',reservationId, (err, tickets) => {
        callback(err, tickets); 
    });
};

exports.deleteTicket = (reservationId, ticketId, callback) => {
    db.beginTransaction(function(err) {
        if(err)  callback(err, null);

        db.query('delete from Ticket where reservationId = ? and ticketId = ?', [reservationId, ticketId], (err, res) => {
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