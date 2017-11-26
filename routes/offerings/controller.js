'use strict';

const Adapter = require('../../adapters/offerings');

exports.getOfferings = (req, res, next) => {
  Adapter.getOfferingsByName(req.query.name, (err, data) => {
    res.json(data);
  });
};
