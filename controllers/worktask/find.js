var model = require('models')
var menus = require('controllers/navbar').navbar
var async = require('async')

module.exports = function( req, res, next ) {

	var opts = {

    params 	: req,
    res 		: res

  }

	var tasks = [

		async.constant( opts ),
		init,
		tec,
		ot,
		trb,
		celula,
		task,
		reserve,
		fixTable,
		addEscala,
		render

	]

	async.waterfall( tasks, after )

	function after( err, data ) {

		if( err )	return callback( err, null )

		callback( null, data )

	}

}



function init( params, next ) {

	if( typeof params.params.body.date == "undefined" ) {

		var date = new Date()

		date.setDate( date.getDate() + 1 )

		var begin = date.toISOString().slice( 0, 10 )
		params.params.body.date = begin

	}

	next( null, params )

}



function tec( params, next ) {

	model.tec.find( function( err, data ) {

		if( err )	throw err

		params.tec = data

		next( null, params )

	})

}



function ot( params, next ) {

	model.typeot.find( function( err, data ) {

		if( err )	throw err

		params.type_ot = data

		next( null, params )
	
	})
	
}



function trb( params, next ) {

	model.trb.find( function( err, data ) {

		if( err )	throw err

		params.trb = data

		next( null, params )
	
	})
}



function celula( params, next ) {

	model.celula.find( function( err, data ) {

		if( err )	throw err

		params.celula = data

		next( null, params )
	
	})

}



function task( params, next ) {
	

	model.worktask.find( params.params.body.date, function( err, data ) {

		if( err )	throw err

		params.worktask = data

		next( null, params )

	})		

}



function reserve( params, next ) {

	model.worktask.findReserve( params.params.body.date, function( err, data ) {

		if(err) next( err, params )
		
		params.reserve = data

		next( null, params )

	})

}



function fixTable( params, next ) {

	var data = {}
	var temp = {}
	var tec	 = 0
	var i = 0

	async.whilst( condition, loop, end )

	function condition() {

		return i < params.worktask.length 

	}

	function loop( callback ) {

		var one = params.worktask[i]
		var k = one.tecnico_FK_id

		if( tec !== k ) {

			tec = k
			temp = {}

		}

		var y = one.slot_hora
		if( !temp[y] ) temp[y] = []
			
		temp[y].push( one ) 

		var temp2 = temp[ y ][ temp[y].length - 1 ]


		model.OT.getEstado( temp2.OT, function( err, ot ) {

			if( err ) throw err

			if( ot.length ) {

				temp2.estado 			= ot[0].estado
				temp2.RESULTADO 	= ot[0].RESULTADO
				data[k] 					= temp

				i++

				callback()

			} else {

				data[k] = temp
				i++

				callback()

			}

		})

	}

	function end() {

		params.worktask = data

		next(null, params)

	}

}



function addEscala( params, next ) {

	params.tec.forEach( function( one ) {

		model.escala.findTec( one.id, params.params.body.date, function( err, data ) {

			if(err) throw err

			if( data.length ) {

				var data = data[0]

				one.horario 		= data.horario
				one.folga 			= data.folga
				one.vacation		= data.vacation
				one.escala 			= data.escala
				one.falta 			= data.falta
				one.hora_extra  = data.hora_extra

			}

		})

	})

	next( null, params )

}

function render( params, next ) {

	menus( function( err, rows ) {


		params.res.render( './pages/worktask/work_task', {
		
		user 			: params.params.user,
		tec 			: params.tec,
		table   	: params.worktask,
		reserve		: params.reserve,
		ot_type 	: params.type_ot,
		trb				: params.trb,
		celula		: params.celula,
		navmenu		: rows,
		tecnico		: params.params.body.tecnico,
		slot 			: params.params.body.slot,
		zona			: params.params.body.zona,
		date 			: params.params.body.date,
		tec_id 		: params.params.body.tec_id

		})

	})

}