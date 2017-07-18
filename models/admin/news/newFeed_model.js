
let query = require('models/query2');
let db = 'SE_SPNOS';
module.exports = {

	select 						: all,
	insert 						: insert,
	allID	 						: allID,
	categoryFind 			: categoryFind,
  tagsFind     			: tagsFind,
  categoryFindOne 	: categoryFindOne,
  tagsFindOne     	: tagsFindOne,
  categoryAdd   		: categoryAdd,
  tagsAdd 					: tagsAdd,
  inactive 					: inactive


}

function insert(data,callback){
  var sql = 'INSERT newsfeed SET title = ?, text = ?, priority = ?, required = ?, grupo = ?,date= ?, category = ?, tags = ?, attachment = ?, active = ?, expireDate = ?'
  var values = [ data.title, data.text, data.priority, data.required, data.group, new Date(), data.category, data.tags, data.attachment, 1, data.expireDate ]
	query.post(db, sql, values, callback)
}

function all( callback ) {

	var sql = 'SELECT * FROM newsfeed WHERE active = ? AND expireDate >= ? ORDER BY priority DESC'
	var values = [ 1, new Date() ]

	query.post( db, sql, values, callback )

}

function allID(id, callback){
	let sql = 'SELECT * FROM newsfeed WHERE id = ? AND active = 1 AND expireDate >= ?'
	let values = [ id, new Date ]
	query.post(db, sql, values, callback)
}

function categoryFind( callback ) {

	var sql = 'SELECT * FROM newsfeed_category ORDER BY name ASC'

	query.get( db, sql, callback )

}

function tagsFind( callback ) {

	var sql = 'SELECT * FROM newsfeed_tags ORDER BY name ASC'

	query.get( db, sql, callback )
	
}

function categoryFindOne( name, callback ) {

	var sql = 'SELECT * FROM newsfeed_category WHERE name =?'
	var values = [name]

	query.post( db, sql, values, callback )

}

function tagsFindOne( name, callback ) {

	var sql = 'SELECT * FROM newsfeed_tags WHERE name = ?'
	var values = [name]

	query.post( db, sql, values, callback )
	
}

function categoryAdd( name, callback ) {

	var sql 		= 'INSERT newsfeed_category SET name = ?'
	var values 	= [name]

	query.post( db, sql, values, callback )

}

function tagsAdd( name, callback ) {

	var sql 		= 'INSERT newsfeed_tags SET name = ?'
	var values 	= [name]

	query.post( db, sql, values, callback )

}

function inactive( id, callback ) {

	var sql 		= 'UPDATE newsfeed SET active = ? WHERE id = ?'
	var values 	= [0, id]

	query.post( db, sql, values, callback )
}