var model = require('models')
var async = require('async')
var timeSlot = ['08:00 09:30','09:30 11:00', '11:00 12:30','12:30 14:00','14:00 15:30','15:30 17:00','17:00 18:30','18:30 20:00','20:00 21:30', '22:00 23:30']

module.exports = function( params, res, next ) {

	var opts = {

    params: params,
    res 	: res,
    id 		: params.id

  }

	var tasks = [

		async.constant( opts ),
		worktask,
		tec,
		OTS,
		incDisc,
		render

	]

	async.waterfall( tasks, after )

	function after( err, data ) {

		if( err )	return callback( err, null )

		callback( null, data )

	}

}



function tec( params, next ) {

	model.tec.findTec( params.worktask[0].tecnico_FK_id, function( err, data ) {

		if(err)	throw err

			params.worktask.tec = data[0].name

			next( null, params )

	})

}



function worktask( params, next ) {

	model.worktask.findID( params.id, function( err, data ) {

		if(err)	throw err

		params.worktask = data
		params.worktask.slot_hora = timeSlot[data[0].slot_hora]

		next( null, params )

	})

}



function OTS( params, next ) {

	model.boni( params.worktask[0].OT, function( err, boni ) {

		if( err ) next( err, params )

		if( boni.length ) {

			params.worktask.BONIFICACAO = boni[0].BONIFICACAO
			params.worktask.OBS_CTL 		= boni[0].OBS_CTL
			params.worktask.SIT_CTL 		= boni[0].SIT_CTL

		}

		next( null, params )

	})

}



function incDisc( params, next ) {



	model.OT.getDescription( params.worktask[0].OT, function(err, rows) {

		if( err ) throw err

		if(!rows.length)	next( null, params)

		else {	

			var obs
			var date  = new Date()
		  var now   = date.toISOString().slice(0,10)
		  var time  = date.toISOString().slice(11,16)

			if( rows[0].DESCRICAO.length > 3 && !params.worktask[0].inc_obs.includes( rows[0].DESCRICAO ) ) {

				obs = params.worktask[0].inc_obs + "\r\n" + now + " " + time + "\r\n" + rows[0].DESCRICAO

				params.worktask[0].inc_obs = obs

				model.worktask.updateIncObs( params.id, obs, function( err, tecData ) {

					if(err) throw err

						next( null, params)
						
				})

			} else {

				next( null, params)
				
			}

			
			
			

		}

	})

}



function render(params,next){

	params.res.render('./pages/deadlineControl/controlModal',{

		table 	: params.worktask

	})

}