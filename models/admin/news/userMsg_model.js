let query = require('models/query2');
let db = 'SE_SPNOS';

module.exports = {

	allNew 				: allNew,
	allOld 				: allOld,
	findTotalRead : findTotalRead,
	insert 				: insert,
	insertRead 		: insertRead,
	update 				: update

}

function insert( msg, user, callback ) {

  var sql = 'INSERT usermsg SET user_FK_id= ?, msg_FK_id = ?, isRead = ?'
  var values = [user, msg, 0]

	query.post(db,sql,values, callback)

}

function insertRead( msg, user, callback ) {

  var sql = 'INSERT usermsg SET user_FK_id= ?, msg_FK_id = ?, isRead = ?'
  var values = [user, msg, 1]

	query.post( db, sql, values, callback )

}

function findTotalRead( callback ) {

	var sql = 'SELECT msg_FK_id, count(user_FK_id) as total , sum(isRead) isRead FROM  usermsg GROUP BY msg_FK_id ORDER BY msg_FK_id ASC'
	query.post( db, sql, callback )

}

function allNew( id, callback ) {

	var sql = 'SELECT * FROM usermsg WHERE isRead = ? AND user_FK_id = ? ORDER BY id DESC'
	let values = [0,id]

	query.post( db, sql, values, callback )

}

function allOld( id, callback ) {

	var sql = 'SELECT * FROM usermsg WHERE user_FK_id = ? AND isRead = "Yes" ORDER BY id DESC'
	let values = [id]

	query.post(db, sql, values, callback)

}

function update( msg, user, callback ) {

	var sql = 'UPDATE usermsg SET isRead = ? WHERE msg_FK_id= ? AND user_FK_id = ?'
	let values = [1, msg, user]

	query.post( db, sql, values, callback )

}

  

  
