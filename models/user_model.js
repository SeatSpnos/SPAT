

//Common-parts-of-all-models++++++++++++++++++++++++++++++++++
var query = require('./query')
var db = 'spnos'

module.exports = {
  all : all,
  selectID: oneId,
  selectName: oneName,
  insert : insert,
  update : save,
  remove : remove,
  allpage: allp,
  newPassword : password
}

function all(callback){
  var sql = 'SELECT * from users'
  query.get(db, sql, callback)
}

function allp(callback){
  var sql = 'SELECT id, username, firstName, lastName, group_permission, state FROM users'
  query.get(db, sql, callback)
}
function oneId(id, callback){
  var sql = 'SELECT * from users WHERE id = "'+id+'"'
  query.get(db, sql,callback)
}
function oneName(username, callback){
  var sql = 'SELECT * from users WHERE username = "'+username+'"'
  query.get(db, sql,callback)
}

function insert(data,callback){
  var sql = 'INSERT INTO users SET state= "' + data.state+'"' + ',comments = '+ '"' + data.comments+'"' + ',cartao_nos = '+ '"' + data.cartao_nos+'"' + ',carta_conducao = '+ '"' + data.carta_conducao+'"' + ', phonenumber = '+ '"' + data.phonenumber+'"' + ',foto = '+ '"' + data.user_foto+'"' + ',data_entrada = '+ '"' + data.data_entrada+'"' + ', data_nascimento = '+ '"' + data.data_nascimento+'"' + ',username = '+ '"' + data.username+'"' + ', firstName = '+ '"' + data.firstName+'"' + ', lastName = '+ '"' + data.lastName+'"' + ', email = '+ '"' + data.email+'"' + ', password = '+ '"' + data.password +'"'
    query.get(db, sql,callback)
}

function save (data, callback){
  var sql = 'UPDATE users SET group= "'+ data.group+'",state= "' + data.state+'"' + ',comments = '+ '"' + data.comments+'"' + ',cartao_nos = '+ '"' + data.cartao_nos+'",carta_conducao = "' + data.carta_conducao+'", phonenumber = '+ '"' + data.phonenumber+'"' + ',foto = '+ '"' + data.user_foto+'"' + ',data_entrada = '+ '"' + data.data_entrada+'"' + ', data_nascimento = '+ '"' + data.data_nascimento+'"' + ',username = '+ '"' + data.username+'"' + ', firstName = '+ '"' + data.firstName+'"' + ', lastName = '+ '"' + data.lastName+'"' + ', email = '+ '"' + data.email+'"' + ', password = '+ '"' + data.password +'" WHERE id = "' + data.user_id + '"'
  query.get(db, sql,callback)
}

function password(user,password,callback){
  var sql = 'UPDATE users SET password = "'+password+'" WHERE username= "'+user+'"'
  query.get(db,sql,callback)
}
function remove(data, callback){
  var sql = 'DELETE FROM users WHERE id = ' + '"' + data.user_id
  query.get(db, sql, callback)
}