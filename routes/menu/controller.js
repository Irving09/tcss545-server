'use strict';

const OfferingAdapter = require('../../adapters/offerings');
const OfferingTypeAdapter = require('../../adapters/offeringTypes');
const LocationAdapter = require('../../adapters/locations');
const TagAdapter = require('../../adapters/tags');
const IngredientAdapter = require('../../adapters/ingredients');
const PricesAdapter = require('../../adapters/offeringPrices');
const SizesAdapter = require('../../adapters/offeringSizes');
const Q = require('q');


exports.getMenu = (req, res) => {
    OfferingTypeAdapter.findOfferingTypes()
        .then(types => {
            let menu = [];
            return Q.all(types.map(type => OfferingAdapter.findOfferingsForType(type.id).then(offerings => menu.push({
                id: type.id,
                name: type.name,
                offerings: offerings.map(offering => {
                    delete offering.offeringTypeId;
                    return offering
                })
            }))))
                .then(() => menu, (err) => Q.reject(err));
        }, () => res.status(404).send('Not Found'))
        .then(menu => res.json(menu));
};

exports.getMenuForLocation = (req, res) => {
};