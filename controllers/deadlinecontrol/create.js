var model = require('models').worktask
var async = require('async')

module.exports = function(req,res,next){
	var data = {
		id 					: req.body.id,
		c_obs 			: req.body.c_obs,
		inc_tratado : req.body.inc_tratado
	}

	model.findID(data.id, function(err, rows){
		var obs
		var date  = new Date()
	  var now   = date.toISOString().slice(0,10)
	  var time  = date.toISOString().slice(11,16)
		if(data.c_obs.length){
			obs = rows[0].c_obs +"\r\n" + now + " " + time +" | Utilizador : "+req.user.firstName +" "+req.user.lastName +"\r\n"+data.c_obs
		} else {
			obs = rows[0].c_obs
		}
		data.c_obs = obs
		
		model.updateControl(data, function(err,tecData){
			if(err) throw err

			if(data.inc_tratado){
				model.updateTratado(rows[0].slotsID, function(err, tRow){
					res.redirect('/deadlinecontrol')
				})
			} else {
				res.redirect('/deadlinecontrol')
			}
				
		})
	})

}