var model = require('models')


module.exports = function( req, res, next ) {

	model.tec.findName( req.query.name, req.query.date, function( err, data ) {

		if( err )	throw err

		res.json( data )
	
	})

}