//Common-parts-of-all-models++++++++++++++++++++++++++++++++++
let query = require('models/query2');
let db = 'SE_SPNOS';

module.exports = {
	find 		     : all,
	findOne      : one,
  findHit      : findHit,
  findTopHits  : findTopHits,
	update       : save,
	updateHits   : hits,
  create       : create,
  createHits   : createHit 
}

function all (callback){
  var sql = 'Select * FROM km_links ORDER BY categoria ASC'
  query.get(db, sql, callback)
}

function one (id, callback){
  var sql = 'Select * FROM km_links WHERE id = ?'
  var values = [id]
  query.post(db, sql, values, callback)
}

function hits(counter, id, callback){

  var sql     = 'UPDATE km_links_user SET counter = ? WHERE id = ? '
  var values  = [+counter+1, id]

  query.post(db, sql, values, callback)

}

function createHit( data, callback ) {

  var sql     = 'INSERT INTO km_links_user SET link_FK_ID = ?, user_FK_ID = ?, counter = ?'
  var values  = [data.link, data.user, 1]

  query.post( db, sql, values, callback )

}

function findHit( data, callback ) {

  var sql     = 'SELECT * FROM km_links_user WHERE link_FK_ID = ? AND user_FK_ID = ?'
  var values  = [ data.link, data.user ]

  query.post( db, sql, values, callback )

}

function findTopHits( id, callback ) {

  var sql = 'SELECT * FROM km_links_user WHERE user_FK_ID = ? ORDER BY counter DESC'
  var values = [id]

  query.post( db, sql, values, callback )
}

function save (data, callback){
	var sql = 'UPDATE km_links SET link = ?, user = ?, password = ?, categoria = ?, tooltip = ?, name = ? WHERE id = ?'
	var values = [data.link, data.user, data.password, data.categoria, data.tooltip, data.name, data.id]
	query.post(db, sql, values, callback)
}

function create (data, callback){
  var sql = 'INSERT INTO km_links SET link = ?, user = ?, password = ?, categoria = ?, tooltip = ?, name = ?'
  var values = [data.link, data.user, data.password, data.categoria, data.tooltip, data.name]
  query.post(db, sql, values, callback)
}
