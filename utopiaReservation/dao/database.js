//import module
var mysql = require('mysql');
const CONFIG = require('../config');

//define db connection
var connection = mysql.createConnection({
    host     : CONFIG.db_host,
    port     : CONFIG.db_port,
    user     : CONFIG.db_user,
    password : CONFIG.db_password,
    database : CONFIG.db_name
});


connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... ");
    }
    });

module.exports = connection;