'use strict';

const base = require('./base');

const offeringMapper = offering => {
    return {
        id: offering.id,
        name: offering.name,
        description: offering.description,
        offeringTypeId: offering.offeringTypeId
    };
};

exports.findOffering = function (id) {
    return base.queryOne(`SELECT * FROM Offering WHERE id = ${id};`).then(offeringMapper);
};

exports.findOfferings = function () {
    return base.query(`SELECT * FROM Offering;`).then(rows => {
        return rows.map(offeringMapper);
    });
};

exports.findOfferingsForType = (typeId) => base.query(`SELECT * FROM Offering WHERE offeringTypeId = ${typeId}`)
    .then(rows => {
        return rows.map(offeringMapper)
    });
