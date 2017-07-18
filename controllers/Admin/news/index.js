var CreateNews 		= require('./create')
var FindNews 			= require('./find')
var InactiveNews 	= require('./inactive')
module.exports = {

find 			: find,
create		: create,
inactive 	: inactive

}

function find(req, res, next){

	FindNews( req, res, next )

}

function create(req,res,next){
	CreateNews(req,res,function(err,data){
		 if (err) return next(err)

    res.sendStatus(201)
	})
}

function inactive( req, res, next ) {
	InactiveNews ( req, res, next )
}