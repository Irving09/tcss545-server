'use strict';

const OfferingAdapter = require('../../adapters/offerings');
const OfferingTypeAdapter = require('../../adapters/offeringTypes');
const LocationAdapter = require('../../adapters/locations');
const TagAdapter = require('../../adapters/tags');
const IngredientAdapter = require('../../adapters/ingredients');
const PricesAdapter = require('../../adapters/offeringPrices');
const SizesAdapter = require('../../adapters/offeringSizes');
const Q = require('q');

let offeringMapper = (offering) => {
    return Q.all([
        TagAdapter.findOfferingTags(offering.id).then(tags => {
            offering.tags = tags
        }),
        IngredientAdapter.findOfferingIngredients(offering.id).then(ingredients => {
            offering.ingredients = ingredients;
        }),
        LocationAdapter.findOfferingLocations(offering.id).then(locations => {
            offering.locations = locations;
        }),
        OfferingTypeAdapter.findOfferingType(offering.offeringTypeId).then(type => {
            offering.type = type;
            delete offering.offeringTypeId;
        }),
        PricesAdapter.findOfferingPricesForOffering(offering.id).then(prices => {
            let sizes = [];
            prices.forEach(price => {
                delete price.offeringId;
                sizes.push(SizesAdapter.findOfferingSize(price.offeringSizeId).then(size => {
                    price.size = size;
                    delete price.offeringSizeId;
                }));
            });
            offering.prices = prices;
            return Q.all(sizes);
        })
    ]).then(() => {
        return offering;
    }, (err) => {
        console.error(err);
        return Q.reject(err);
    });
};

exports.getOfferings = (req, res) => {
    OfferingAdapter.findOfferings()
        .then(offerings => Q.all(offerings.map(offeringMapper)), () => res.status(400).send('Bad Request'))
        .then(offerings => res.json(offerings), () => res.status(500).send('Internal Server Error'));
};

exports.getOffering = (req, res) => {
    let id = req.params.id;
    OfferingAdapter.findOffering(id)
        .then(offeringMapper, () => res.status(404).send('Not Found'))
        .then((offering) => res.json(offering), () => res.status(500).send('Internal Server Error'))
};