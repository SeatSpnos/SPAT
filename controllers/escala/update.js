var model 	= require('models')
var async 	= require('async')
var find 		= require('./find')
var moment 	= require('moment')

module.exports = {
	folga 		: folga,
	ferias 		: ferias,
	falta 		: falta,
	formacao 	: formacao,
	horario 	: horario,
	update    : update,
	feriado 	: feriado,
	clear 		: clear,
	sabado 		: sabado
}

function folga(req, res, next) {

	model.escala.updateFolga(req.params.value, req.params.id, function(err, rows){

		find(req, res, next)
	})
}

function ferias(req, res, next) {
	
	model.escala.updateFerias(req.params.value, req.params.id, function(err, rows){
		find(req, res, next)
	})
	
}

function falta(req, res, next) {
	model.escala.updateFalta(req.params.value, req.params.id, function(err, rows){
		find(req, res, next)
	})
}

function horario(req, res, next) {

	model.escala.updateHorario(req.params.value, req.params.id, function(err, rows){
		find(req, res, next)
	})
}

function formacao(req, res, next) {

	model.escala.updateFormacao(req.params.value, req.params.id, function(err, rows){
		find(req, res, next)
	})
}

function feriado(req, res, next) {

	model.escala.updateFeriado(req.params.value, req.params.id, function(err, rows){
		find(req, res, next)
	})
}

function sabado(req, res, next) {

	model.escala.updateSabado(req.params.value, req.params.id, function(err, rows){
		find(req, res, next)
	})
}

function clear(req, res, next) {

	model.escala.updateClear(req.params.value, req.params.id, function(err, rows){
		find(req, res, next)
	})
}

function update(req, res, next) {
	req.body.id 			= req.body.tec
	req.body.date 		= moment(req.body.begin)
	req.body.end 			= moment(req.body.end)
	req.body.start    = moment(req.body.begin)


	async.whilst(function(){ return req.body.end >= req.body.date },

		function(callback){

			model.escala.findTec(req.body.id, req.body.date.format().slice(0,10), function(err, res) {

			if(!res.length){

				var data = {
					id : req.body.id, 
					date : req.body.date, 
					horario : req.body.horario, 
					escala : 0, 
					folga : 0, 
					feriado : 0, 
					ferias : req.body.ferias, 
					falta : req.body.falta
				}
				model.escala.create( data, function(err, rows){

				})

			} else {

				req.body.begin = req.body.date.format().slice(0,10)

				model.escala.update(req.body,function(err, rows){

				})

			}

			req.body.date.add(1, 'd')

			callback()
		})
		}, function(callback){
				req.body.date = req.body.start
				find(req, res, next)
		})
	
}
