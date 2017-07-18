var model = require('models').km
var navbar 	= require('controllers/navbar').navbar

module.exports = {
	one : one,
	all : all
}

function one( req, res, next ) {

	model.links.updateHits(req.params.id, function(err, rows){

	})
}

function all( req, res, next ) {

	model.links.find(function(err, rows){

		model.links.findTopHits( req.user.id, function ( err, top ) {

			navbar(function(err,bar){

				res.render('pages/km/link/links', { user : req.user, links : rows, top : top, navmenu : bar })

			})

		})
		
	})

}