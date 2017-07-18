var db = require('../config/db2')

function get(table, sql, callback){
  db.single(table, sql, function(err, rows){
    callback(err,rows)
  })
}

function post(table, sql, values, callback){
  db.values(table, sql, values,function(err, rows){
    callback(err,rows)
  })
}
module.exports = function (ot, callback){
  var sql = 'SELECT BONIFICACAO, OBS_CTL, SIT_CTL, DESCRICAO, RESULTADO  FROM vw_edist_new WHERE CODIGO_OT = ?'
  var values = [ot]
	post('skynet', sql, values, callback)
}