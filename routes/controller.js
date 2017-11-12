'use strict';

/*
config looks like this
{
  "connectionLimit": 10,
  "debug": false,
  "host": "localhost",
  "port": "3306",
  "user": "root",
  "password": "<YOUR PASSWORD HERE>",
  "database": "tcss545"
  ==> db schema, i created a schema from my machine and named it tcss545,
  but feel free to name it anything you want and decide what it should be later on
}
*/
const config = require('../config.json');

const mysql = require('mysql');
const connection = mysql.createConnection(config);

// Sample call to connect to database and make a query
connection.connect(function(err) {
  if (err)
    console.log(err);
  else
    console.log('connected');

  connection.query('select * from ships', function(err, results) {
    if (err) {
      console.log(err);
    } else {
      connection.end();

      results.forEach(row => {
        let record = {
          ship: row['ship'],
          class: row['class'],
          launched: row['launched']
        };

        console.log(record);
      });
    }
  })
});