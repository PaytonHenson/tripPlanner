var express = require('express');
var models = require("../models");
var router = express.Router();
var Promise = require('bluebird');

router.get("/", function(req, res, next){

    var findHotels = models.Hotel.findAll({});
    var findRestaurants = models.Restaurant.findAll({});
    var findActivities = models.Activity.findAll({});

    Promise.all([findHotels, findRestaurants, findActivities])
    .spread(function(hotels, restaurants, activities){
        res.render('index', {
          hotels: hotels,
          restaurants: restaurants,
          activities: activities
        });
    }).catch(next);
});

router.get('/index', function(req, res, next) {
 res.send('index');
});

module.exports = router;
