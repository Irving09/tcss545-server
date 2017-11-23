'use strict';

const Adapter = require('../../../adapters/drinks');

exports.getBeveragesTypes = (req, res, next) => {
  Adapter.getBeverages((err, data) => res.json(data));
};

exports.getExpresso = (req, res, next) => {
  res.json({
    expresso: [
      'item from db1',
      'item from db2',
      'item from db3',
      'item from db4'
    ]
  });
};

exports.getRefreshers = (req, res, next) => {
  res.json({
    refreshers: [
      'item from db1',
      'item from db2',
      'item from db3',
      'item from db4'
    ]
  });
};