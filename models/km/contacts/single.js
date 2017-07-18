var query = require('models/query')
var db = 'spnos_test'

module.exports = {
	find : find,
	findID : findID,
	findPai : findPai,
	insert : add

}

function find( callback ) {

	var sql = 'SELECT * FROM km_contact_single '
	query.get( db, sql, callback )

}

function findPai( name,  callback ) {

	var sql = 'SELECT * FROM km_contact_single WHERE pai = ?'
	let values = [ name ]
	query.post( db, sql, values, callback )

}

function findID( id, pai, callback ) {

	var sql = 'SELECT * FROM km_contact_single WHERE ID = ? AND pai = ?'
	var values = [ id, pai ]
	query.post( db, sql, values, callback )

}

function add( data, callback ) {

	var sql ='INSERT INTO km_contact_single SET name = ?, title = ?, email = ?, phone = ?, p_ID = ?, competencias = ?, pai = ?'
	var values = [ data.name, data.title, data.email, data.phone, data.p_ID, data.competencias, data.pai ]
	query.post( db, sql, values, callback)

}

function edit ( data, callback ) {

	var sql ='UPDATE km_contact_single SET name = ?, title = ?, email = ?, phone = ?, p_ID = ?, competencias = ? WHERE id = ?'
	var values = [ data.name, data.title, data.email, data.phone, data.p_ID, data.competencias, data.id ]
	query.post( db, sql, values, callback)

}

function del ( data, callback ) {

	var sql =''
	var values = []
	query.post( db, sql, values, callback)
	
}