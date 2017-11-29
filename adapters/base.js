const config = require('../db/config.json');
const Q = require('q');
const mysql = require('mysql');
const dbPool = mysql.createPool(config);

var BaseDb = {
    query: function (query) {
        const deferred = Q.defer();
        dbPool.query(query, (err, rows) => {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    },
    queryOne: function (query) {
        return BaseDb.query(query).then(rows => {
            let result = rows.map(item => item);
            if (result.length === 1) {
                return result[0];
            } else {
                return Q.reject();
            }
        });
    }
};

module.exports = BaseDb;