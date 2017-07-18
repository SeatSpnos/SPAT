

//Common-parts-of-all-models++++++++++++++++++++++++++++++++++
let query = require('models/query2');
let db = 'SE_SPNOS';

module.exports = {
  all         : all,
  selectID    : oneId,
  selectName  : oneName,
  allGroup    : allGroup,
  insert      : insert,
  update      : save,
  remove      : remove,
  allpage     : allp,
  newPassword : password,
  reset       : reset,
  allG        : allG,
  required    : required
}

function all(callback){
  var sql = 'SELECT * from users'
  query.get(db, sql, callback)
}

function allp(callback){
  var sql = 'SELECT id, username, firstName, lastName, group_permission, state FROM users'
  query.get(db, sql, callback)
}

function allGroup(group, callback){
  var sql = 'SELECT * FROM users WHERE group_permission = ?'
  var values = [group]
  query.post(db, sql, values, callback)
}

function required(req, id, callback){
  let sql = 'UPDATE users set required = ? WHERE id = ?'
  let values = [req, id]
  query.post(db, sql, values, callback)
}

function allG(group,callback){
  let sql = 'SELECT * FROM users WHERE group_permission = ?'
  let values = [group]
  query.post(db, sql, values, callback)
}

function oneId(id, callback){
  var sql = 'SELECT * from users WHERE id = ?'
  var values = id
  query.post(db, sql, values, callback)
}
function oneName(username, callback){
  var sql = 'SELECT * from users WHERE username = ?'
  var values = username
  query.post(db, sql, values, callback)
}

function insert(data,callback){
  var sql = 'INSERT INTO users SET state= ?,comments = ?,cartao_nos = ? ,carta_conducao = ?, phonenumber = ?,foto = ?,data_entrada = ?, data_nascimento = ?,username = ?, firstName = ?, lastName = ?, email = ?, password = ?, firstLogIn = "True"'
  var values = [data.state,data.comments,data.cartao_nos, data.carta_conducao, data.phonenumber, data.foto, data.data_entrada,data.data_nascimento, data.username,data.firstName,data.lastName, data.email,data.password]
  query.post(db, sql, values, callback)
}

function save (data, callback){
  var sql = 'UPDATE users SET group_permission= ?, state= ?, comments = ?, cartao_nos = ?, carta_conducao = ?, phonenumber = ?, foto = ?, data_entrada = ?, data_nascimento =?, username = ?, firstName = ?, lastName = ?, email = ? WHERE id = ?'
  var values = [data.group, data.state, data.comments, data.cartao_nos, data.carta_conducao, data.phonenumber, data.foto, data.data_entrada, data.data_nascimento, data.username, data.firstName, data.lastName, data.email, data.id]
  query.post(db, sql, values, callback)
}

function password(user,password,callback){
  var sql = 'UPDATE users SET password = ? , firstLogIn = "False" WHERE username= ?'
  var values = [password,user]
  query.post(db, sql, values, callback)
}
function remove(id, callback){
  var sql = 'UPDATE users SET state = "Inactive" WHERE id = ?'
  var values = [id]
  query.post(db, sql, values, callback)
}

function reset(id, pass, callback){
  var sql = 'UPDATE users SET firstLogIn = "True" , password = ? WHERE id = ?'
  var values = [pass, id]
  query.post(db, sql, values, callback)
}