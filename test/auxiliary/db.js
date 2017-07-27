const config = require('../../db/configDBTest');
const mysql = require('mysql');
let connection;

module.exports = {
  start: start,
  close: close,
  query: query
};

function start (callback) {
  connection = mysql.createConnection(config);
  console.log('Connection Start!')
  callback();
}

function close (callback) {
  connection.end();
  console.log('Connection close!')
  callback();
}

function query (table, query, values, callback) {
  connection.query('USE spnos_test', function (err) {
    if (err) return console.error('Error connecting: ' + err.stack);
    connection.query(query, values, function (err, rows) {
      if (err) return callback(err);
      callback(null, rows);
    });
  });
}
