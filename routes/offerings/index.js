'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/', controller.getOfferings);
router.get('/:id', controller.getOffering);

module.exports = router;