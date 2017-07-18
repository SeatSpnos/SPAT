var model = require('models')


module.exports = function( req, res, next ) {

	model.tec.findAvailable( req.query.date, function( err, data ) {

		if( err )	throw err

		res.json( data )
	
	})

}