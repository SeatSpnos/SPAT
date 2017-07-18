var FindLinks = require('./find')
var UpdateLinks = require('./update')
var CreateLinks = require('./create')
var EditLinks = require('./edit')


module.exports = {
	find 				: find,
	findOne 		: one,
	edit				: edit,
	update 			: update,
	updateHits 	: hits,
	create 			: create

}

function find(req, res, next){
	FindLinks.all(req, res, function(err, data){
		if(err) next (err, data)
		next(null, data)
	})
}

function one(req, res, next){
	FindLinks.one(req, res, function(err, data){
		if(err) next (err, data)
		next(null, data)
	})
}

function edit(req, res, next){
	EditLinks(req, res, next)
}

function update(req, res, next){
	UpdateLinks.all(req, res, function(err, data){
		if(err) next (err, data)
		next(null, data)
	})
}

function hits( req, res, next ){

	UpdateLinks.hits( req, res, next )
	
}

function create(req, res, next){
	CreateLinks(req, res, function(err, data){
		if(err) next (err, data)
		next(null, data)
	})
}