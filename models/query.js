
var db = require('../config/db')

module.exports = {
	get : get, 
	post : other,
	noDbPost : noDbPost
}

function get(table, sql, callback){
  db.single(table, sql, function(err, rows){
    callback(err,rows)
  })
}

function other(table, sql, values, callback){
  db.values(table, sql, values,function(err, rows){
    callback(err,rows)
  })
}

function noDbPost (sq, values, callback) {
	db.noDbValues(sq, values, callback)
}