var model = require('models').worktask
var Find 	= require('./find')
var uuidV4 = require('uuid/v4')

module.exports = function(req,res,next){

	slotsID = uuidV4()

	model.reserve(req.body.id, req.body.reserve, slotsID, req.user.firstName + " " + req.user.lastName, function(err,data){

		if(err) next(err,data)

			Find({body : {date: req.body.hora, tec_id : req.body.tec_id}, user : req.user},res,next)
		
		})
}