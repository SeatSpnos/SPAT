const config = require('./configDB');
const mysql = require('mysql');
const pool = mysql.createPool(config);

module.exports = function (table, query, values, callback) {
  if (typeof values === 'function') { 
     callback = values; 
     values = []; 
   }
  pool.getConnection(function(err, connection) {
    connection.query(`USE ${table}`, function (err) { 
      if (err) return callback(err); 
      connection.query(query, values, function (err, rows) { 
        if (err) return callback(err);
        callback(null, rows); 
      });
    });
  });
}