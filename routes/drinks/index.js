'use strict';

const express = require('express');
const router = express.Router();

const beverages = require('./beverages');
// const evolutionFresh = require('./evolution-fresh');
// const icedCoffee = require('./iced-coffee');
// const icedTea = require('./iced-tea');
// const smoothies = require('./smoothies');

router.use('/beverages', beverages);
// router.use('/evolution-fresh', evolutionFresh);
// router.use('/iced-coffee', icedCoffee);
// router.use('/iced-tea', icedTea);
// router.use('/smoothies', smoothies);

router.get('/', function(req, res, next) {
  res.json({
    types: [
      'beverages',
      'evolution-fresh',
      'iced-coffee',
      'iced-tea',
      'smoothies'
    ]
  });
});

module.exports = router;