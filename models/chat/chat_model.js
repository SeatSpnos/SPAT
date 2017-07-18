let query = require('models/query2');
let db = 'SE_SPNOS';
module.exports = {

	find 		: find,
	create 	: create

}

function find(callback){
	var sql = 'SELECT * FROM chat ORDER BY time ASC'
	query.get(db, sql, callback)
}

function create (data, callback){
	var sql = 'INSERT chat SET time = ?, msg = ?, user = ? '
	var values = [data.date, data.msg, data.user]
}