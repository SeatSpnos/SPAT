var fs 		= require('fs')
var model = require('models')
var async = require('async')
var navbar 	= require('controllers/navbar').navbar


module.exports = function( req, res, next ) {

	var opts = {

    req 		: req,
    res 		: res,
  }

	var tasks = [

		async.constant( opts ),
		init,
		category,
		tags,
		getNotRead,
		getMsg,
		render
	]

	async.waterfall( tasks, after )

	function after( err, data ) {

		if(err)	return callback( err, null )

		callback( null, data )

	}

}

function init( params, next ) {

	
	model.userMsg.findTotalRead( function( err, result ) {

		params.totaRead = result

		next( null, params )
			
	})

}

function category( params, next ) {

	model.newFeed.categoryFind( function( err, rows) {

		params.category = rows

		next( null, params )

	})

}

function tags( params, next ) {

	model.newFeed.tagsFind( function( err, rows) {

		params.tags = rows

		next( null, params )

	})
	
}


function getNotRead( params, next ) {

	params.oldNews = []

	async.each( params.totaRead, loop, end )

	function loop( msg, callback ){

		if( msg.total != msg.isRead ) {

			msg.percentage = Math.floor( ( msg.isRead /msg.total ) * 100)

			params.oldNews.push( msg )

		} 
			
		callback()

	}

	function end () {

		next( null, params )

	}

}

function getMsg( params, next ) {

	params.editNews = []

	async.each( params.oldNews, loop, end )

	function loop( msg, callback ){

		model.newFeed.allID( msg.msg_FK_id, function( err, rows ) {
			if( err ) throw err

			if( rows.length ) {

				rows[0].percentage = msg.percentage
				params.editNews.push(rows[0])

			}			 

			callback()

		})

	}

	function end () {

		next( null, params )

	}

}


function render ( params, next ) {

	navbar(function(err,bar){

		params.res.render('pages/newFeed/newFeed', {

			navmenu 	: bar, 
			user 			: params.req.user, 
			oldNews 	: params.editNews,
			category 	: params.category,
			tags 			: params.tags

		})

	})

}


