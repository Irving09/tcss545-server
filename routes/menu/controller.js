'use strict';

const OfferingAdapter = require('../../adapters/offerings');
const OfferingTypeAdapter = require('../../adapters/offeringTypes');
const PricesAdapter = require('../../adapters/offeringPrices');
const SizesAdapter = require('../../adapters/offeringSizes');
const Promise = require('bluebird');


exports.getMenu = (req, res) => {
    OfferingTypeAdapter.findOfferingTypes()
        .then(types => {
            let menu = [];
            return Promise.all(types.map(type => OfferingAdapter.findOfferingsForType(type.id).then(offerings => menu.push({
                id: type.id,
                name: type.name,
                description: type.description,
                offerings: offerings.map(offering => {
                    delete offering.offeringTypeId;
                    return offering
                })
            }))))
                .then(() => menu, (err) => Promise.rejected(err));
        }, () => res.status(404).send('Not Found'))
        .then(menu => res.json(menu), () => res.status(500).send('Internal Server Error'));
};

exports.getMenuForLocation = (req, res) => {
    let locationId = req.params.id;
    OfferingTypeAdapter.findLocationOfferingTypes(locationId)
        .then(types => {
            let menu = [];
            return Promise.all(types.map(type => OfferingAdapter.findOfferingsForTypeAndLocation(type.id, locationId).then(offerings => menu.push({
                id: type.id,
                name: type.name,
                description: type.description,
                offerings: offerings.map(offering => {
                    delete offering.offeringTypeId;
                    return offering
                })
            }))))
                .then(() => menu)
                .then(menu => {
                    let loaded = [];
                    menu.forEach(menuItem => {
                        menuItem.offerings.forEach(offering => {
                            loaded.push(PricesAdapter.findOfferingPricesForOffering(offering.id).then(prices => {
                                let sizes = [];
                                prices.forEach(price => {
                                    delete price.offeringId;
                                    sizes.push(SizesAdapter.findOfferingSize(price.offeringSizeId).then(size => {
                                        price.size = size;
                                        delete price.offeringSizeId;
                                    }));
                                });
                                offering.prices = prices;
                                return Promise.all(sizes);
                            }));
                        });
                    });
                    return Promise.all(loaded).then(() => menu);
                })
        }, () => res.status(404).send('Not Found'))
        .then(menu => res.json(menu), () => res.status(500).send('Internal Server Error'));
};