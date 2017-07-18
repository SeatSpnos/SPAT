var model = require('models')
var async = require('async')
var timeSlot = ['08:00 09:30','09:30 11:00', '11:00 12:30','12:30 14:00','14:00 15:30','15:30 17:00','17:00 18:30','18:30 20:00','20:00 21:30', '22:00 23:30']

module.exports = function(params, res, next){
	let k = params.id
	let y = k.split('|')
	var opts = {
    params: params,
    res 	: res,
    slot	: y[1],
    id		: y[0],
    date	: y[2],
    wt_id	: y[3]
  }
	var tasks = [
		async.constant(opts),
		tec,
		ot,
		trb,
		celula,
		worktask,
		render
	]

	async.waterfall(tasks,after)

	function after(err,data){

		if(err)	return callback(err,null)

		callback(null,data)
	}

}
function tec(params, next){

	model.tec.find(function(err,data){

		if(err)	throw err

			params.tec = data

			next(null,params)
		})

}

function ot(params,next){
	model.typeot.find(function(err,data){

		if(err)	throw err

		params.type_ot = data

		next(null,params)
	})
	
}

function trb(params,next){

	model.trb.find(function(err,data){

		if(err)	throw err

		params.trb = data

		next(null,params)
	})
}

function celula(params,next){

	model.celula.find(function(err,data){

		if(err)	throw err

		params.celula = data

		next(null,params)
	})

}

function worktask(params, next){
	if(typeof params.wt_id == 'undefined'){
		next(null, params)
	}	else {
		model.worktask.findID(params.wt_id, function(err,data){

			if(err)	throw err

			params.worktask = data

			next(null,params)
		})
	}	
}

function render(params,next){

	params.res.render('./partials/work_task_create_modal',{
		user 			: params.params.user,
		ot_type 	: params.type_ot,
		trb				: params.trb,
		celula		: params.celula,
		tec 			: params.tec,
		slot			: params.slot,
		id 				: params.id,
		date			: params.date,
		worktask 	: params.worktask,
		timeSlot 	: timeSlot

	})

}