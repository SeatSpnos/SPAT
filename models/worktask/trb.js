let query = require('models/query2');
let db = 'SE_SPNOS';
module.exports = {

	find 	: find

}

function find(callback){
	var sql = 'SELECT * FROM tipo_trb ORDER BY id ASC'
	query.get(db,sql,callback)
}


  

  
