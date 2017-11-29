'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Adapter = Promise.promisifyAll(require('../../adapters/offerings'));

exports.getOfferingsBySearch = (req, res) => {
  Adapter.getOfferings(req.query, (err, rows) => {
    if (err) return res.status(500).json({error: err});

    res.json(rows.map(offering => {
      return {
        id: offering.id,
        name: offering.name,
        description: offering.description,
        type: offering.type,
        ingredients: offering.ingredients.split(','),
        tags: offering.tags.split(',')
      }
    }));
  });
};