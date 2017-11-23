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
const config = require('./dbConfig.json');

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
// const dbClient = mysql.createConnection(config);

exports.getBeverages = (callback) => {
  /* TODO Uncomment when database is ready
  dbClient.connect((err, connection) => {
    if (err) console.log(err);
    else console.log('connected', connection);

    dbClient.query('select * from offeringtype', callback);
  });
  */

  callback(null, {
    types: [
      'refreshers',
      'espresso',
      'chocolate',
      'frappuccino-blended'
    ]
  });
};