const config = require('../../config').database;
const mysql = require('mysql');
let connection;

module.exports = {
  start: start,
  close: close,
  query: query
};

function start (callback) {
  connection = mysql.createConnection(config);
  callback();
}

function close (callback) {
  connection.end();
  callback();
}

function query (table, query, values, callback) {
  connection.query('USE seat_test', function (err) {
    if (err) return console.error('Error connecting: ' + err.stack);
    connection.query(query, values, function (err, rows) {
      if (err) return callback(err);
      callback(null, rows);
    });
  });
}
