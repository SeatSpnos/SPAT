var links 	= require('./links')
var navbar 	= require('controllers/navbar').navbar

module.exports = function (req, res, next) {

	links.find(req, res, function(err, data){
		
		navbar(function(err,bar){

			res.render('pages/km/link/links', { user : req.user, links : data.rows, top : data.top, navmenu : bar })

		})

	})
	
}