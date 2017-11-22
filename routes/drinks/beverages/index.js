'use strict';

const express = require('express');
const router = express.Router();

const refreshers = require('./refreshers');
const expresso = require('./expresso');

router.use('/refreshers', refreshers);
router.use('/expresso', expresso);

router.get('/', function(req, res, next) {
  res.json({
    types: [
      'refreshers',
      'evolution-fresh',
      'iced-coffee',
      'iced-tea',
      'smoothies',
    ]
  });
});

module.exports = router;

/*
REST endpoints

/drinks
    /beverages
        /refreshers
        /espresso
        /chocolate
        /frappuccino-blended
    /iced-coffee
        /cold-brew
        /freshly-brewed
    /iced-tea
    /evolution-fresh
    /smoothies
*/