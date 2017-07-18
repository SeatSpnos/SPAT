var query = require('models/query')
var db = 'spnos_test'

module.exports = {
	find : find,
	findS : findS,
	insert : add

}

function find( callback ) {

	var sql = 'SELECT id, name, pai FROM km_contact_sub_category'
	query.get( db, sql, callback )

}

function findS( data, callback ) {

	var sql = 'SELECT * FROM km_contact_sub_category WHERE name = ? AND pai = ?'
	let values = [ data.name, data.pai ]
	query.post( db, sql, values, callback )

}

function add( data, callback ) {
	var sql ='INSERT INTO km_contact_sub_category SET name = ?, zona = ?, pai = ?'
	var values = [ data.name, data.zona, data.pai ]
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