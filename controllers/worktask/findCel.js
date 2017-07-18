var model = require('models')


module.exports = function( req, res, next ) {

	model.celula.findName( req.query.name, function( err, data ) {

		if( err )	throw err
		 	
		res.json( data )
	
	})

}