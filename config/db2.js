var dbconfig   = require('./db')
var mysql      = require('mysql')
var connection = mysql.createConnection({
  'host'      : 'portal-dimc',
  'user'      : 'SEAT',
  'password'  : '',
  'multipleStatements': true,
  'dateStrings': 'date'
})

module.exports = {
  single : single,
  values : values,
  noDbValues : noDbValues
}

function single(table, sql, callback){
  connection.query('USE ' + table ,function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack)
      return;
    }
})

  connection.query(sql, function(err, rows){
    if(err) throw err
    callback(null, rows)
    })
}


function values(table, sql, val, callback){
  connection.query('USE ' + table ,function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack)
      return;
    }
})

  connection.query(sql, val, function(err, rows){
    if(err) throw err
    callback(null, rows)
    })
}

function noDbValues( sql, val, callback){

  connection.query(sql, val, function(err, rows){

    if(err) throw err

    callback(null, rows)

    })
  
}
