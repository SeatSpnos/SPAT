var model = require('models').worktask
var Find 	= require('./find')

module.exports = function ( req, res, next ) {

	model.findOT(req.body.slotsID, function( err, data ) {

		if( data.length && data[0].id == req.body.id){

			model.delOT( req.body.slotsID, function( err, data ) {

				Find( { body : { date: req.body.hora, tec_id : req.body.tec_id }, user : req.user }, res, next)

			})

		} else {

			model.del( req.body.id, function( err, data ) {

				Find( { body : { date : req.body.hora, tec_id : req.body.tec_id }, user : req.user}, res, next )

			})

		}

	})

}