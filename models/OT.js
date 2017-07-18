var query = require('models/query')
var db = 'nos'
module.exports = {
	getEstado 			: getEstado,
	getDescription 	: getDescription,

}

function getEstado(ot, callback){
  var sql = 'SELECT estado, RESULTADO FROM ots WHERE Codigo_ot = ?'
  var values = [ot]
	query.post(db, sql, values, callback)
}

function getDescription(ot, callback) {

	var sql = 'SELECT estado, DESCRICAO FROM ots WHERE Codigo_ot = ?'
  var values = [ot]
	query.post(db, sql, values, callback)

}