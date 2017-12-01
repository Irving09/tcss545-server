'use strict';

const express = require('express');
const router = express.Router();

const offerings = require('./offerings');
const menu = require('./menu');
const locations = require('./locations');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Starbucks Clone Server' });
});

router.use('/offerings', offerings);
router.use('/menu', menu);
router.use('/locations', locations);

module.exports = router;
