var model = require('models')
var menus = require('controllers/navbar').navbar
var async = require('async')
var GetJson = require('./generateJson')

module.exports = function( req, res, next ) {

	var opts = {

    params 	: req,
    res 		: res,
    next 		: next

  }

	var tasks = [

		async.constant( opts ),
		init,
		category,
		subcategory,
		funcao,
		contacts,
		getJSON,
		render
	]

	async.waterfall( tasks, after )

	function after( err, data ) {

		if(err)	return callback( err, null )

		callback( null, data )

	}

}



function init( params, next ) {

	next( null, params )

}



function category( params, next ) {
	
	model.km.contacts.category.find( function( err, data ) {

		if(err)	throw err

		params.category = data

		next( null, params )

	})

}



function subcategory( params, next ) {

	model.km.contacts.sCategory.find( function( err, data ) {

		if(err)	throw err

		params.subcategory = data

		next( null, params )

	})
	
}



function funcao( params, next ) {

	model.km.contacts.tCategory.find( function( err, data ) {

		if(err)	throw err

		params.function = data

		next( null, params )

	})
}



function contacts( params, next ) {

	model.km.contacts.contacts.find( function( err, data ) {

		if(err)	throw err

		params.contacts = data

		next( null, params )

	})

}

function getJSON( params, next) {

	console.log(params.params.body.hierarchy)

	GetJson( params.params.body.hierarchy, function( err, data ) {

		params.config = data

		next( null, params)

	})
}


function render( params, next ) {

	menus( function( err, rows ) {

		var data = {

			user 					: params.params.user,
			category 			: params.category,
			subcategory   : params.subcategory,
			functions			: params.function,
			contacts 			: params.contacts,
			navmenu				: rows,
			config 				: params.config

		}

		params.next(null, data)


	})

}