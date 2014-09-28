// server.js

// BASE SETUP
// =============================================================================
var Kali     = require('./app/models/kali');
var now;
var mongoose   = require('mongoose');
mongoose.connect('mongodb://hgiagiamou:Gate7!@ds052827.mongolab.com:52827/kalidb'); // connect to our database

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 80; 		// set our port
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 80); 
app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	now = new Date();
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// more routes for our API will happen here
// on routes that end in /kali
// ----------------------------------------------------
router.route('/kali')

	// create a kali (accessed at POST http://localhost:8080/api/kali)
	.post(function(req, res) {
		
		var kali = new Kali(); 		// create a new instance of the kali model
		kali.ip = req.body.ip;  // set the kalis name (comes from the request)
		console.dir(req);
		kali.time = now;

		// save the bear and check for errors
		kali.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Kali created!' });
		});
		
	})	// get all the bears (accessed at GET http://localhost:8080/api/kali)
	.get(function(req, res) {
		Kali.find(function(err, kalis) {
			if (err)
				res.send(err);

			res.json(kalis);
		});
	});;
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router); //app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);