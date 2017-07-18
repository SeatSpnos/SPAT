var model 	= require('models')

module.exports = function (req, res, next) {

	model.escala.clear(req.params.id, function(err, rows){
		res.redirect('/escala')
	})
}