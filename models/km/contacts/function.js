let query = require('models/query2');
let db = 'SE_SPNOS';

module.exports = {
	find : find,
	findT : findT,
	insert : add

}

function find( callback ) {

	var sql = 'SELECT id, name, pai FROM km_contact_function '
	query.get( db, sql, callback )

}

function findT( data, callback ) {

	var sql = 'SELECT * FROM km_contact_function WHERE name = ? AND pai = ?'
	let values = [ data.name, data.pai ]
	query.post( db, sql, values, callback )

}

function add( data, callback ) {
	var sql ='INSERT INTO km_contact_function SET name = ?, pai = ?'
	var values = [ data.name, data.pai ]
	query.post( db, sql, values, callback)
}

function edit ( data, callback ) {
	var sql =''
	var values = []
	query.post( db, sql, values, callback)
}

function del (  data, callback ) {
	var sql =''
	var values = []
	query.post( db, sql, values, callback)
}