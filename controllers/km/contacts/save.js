var saveContacts = require('./saveContacts')
var model = require('models').km.contacts
var async = require('async')


module.exports = function( req, res, next ) {

	req.body.contacts = JSON.parse(req.body.contacts)

	var opts = {

    req : req,
    res : res

  }

	var tasks = [

		async.constant( opts ),
		contacts,
		tCategory,
		sCategory,
		category,
		render
	]

	async.waterfall( tasks, after )

	function after( err, data ) {

		if(err)	return callback( err, null )

		callback( null, data )

	}

}


function contacts( params, next ) {

	saveContacts( params.req.body.contacts, params.req.body.tCategoryName, function( err, contacts) {

		if( err ) throw err

		next( null, params)

	})

}


function tCategory( params, next ) {

	var data = {

		name 					: params.req.body.tCategoryName,
		pai 					: params.req.body.sCategoryName

	}

	model.tCategory.findT( data, function( err, res) {

		if( res.length ) {

			next( null, params )

		} else {

			model.tCategory.insert( data, function( err, results) {

				if( err ) throw err

				next( null, params )
					
			})

		}

	})
}

function sCategory( params, next ) {

	

	var data = {

		name : params.req.body.sCategoryName,
		pai : params.req.body.categoryName,
		zona : params.req.body.sCategoryZona

	}


	model.sCategory.findS( data, function( err, res) {

		if( res.length ) {

				next( null, params )

		} else {

			model.sCategory.insert( data, function( err, results) {

				if( err ) throw err

				next( null, params )
					
			})

		}

	})

}

function category( params, next ) {

	var data = {

		name : params.req.body.categoryName,

	}

	model.category.findC( data, function( err, res) {

		if( res.length ) {

				next( null, params )

		} else {

			model.category.insert( data, function( err, results) {

				if( err ) throw err

				next( null, params )
					
			})

		}

	})	


}


function render( params, next )  {

	params.res.redirect('/km_contacts')

}