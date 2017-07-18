var model = require('models').worktask
var tec   = require('models').tec
var async = require('async')
var Find 	= require('./find')
var uuidV4 = require('uuid/v4')

module.exports = function (req,res,next){

	var data = {
		id						: req.body.wt,
		date 					: req.body.date,
		tecnico 			: req.body.user,
		client_number : req.body.nclient.trim(),
		OT 						: req.body.OT.trim(),
		celula 				: req.body.celula==""?"4474":req.body.celula,
		tipo_OT 			: req.body.ot_type==""?"9":req.body.ot_type,
		tipo_TRB 			: req.body.trb==""?"13":req.body.trb,
		obs 					: req.body.obs,
		operador 			: req.user.firstName + " " + req.user.lastName,
		slot_hora 		: req.body.slot,
		relatorio			: req.body.relatorio,
		contact_number : req.body.contact_number,
		orcamento 		: req.body.orcamento
	}


	model.findOT( req.body.slotsID, function( err, rows ) {

		if( rows[0].id == data.id && rows.length > 1 ){

			if( req.body.helptec == 'false' ) {

				data.slotsID = req.body.slotsID
				model.updateMass( data, callmemaybe )
				Find({body : {date: data.date, tec_id : req.body.tec_id}, user : req.user},res,next)

			} else {

				data.slotsID = req.body.slotsID
				model.updateMassNoTec(data, callmemaybe)
				Find({body : {date: data.date, tec_id : req.body.tec_id}, user : req.user},res,next)

			}

		} else {
			
			model.update(data, callmemaybe)
			Find({body : {date: data.date, tec_id : req.body.tec_id}, user : req.user},res,next)

		}

	})
	
}

function callmemaybe(err, rows){
	if(err) next(err,rows)
	return null
}