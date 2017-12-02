'use strict';

const base = require('./base');

const offeringTypeMapper = type => {
    return {
        id: type.id,
        name: type.name,
        description: type.description
    };
};

exports.findOfferingType = function (id) {
    return base.queryOne(`SELECT * FROM OfferingType WHERE id = ${id};`).then(offeringTypeMapper);
};

exports.findOfferingTypes = function () {
    return base.query(`SELECT * FROM OfferingType`).then(rows => {
        return rows.map(offeringTypeMapper);
    });
};

exports.findLocationOfferingTypes = function (locationId) {
    return base.query(`CALL FindLocationOfferingTypes(${locationId})`).then(rows => {
        return rows[0].map(offeringTypeMapper);
    });
};
