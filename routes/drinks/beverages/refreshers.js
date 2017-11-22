'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  // TODO extract this function handler later to controller class

  res.json({
    refreshers: [
      'item from db1',
      'item from db2',
      'item from db3',
      'item from db4'
    ]
  });
});

module.exports = router;