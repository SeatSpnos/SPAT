var model 	= require('models')
var navbar 	= require('controllers/navbar').navbar
var async		= require('async')

module.exports = function(params,res,next){
	
	var opts = {
    params: params,
    res 	: res
  }
	var tasks = [
		async.constant(opts),
		init,
		required,
		render
	]

	async.waterfall(tasks,after)

	function after(err,data){

		if(err)	return callback(err,null)

		callback(null,data)
	}

}

function init( params, next ) {

	if( params.params.body.flag ) {

		params.flag = params.params.body.flag

	} else {

		params.flag = 1

	}

	model.userMsg.allNew(params.params.user.id, function(err,data){

		if(err) throw err

		params.news = data

		next(null, params)

	})

}


function required(params, next){

	var newReq = []
	var newMsg = []
	var required = "false"
	async.each(params.news, function(one, callback){

		model.newFeed.allID(one.msg_FK_id, function(err,data){
			
			if(err) throw err

			if(data.length){
				
				if(data[0].required == "Sim"){

					newReq.push(data[0])

					required = "true"

					} else {

					newMsg.push(data[0])

				}

			}
			
			callback()	

			})

	}, function(err, data){
		params.newReq = newReq
		params.newMsg = newMsg
		model.user.required(required, params.params.user.id, function(err,rows){
			next(null, params)
		})
	})
	
}

function render(params, next){
	navbar(function(err,rows){
			if(err) next(err, news)
		params.res.render('./pages/mainpage/mainpage', {
			navmenu 		: rows,
			newReq			: params.newReq,
			newMsg			: params.newMsg,
			user 				: params.params.user,
			flag 				: params.flag
		})
	})
}


