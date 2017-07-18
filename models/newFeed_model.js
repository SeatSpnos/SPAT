
var query = require('./query')
var db = 'spnos'

var mysql      = require('mysql')
var connection = mysql.createConnection({
  'host'      : 'localhost',
  'user'      : 'root',
  'password': 'TNQIDKFA',
  'multipleStatements': true,
  'dateStrings': 'date'
})
module.exports = {

	select : all,
	insert : insert

}

function insert(data,callback){
  var sql = 'INSERT newsfeed SET title = ?, text = ?, priority = ?, required = ?,grupo = ?,date=?, category = ?, tags = ?'
  var y = [data.title,data.text,data.priority,data.required,data.group,new Date(), data.category,data.tags]
	
	connection.query.get('USE ' + db ,function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack)
      return;
    }
    console.log('Connection established')
})

	connection.query.get(sql,y, function(err, rows){
    if(err) throw err
    callback(null, rows)
    })

}

function all(callback){
	var sql = 'SELECT * FROM newsfeed'
	query.get(db,sql,callback)
}




  

  
