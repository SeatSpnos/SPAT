
let query = require('models/query2');
let db = 'SE_SPNOS';
module.exports = {
	
	find 					: find,
	findTec 			: findTec,
	findZone 			: findZone,
	findAvailable : findAvailable,
	findName 			: findName,
	create 				: create,
	update 				: update

}

function create(data,callback){
  var sql = 'INSERT work_flow SET date = ?, tecnico = ?, client_number = ?, OT = ?,tipo_OT = ?,tipo_TRB =?, obs = ?, operador = ?, slot_hora = ?'
  var values = [data.date, data.tecnico, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.slot_hora]
  query.post(db, sql, values, callback)
}

function find(callback){
	var sql = 'SELECT * FROM tecnico WHERE active = 1'
	query.get(db, sql, callback)
}

function findTec( id, callback){
	var sql = 'SELECT * FROM tecnico WHERE id = ?'
	let values = [ id ]
	query.post(db, sql, values, callback)
}

function findName(name, date, callback){
	var sql = 'SELECT tecnico.id, tecnico.name FROM tecnico JOIN day WHERE day.tecnico_FK_id = tecnico.id AND day.vacation = ? AND day.folga = ? AND day.falta = ? AND day.date = ?  AND tecnico.name LIKE ?  AND tecnico.active = ? '
	
	let values = [ 0, 0, 0, date,'%'+ name +'%', 1 ]

	query.post(db, sql, values, callback)
}

function findAvailable( date, callback ) {

	var sql = 'SELECT tecnico.id, tecnico.name, tecnico.zona FROM tecnico JOIN day WHERE day.tecnico_FK_id = tecnico.id AND day.vacation = ? AND day.folga = ? AND day.falta = ? AND day.date = ?  AND tecnico.active = ?  '

	let values = [ 0, 0, 0, date, 1 ]

	if( ( new Date( date )).getDay() == 6 ) {

		sql += " AND day.escala = ? "

		values.push( 1 )
	}

	sql += " ORDER BY name ASC"

	query.post(db, sql, values, callback)
}

function findZone(name, callback){
	var sql = 'SELECT * FROM tecnico WHERE zona = ?'
	let values = [name]
	query.post(db, sql, values, callback)
}

function update(data,callback){
	var sql = 'UPDATE work_flow SET date = ?, tecnico = ?, client_number = ?, OT = ?,tipo_OT = ?,tipo_TRB =?, obs = ?, operador = ?, slot_hora = ? WHERE id = ?'
 	var y = [data.date, data.tecnico, data.client_number, data.OT, data.tipo_OT, data.tipo_TRB, data.obs, data.operador, data.slot_hora, data.id]
 	query.post(db,sql,y,callback)
}



  

  
