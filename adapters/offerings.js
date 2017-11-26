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
const config = require('../config.json');

/*
  =======SAMPLE TABLE=======
  CREATE TABLE `Offering` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` varchar(255) DEFAULT NULL,
    `price` decimal(12,2) unsigned NOT NULL,
    `offeringTypeId` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `idnew_table_UNIQUE` (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
*/
const mysql = require('mysql');
const dbPool = mysql.createPool(config);

exports.getOfferingsByName = (names, callback) => {
  /*
  Sample URL
  http://localhost:3000/offerings?name=cool&name=lime&name=beverage&offeringType=refreshers&offeringType=beverages
  */

  let table = 'Offering';
  let attr = 'name';

  dbPool.query(searchQuery(names, attr, table), callback);
};

exports.getOfferingsByTags = (tags, callback) => {

};

function searchQuery(input, attrToSearch, table) {
  let select = `select * from ${table}`;
  let conditions = 'where ' + input
    .map(value => `${attrToSearch} like '%${value}%'`)
    .join(' and ');

  return input ?  `${select} ${conditions}` : select;
}