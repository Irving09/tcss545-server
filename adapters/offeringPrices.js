'use strict';

const base = require('./base');

const offeringPriceMapper = price => {
    return {
        id: price.id,
        price: price.price,
        offeringSizeId: price.offeringSizeId,
        offeringId: price.offeringId
    };
};

exports.findOfferingPrice = (id) => {
    return base.queryOne(`SELECT * FROM OfferingPrice WHERE id = ${id}`).then(offeringPriceMapper);
};

exports.findOfferingPricesForOffering = (offeringId) => {
    return base.query(`CALL FindOfferingPricesForOffering(${offeringId});`).then(rows => {
        return rows[0].map(offeringPriceMapper);
    });
};

