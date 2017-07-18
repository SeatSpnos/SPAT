let query = require('models/query2');
let db = 'SE_SPNOS';
module.exports = {

	find 			: find,
	findName 	: findName,
	edit 			: edit,
	remove 		: remove,
	add 			: add

}

function find(callback){
	var sql = 'SELECT * FROM celula ORDER BY id ASC'
	query.get(db,sql,callback)
}

function findName(name, callback){

	var sql = 'SELECT id, name FROM celula WHERE name LIKE ? ORDER BY id ASC'

	let values = ["%" + name + "%"]

	query.post( db, sql, values, callback )

}


function edit( id, name, callback ) {

	let sql = 'UPDATE celula SET name = ? WHERE id = ?'

	let values = [ id, name ]

	query.post( db, sql, values, callback )

}

function remove( id, callback ) {

	let sql = 'DELETE celula id = ?'

	let values = [ id ]

	query.post( db, sql, values, callback )
	
}

function add( name, callback ) {

	let sql = 'INSERT INTO celula SET name = ? '

	let values = [ name ]

	query.post( db, sql, values, callback )
	
}