'use strict';

const Adapter = require('../../adapters/locations');

exports.getLocations = (req, res, next) => {
  console.log('in controller');
  Adapter
    .getAllLocations()
    .then(locations => locations.length ? res.status(404).json(locations) : res.json(locations))
    .catch(error => res.status(500).send(error));
};

exports.getLocationsById = (req, res, next) => {
  Adapter
    .getLocation(req.params.id)
    .then(locations => locations.length ? res.status(404).json(locations) : res.json(locations[0]))
    .catch(error => res.status(500).send(error));
};
