
var ECreate = require('./create')
var EFind 	= require('./find')
var EClear 	= require('./clear')
module.exports = {
	create 	: create,
	find 		: find,
	update 	: require('./update'),
	clear 	: clear
}

function create(req, res, next){
	ECreate(req, res, function(err, rows){
		if(err) throw err
		res.status(201)
	})
}

function find(req, res, next){
	EFind(req, res, next)
}

function clear(req, res, next){
	EClear(req, res, next)
}