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
  let conditions;
  if (multiQuery(names)) {
    conditions = names.map(t => `o.name like '%${t}%'`).join(' and ');
  } else {
    conditions = `o.name like '%${names}%'`;
  }

  const query = `
    select 
      o.id,
      o.name,
      o.description,
      ot.name as type
    from
      offering o,
      offeringtype ot
    where
        ${conditions}
        and o.id = ot.id`;

  dbPool.query(query, callback);
};

exports.getOfferingsByType = (types, callback) => {
  let conditions;
  if (multiQuery(types)) {
    conditions = types.map(t => `ot.name like '%${t}%'`).join(' and ');
  } else {
    conditions = `ot.name like '%${types}%'`;
  }

  let query = `
    select 
      o.id, 
      o.name, 
      o.description, 
      ot.name as type
    from 
      offering o, offeringtype ot 
    where 
      ${conditions} 
      and o.offeringTypeId = ot.id`;

  dbPool.query(query, callback);
};

exports.getOfferingsByTag = (tags, callback) => {
  let conditions;
  if (multiQuery(tags)) {
    conditions = tags.map(t => `ot.name like '%${t}%'`).join(' and ');
  } else {
    conditions = `ot.name like '%${tags}%'`;
  }
};

function multiQuery(param) {
  return param instanceof Array;
}