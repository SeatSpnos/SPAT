let query = require('models/query2');
let db = 'SE_SPNOS';

module.exports = {
	find : find,
	findC : findC,
	insert : add

}

function find( callback ) {

	var sql = 'SELECT id, name FROM km_contact_category '
	query.get( db, sql, callback )

}

function findC( data, callback ) {
	var sql ='SELECT * FROM km_contact_category WHERE name = ?'
	var values = [ data.name ]
	query.post( db, sql, values, callback)
}

function add( data, callback ) {
	var sql ='INSERT INTO km_contact_category SET name = ?'
	var values = [data.name ]
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