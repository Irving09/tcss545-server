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

exports.getOfferingsByName = (names, callback) => {
  const query = `
    select 
      * 
    from 
      offering 
    where ${buildConditions(names)}`;

  dbPool.query(query, callback);
};

exports.getOfferingsByType = (types, callback) => {
  let conditions;
  if (multiQuery(types)) {
    conditions = types.map(t => `ot.name like '%${t}%'`).join(' and ');
  } else {
    conditions = `ot.name like '${types}'`;
  }

  let query = `
    select 
      o.id, 
      o.name, 
      o.description, 
      o.offeringTypeId 
    from 
      offering o, offeringtype ot 
    where 
      ${conditions} 
      and o.offeringTypeId = ot.id`;

  dbPool.query(query, callback);
};

exports.getOfferingsByTag = (tags, callback) => {

};

function buildConditions(params) {
  if (multiQuery(params))
    return params.map(t => `name like '%${t}%'`).join(' and ');
  else
    return `name like ${params}`;
}

function multiQuery(param) {
  return param instanceof Array;
}