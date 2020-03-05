var bodyParser = require('body-parser') //representing data in the form i want to receive and send it back
var express = require('express'); //it allows us to create a server and to define our rest endpoints and routes, it has a routing module
var app = express(); //once imported you must call the constructor; it's something like you are creating an object of a class. Where "express()" is just like class and app is it's newly created object.
var cors = require('cors');
const errorHandler = require('./helpers/errorHandler');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //url is limited to 127 ASCII characters.
//encoding it changes any special characters - not a part of the 127 chars - into acceptable url format

// parse application/json
//represent java objects in json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Reservation Service on AWS Lambda!' });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//defining routes to controllers
//everytime you add a new controller, define it here
//controllers are for defining your endpoints

app.use(require('./controllers/reservationController'));
app.use(require('./controllers/flightController'));
app.use(require('./controllers/ticketController'));
app.use(require('./controllers/airportController'));
app.use(require('./controllers/userController'));
app.use(require('./controllers/itineraryController'));
app.use(errorHandler.notFound);
app.use(errorHandler.internalServerError);

//error checking
//serverless logs -f server -t

app.listen(8000);
console.log("server running");

module.exports = app;