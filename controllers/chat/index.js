var ChatCreate 	= require('./create')
var ChatFind 		= require('./find')

module.exports = {
	create 	: create,
	find		: find,

}


function create(req,res,next){
	ChatCreate(req,res,function(err,data){
		if(err) next(err,data)
		res.status(201)
	})
}

function find(req,res,next){
	ChatFind(req,res,next)
}
