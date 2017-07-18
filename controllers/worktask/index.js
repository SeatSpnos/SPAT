var WTCreate 	= require('./create')
var WTFind 		= require('./find')
var WTAdd			= require('./add')
var WTDel			= require('./delete') 
var WTReserve = require('./reserve')
var WTPicket	= require('./picket')
var WTNoWork	= require('./nowork')
var WTVerify 	= require('./verify')
var WTFindCel = require('./findCel')
var WTFindTec = require('./findTec')
var WTFindAvaliableTec = require('./findAvaliableTec')


module.exports = {
	create 				: create,
	find					: find,
	findCel				: findCel,
	findTec				: findTec,
	add						: add,
	del						: del,
	reserve				: reserve,
	picket				: picket,
	nowork 				: nowork,
	verify 				: verify,
	findAvailable : findAvailable
}


function create(req,res,next){
	WTCreate(req,res,function(err,data){
		if(err) next(err,data)
		res.status(201)
	})
}

function find(req,res,next){
	WTFind(req,res,next)
}

function findCel(req,res,next){
	WTFindCel(req,res,next)
}

function findTec(req,res,next){
	WTFindTec(req,res,next)
}

function add(req,res,next){
	WTAdd(req.body,res,next)
}

function del(req, res, next){
	WTDel(req, res, next)
}

function reserve(req, res, next){
	WTReserve(req,res,function(err,data){
		if(err) next(err,data)
		res.status(201)
	})
}

function picket(req, res, next){
	WTPicket(req,res,function(err,data){
		if(err) next(err,data)
		res.status(201)
	})
}

function nowork(req, res, next){
	WTNoWork(req,res,function(err,data){
		if(err) next(err,data)
		res.status(201)
	})
}

function verify( req, res, next ) {

	WTVerify( req, res, next )

}

function findAvailable( req, res, next ) {

	WTFindAvaliableTec( req, res, next )

}