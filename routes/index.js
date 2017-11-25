'use strict';

const express = require('express');
const router = express.Router();

const offerings = require('./offerings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Starbucks Clone Server' });
});

router.use('/offerings', offerings);

module.exports = router;
