var query = require('./query')
var db = 'seat'
var sql
module.exports = {

	all : all_groups,
	selectOne : select_group,
	insert : insert,
	save : save
}


function all_groups(callback){
	sql = 'SELECT * from groups'
  query.get(db, sql, callback)
}

function select_group (data, callback){
  sql = 'SELECT * from groups WHERE id = ' + data.group_id
  query.get(db, sql,callback)
}


function insert(data,callback){
  sql = 'INSERT INTO groups (group_name ,group_nav_bar_FK_id, group_submenu_FK_id, group_content_FK_id VALUES ("","' + data.group_name + '","' +data.group_menu+'","' +data.group_submenu+ '","' +data.group_content +'")'
  query.get(db, sql,callback)
}

function save (data, callback){
  sql = 'UPDATE groups SET group_groupname = "'+ data.group_name + '", group_nav_bar_FK_id = "'+ data.group_menu + '", group_submenu_FK_id = "'+ data.group_submenu + '", group_content_FK_id = "'+ data.group_content +'" WHERE id = "'+ data.group_id + '"  '
  query.get(db, sql,callback)
}
