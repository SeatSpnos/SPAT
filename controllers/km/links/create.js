var model = require('models').km

module.exports = function (req, res, next) {

	model.links.create(req.body, function(err, rows){

		res.redirect('/km_link')

	})
	
}


