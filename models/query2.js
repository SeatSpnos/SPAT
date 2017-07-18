const db = require('../config/db2');

module.exports = {
	get : get, 
	post : post,
	noDbPost: noDbPost
}

function get(table, sql, callback){
  db.single(table, sql, function(err, rows){
    callback(err,rows)
  })
}

function post(table, sql, values, callback){
  db.values(table, sql, values,function(err, rows){
    callback(err,rows)
  })
}
function noDbPost (sq, values, callback) {
	db.noDbValues(sq, values, callback)
}