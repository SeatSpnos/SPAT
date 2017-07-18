var model = require('models')

module.exports = function( req, res, next ) { 

	model.newFeed.inactive( req.body.id, function( err, rows) {

		if( err ) throw err

		res.status(200)

	})
	
}