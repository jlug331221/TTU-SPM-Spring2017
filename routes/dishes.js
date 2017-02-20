var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://jlug331221:test@ds157439.mlab.com:57439/sandbox-test', ['dishes']);

db.on('error', function (err) {
    console.log('database error', err);
});

db.on('connect', function () {
    console.log('database connected');
});

// Get all dishes
router.get('/dishes', function(req, res, next) {
    db.dishes.find(function(err, dishes) {
        res.json(dishes);
    });
});

// Get one specific dish
router.get('/dish/:id', function(req, res, next) {
    db.dishes.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, dish) {
        res.json(dish);
    });
});

module.exports = router;
