var model 	= require('models')
var find 		= require('./find')

module.exports = function( req, res, next ){

	model.userMsg.update( req.body.id, req.user.id, function( err, data ) {

		if( err ) next( err, data )

		find( req, res, next )
	})
}