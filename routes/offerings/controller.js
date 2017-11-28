'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Adapter = Promise.promisifyAll(require('../../adapters/offerings'));

exports.getOfferings = (req, res, next) => {
  let names = promisify(Adapter.getOfferingsByName, req.query.name);
  let types = promisify(Adapter.getOfferingsByType, req.query.type);

  Promise.all([names, types]).then(function(data) {
    let flat = _.flatMap(data, (group) => group);

    let results = {};

    flat.forEach(record => {
      if (typeof results[record.id] === 'undefined') {
        results[record.id] = record;
      }
    });

    results = _.flatMap(results, (record) => record);
    res.json({
      data: results.map(record => {
        return {
          name: record['name'],
          description: record['description'],
          type: record['offeringTypeId'],
          tags: ['TODO'],
          ingredients: ['TODO']
        }
      })
    });
  });
};

function promisify(func, parameter) {
  return new Promise((resolve, reject) => {
    func(parameter, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  });
}


// data: [
//   {
//     "name": "Cool Lime Starbucks Refreshers Beverage",
//     "description": "Real fruit juice, mint and a lime slice shaken with Green Coffee Extract for a boost of natural energy, served over ice.",
//     "type": "Starbucks Refreshers Beverages",
//     “tags”: [“fruit”, “cold”],
//     “Ingredients”: [“milk”, “sugar”]
// }