'use strict';

/*
config.json
{
  "connectionLimit": 10,
  "debug": false,
  "host": "localhost",
  "port": "3306",
  "user": "root",
  "password": "<YOUR PASSWORD HERE>",
  "database": "tcss545"
}
*/
const config = require('../db/config.json');
const mysql = require('mysql');
const dbPool = mysql.createPool(config);

exports.getOfferings = (queryParams, callback) => {
  dbPool.query(buildQuery(queryParams), callback);
};

function buildQuery(params) {
  let queryBuilder = `
  select 
    offr.id,
    offr.name,
    offr.description,
    type.name as type,
    group_concat(ingr.name) as ingredients,
    group_concat(tag.name) as tags
  from
    ingredient ingr,
    offeringingredient oi,
    offering offr,
    offeringtype type,
    tag tag,
    offeringtag otag
  where
    offr.id = oi.offeringId
    and otag.tagId = tag.id
    and offr.id = otag.offeringId
    and type.id = offr.offeringTypeId
    and ingr.id = oi.ingredientId`;

  let condition;
  for (let param of Object.keys(params)) {
    let values = params[param];
    if (multiQuery(values))
      condition = values.map(value => `lower(${param}.name) like '%${value}%'`).join(' or ');
    else
      condition = `(lower(${param}.name) like '%${values}%')`;

    queryBuilder = `${queryBuilder} and (${condition})`;
  }

  return `${queryBuilder} group by offr.id order by offr.id`;
}

function multiQuery(param) {
  return param instanceof Array;
}