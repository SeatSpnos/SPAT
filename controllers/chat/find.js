var model = require('models').chat

module.exports = function(req,res,next){
	model.chat.find(function(err,data){
		if(err) next(err,data)
		res.render('./partials/chat', data)

	})
}