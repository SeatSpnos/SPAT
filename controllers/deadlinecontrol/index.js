var WTCreate 	= require('./create')
var WTCreateWT 	= require('./createWT')
var WTFind 		= require('./find')
var WTAdd			= require('./add')
var WTAddWT			= require('./addWT')
var WTDel			= require('./delete') 
module.exports = {
	create 	: create,
	find		: find,
	add			: add,
	del			: del,
	createWT 	: createWT,
	addWT			: addWT

}


function create(req,res,next){
	WTCreate(req,res,function(err,data){
		if(err) next(err,data)
		res.status(201)
	})
}

function createWT(req,res,next){
	WTCreateWT(req,res,function(err,data){
		if(err) next(err,data)
		res.status(201)
	})
}

function find(req,res,next){
	WTFind(req,res,next)
}

function add(req,res,next){
	WTAdd(req.body,res,next)
}
function addWT(req,res,next){
	WTAddWT(req.body,res,next)
}

function del(req, res, next){
	WTDel(req, res, next)
}
