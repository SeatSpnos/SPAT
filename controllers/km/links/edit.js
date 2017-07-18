var model = require('models').km
module.exports = function (req, res, next) {

	model.links.findOne(req.body.id, function(err, rows){

		res.render('pages/km/link/link_edit', {link : rows})

	})
	
}