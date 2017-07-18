var FindContacts = require('./find')
var SaveContacts = require('./save')
var GetJson = require('./generateJson')

module.exports = {
	find 				: find,
	json 				: json,
	save 				: save,
	findHierarchy : findH

}

function find( req, res, next ) {

	req.body.hierarchy = 'Dummy'

	FindContacts( req, res, function( err, results) {
		res.render('pages/km/contacts/contacts', results)
	})
	
}

function json( req, res, next ) {

	GetJson( 'coisas', function( err, data) {

		console.log("data : "+data)
		
	})

}

function save( req, res, next ) {

	SaveContacts( req, res, next )

}

function findH( req, res, next ) {

	console.log(req.body.hierarchy)

	FindContacts( req, res, function( err, results ) {

		res.send(results.config)
	})
}