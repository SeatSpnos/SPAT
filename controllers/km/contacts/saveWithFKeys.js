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

		console.log('Contacts inserted : '+ contacts)	

		params.contacts = contacts

		next( null, params)

	})

}


function tCategory( params, next ) {

	var tCat = []
	var tCatID = []

	async.each( params.contacts, loop, end)

	function loop( contact, callback) {

		var temp = {

			name : params.req.body.tCategoryName,
			single_FK_ID : contact,
			pai : params.req.body.sCategoryName

		}

		tCat.push(temp)

		callback()

	}

	function end(){

		async.each( tCat, endLoop, finish )

		function endLoop( t, callbackEnd ) {

			model.tCategory.findT(t, function( err, res) {

				if( res.length ) {

						callbackEnd()

				} else {

					model.tCategory.insert( t, function( err, results) {

						if( err ) throw err

						tCatID.push( results.insertId )

						callbackEnd()
							
					})

				}

			})

		}

		function finish() {

			params.tCatID = tCatID

			console.log(' Inserted fCat :' + tCatID )

			next( null, params )

		}

	}

}

function sCategory( params, next ) {

	var sCat = []
	var sCatID = []

	async.each( params.tCatID, loop, end)

	function loop( tCat, callback) {

		var temp = {

			name : params.req.body.sCategoryName,
			function_FK_ID : tCat,
			pai : params.req.body.categoryName,
			zona : params.req.body.sCategoryZona

		}

		sCat.push(temp)

		callback()

	}

	function end(){

		async.each( sCat, endLoop, finish )

		function endLoop( s, callbackEnd ) {

			model.sCategory.findT( s, function( err, res) {

				if( res.length ) {

						callbackEnd()

				} else {

					model.sCategory.insert( s, function( err, results) {

						if( err ) throw err

						sCatID.push( results.insertId )

						callbackEnd()
							
					})

				}

			})			

		}

		function finish() {

			console.log(' Inserted sCat :' + sCatID )

			params.sCatID = sCatID

			next( null, params )

		}

	}

}

function category( params, next ) {

	var cat = []


	async.each( params.sCatID, loop, end)

	function loop( sCat, callback) {

		var temp = {

			name : params.req.body.categoryName,
			sub_category_FK_ID : sCat

		}

		cat.push(temp)

		callback()

	}

	function end(){

		async.each( cat, endLoop, finish )

		function endLoop( c, callbackEnd ) {

			model.category.findT( c, function( err, res) {

				if( res.length ) {

						callbackEnd()

				} else {

					model.category.insert( c, function( err, results) {

						if( err ) throw err

						callbackEnd()
							
					})

				}

			})	

		}

		function finish() {

			next( null, params )

		}

	}

}


function render( params, next )  {

	params.res.redirect('/')

}