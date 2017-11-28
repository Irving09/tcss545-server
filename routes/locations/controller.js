'use strict';

const Adapter = require('../../adapters/locations');

exports.getLocations = (req, res, next) => {
    Adapter.getLocations((err, data) => res.json(data));
};
