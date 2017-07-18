var model = require('models')

module.exports = function(req,res,next){
	var data = {
		user : req.user.id,
		msg  : req.body.msg,
		date : new Date()
	}
	model.chat.create(data,function(err,rows){
		if(err) next(err, rows)
		next(null, rows)
	})
}