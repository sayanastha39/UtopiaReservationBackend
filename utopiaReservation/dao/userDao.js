var db = require('./database');

exports.createUser = (traveler, callback) => {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('insert into User(firstName, lastName, phoneNumber, email, address) values(?,?,?,?,?)', [traveler.firstName, traveler.lastName, traveler.phoneNumber, traveler.email, traveler.address], (err, res) => {
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

exports.getUser = (userId, callback) => {
    db.query('select * from User where userId = ?',[userId], (err, res) => {
        callback(err, res); 
    });
};