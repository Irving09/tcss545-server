'use strict';

const Adapter = require('../../adapters/offerings');

exports.getOfferings = (req, res, next) => {
  Adapter.getOfferings((err, data) => res.json(data));
};
