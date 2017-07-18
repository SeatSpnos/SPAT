var model = require('models').worktask
var tec   = require('models').tec
var async = require('async')
var Find 	= require('./find')
var uuidV4 = require('uuid/v4')
var update = require('./update')

var timeSlot = ['08:00 09:30','09:30 11:00', '11:00 12:30','12:30 14:00','14:00 15:30','15:30 17:00','17:00 18:30','18:30 20:00','20:00 21:30', '22:00 23:30']


module.exports = function(req,res,next){

	model.findOT( req.body.slotsID, function( err, data) {

		if( data.length )

			update( req, res, next )
		
		else {

			var data = {
				
				date 					: req.body.date,
				tecnico 			: req.body.user,
				client_number : req.body.nclient.trim(),
				OT 						: req.body.OT.trim(),
				celula 				: req.body.celula==""?"4474":req.body.celula,
				tipo_OT 			: req.body.ot_type==""?"9":req.body.ot_type,
				tipo_TRB 			: req.body.trb==""?"13":req.body.trb,
				obs 					: req.body.obs,
				operador 			: req.user.firstName + " " + req.user.lastName,
				slot_hora 		: req.body.slot ,
				slotsID       : uuidV4(),
				relatorio			: req.body.relatorio,
				contact_number : req.body.contact_number,
				orcamento 		: req.body.orcamento

			}

			var obs1 = req.body.obs
			var obs2 = req.body.obs 

			if(req.body.helptec !== 'false'){

				tec.findTec(req.body.user, function(err,tecData){

					obs2 +=" Ajuda o tecnico "+ tecData[0].name

						tec.findTec(req.body.helptec, function(err,tecData){

						obs1 +=" Com a ajuda do tecnico "+ tecData[0].name

						create(data, req, obs1, obs2, res, next)

					})	

				})

			}	else {

				create(data, req, obs1, obs2, res, next)

			}

		}

	})

	

	
	
}

function callmemaybe(err, rows){

	if(err) next(err,rows)

	return null

}

function create(data, req, obs1, obs2, res, next){

	var slot_inicial = data.slot_hora
	var indexSlot = timeSlot.indexOf(data.slot_hora)
	var lunch = 0

	data.obs = obs1

	for(var k = 0; k < req.body.nslots; k++){

		data.slot_hora = timeSlot[ indexSlot + k + lunch]

		if(data.slot_hora == timeSlot[ 2 ] && req.body.lunch == 'false')

			lunch = 1;

		model.create(data, callmemaybe)

	}

	if(req.body.helptec !== 'false'){

		lunch = 0
		data.obs = obs2
		data.slot_hora = slot_inicial
		data.tecnico = req.body.helptec

		for(var k = 0 ; k < req.body.nslots; k++){

			data.slot_hora = timeSlot[ indexSlot + k + lunch]

			if(data.slot_hora == timeSlot[ 2 ] && req.body.lunch == 'false')

				lunch = 1;

			model.create(data, callmemaybe)
			
			}

			Find( { body : { date: data.date, tec_id : req.body.tec_id}, user : req.user }, res, next )
			
	} else Find( { body : { date: data.date, tec_id : req.body.tec_id}, user : req.user }, res, next )

}