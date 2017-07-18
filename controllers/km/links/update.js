var model = require('models').km
var async = require('async')

module.exports = {

	hits 	: hits,
	all 	: all

}

function hits( req, res, next ) {
	req.body.user = req.user.id

	var opts = {

    req 		: req,
    res 		: res

  }

	var tasks = [

		async.constant( opts ),
		init,
		addUpdate,
		render,
	]

	async.waterfall( tasks, after )

	function after( err, data ) {

		if(err)	return callback( err, null )

		callback( null, data )

	}
	
}

function init( params, next ) {

	model.links.findHit( params.req.body, function(err, data) {
		if(err) throw err

		params.hasHit = false;

		if(data.length) {
			params.hasHit = true
			params.hit = data[0]
		} 

		next( null, params )	

	})

}



function addUpdate ( params, next ) {

	if( params.hasHit ) {

		model.links.updateHits( params.hit.counter, params.hit.id, function( err, results ) {
			if( err ) throw err

			next( null, params )	

		})


	} else {

		model.links.createHits( params.req.body, function( err, results ) {

			if( err ) throw err

			next( null, params )	

		})		

	}

}



function render( params, next ) {

	params.res.redirect( '/km_link' )

}



function all( req, res, next ) {

	model.links.update( req.body, function( err, rows ) {

		if( err ) throw err

		res.redirect( '/km_link' )

	})

}