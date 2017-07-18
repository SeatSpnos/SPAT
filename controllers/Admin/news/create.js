var fs 		= require('fs')
var model = require('models')
var async = require('async')

module.exports = function( req, res, next ) {

	
	var opts = {

    req 		: req,
    res 		: res,
    data 		: {

		title 			: req.body.Title,
		text 				: req.body.about,
		priority 		: req.body.priority,
		required 		: req.body.required,
		group 			: req.body.group,
		category 		: req.body.category,
		tags				: req.body.tags,
		attachment	: "",
		expireDate  : req.body.dateEnd

		}

  }

	var tasks = [

		async.constant( opts ),
		init,
		isEdit,
		selectUsers,
		addToUsers,
		category,
		tags,
		render
	]

	async.waterfall( tasks, after )

	function after( err, data ) {

		if(err)	return callback( err, null )

		callback( null, data )

	}

}

function init( params, next ) {

	if( params.req.files.length ) {
		
		params.data.attachment 	= '/uploads/' + params.req.files[0].originalname
		
		rename( params.req.files )

	}

	params.data.tags2 = params.data.tags
	params.data.tags = "#"+params.data.tags.join('#')
	
	model.newFeed.insert( params.data, function( err, result ) {

		params.id = result.insertId

		next( null, params )
			
	})

}



function isEdit( params, next ) {

	if( !( params.req.body.isEdit == 'false' ) ) {

		model.newFeed.inactive( params.req.body.isEdit, function( err, rows) {

		if( err ) throw err

		next( null, params )

	})

	} else {

		next( null, params )
	}

}

function selectUsers( params, next ) {

	if(params.data.group !== 'Todos') {

		model.user.allG( params.data.group, function( err, users ) {

			params.users = users

			next( null, params )

		})

	} else {

		model.user.all( function( err, users ) {

			params.users = users

			next( null, params )

		})

	}

}

function addToUsers( params, next ) {

	async.each( params.users, add, end )

	function add( user, callback ){

		if( user.id != params.req.user.id ) {

			model.userMsg.insert( params.id, user.id, function( err, data ) {

				if( err ) next( err, data )

				callback()	

			})

		} else {

			model.userMsg.insertRead( params.id, user.id, function( err, data ) {

				if( err ) next( err, data )

				callback()	

			})

		}		

	}

	function end () {

		next( null, params )

	}

}


function category ( params, next ) {

	model.newFeed.categoryFindOne( params.data.category, function( err, rows ) {

		if(rows.length) next( null, params)

		else {

			model.newFeed.categoryAdd( params.data.category, function( err, rows) {
				if( err ) throw err

				next( null, params )
					
			})

		}  	

	})

}

function tags ( params, next ) {

	async.each( params.data.tags2, loop, end )

	function loop( tag, callback ) {

		model.newFeed.tagsFindOne( tag, function( err, rows ) {

			if(rows.length) callback()

			else {

				model.newFeed.tagsAdd( tag, function( err, rows) {

					if( err ) throw err

					callback()
						
				})
				
			}  	

		})

	}

	function end( err ) {

		if( err ) throw err

		next( null, params)	

	}	

}



function render ( params, next ) {

	params.res.redirect( '/' )

}



function rename( files ) {

	fs.rename( './public/uploads/' + files[0].filename, './public/uploads/' + files[0].originalname, function(err) {

    if ( err ) console.log( 'ERROR: ' + err )

	})

}