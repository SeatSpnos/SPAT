var navbar = require('models').navbar 

module.exports = function (callback){ 
	navbar(function(err,rows){
		rows.forEach(function(r){
			if(r['submenu'] !== '#'){
				r['submenu'] = r['submenu'].split(',')
				r['sublinks'] = r['sublinks'].split(',')
			}				 
		})
		callback(err,rows)
	})	
}
