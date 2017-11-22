'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    beverages: [
      'item from db1',
      'item from db2',
      'item from db3'
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