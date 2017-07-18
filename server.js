// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://beer:123@ds159892.mlab.com:59892/testing');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

// Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

  // Find First 5 News Quantity list
  var latestbeerroute = router.route('/latestbeer');
  latestbeerroute.get(function(req, res) {
  var q = Beer.find().sort({'quantity': -1}).limit(5);
  q.exec(function(err, latestbeer) {
       // `posts` will be of length 5
       if (err)
         res.send(err);

       res.json(latestbeer);
     });
  });


// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
