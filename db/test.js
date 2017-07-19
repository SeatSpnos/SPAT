const config = require('./configDBTest.json');
const mysql = require('mysql');
const connectionTest = mysql.createConnection(config);

module.exports = function (table, query, values, callback) {
  if (typeof values === 'function') {
     callback = values;
     values = [];
  }
  connectionTest.query('USE spnos_test', function (err) {
    if (err) return callback(err);
    connectionTest.query(query, values, function (err, rows) {
      if (err) return callback(err);
      callback(null, rows);
    });
  });
};
