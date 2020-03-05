var db = require('./database');

exports.createReservation = (reservation, callback) => {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('insert into Reservation(userId, status) values(?,?)', [reservation.userId, reservation.status], (err, res) => {
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

exports.getReservation = (reservationId, callback) => {
    db.query('select * from Reservation where reservationId = ?',[reservationId], (err, res) => {
        callback(err, res); 
    });
};

exports.updateReservation = (reservation, callback) => {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('update Reservation set userId = ?, status = ? where reservationId = ?', [reservation.userId, reservation.status, reservation.reservationId], (err, res) => {
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

exports.deleteReservation = (reservationId, callback) => {
    db.beginTransaction(function(err) {
        if(err)  callback(err, null);

        db.query('delete from Reservation where reservationId = ?', [reservationId], (err, res) => {
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