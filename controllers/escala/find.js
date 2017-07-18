var model 	= require('models')
var menus 	= require('controllers/navbar').navbar
var moment 	= require('moment')

module.exports = function(req, res, next){

	if( req.params.date){

		req.body.date = req.params.date

	}

	if( req.params.end ){

		req.body.date = req.body.end

	}

	var now	
	var end 

	if( req.body.date ){

		var date = moment(req.body.date)

		var now = date.date(1);

		var end = date.clone().endOf('month');

		now = now.format().slice(0,10)

		end = end.format().slice(0,10)


		model.tec.find( function( err, rows ) {

			if(err) throw err

			model.escala.findD( now, end, function( err, data ){

				if(err) throw err

				menus(function(err,menu){

					res.render('./pages/Escala/escala', { tec: data, tecs : rows, date: now, navmenu : menu, user: req.user } )

				})

			})

		})

	} else {

		var date = moment()
		now = date.date(1);
		end = date.clone().endOf('month');
		now = now.format().slice(0,10)
		end = end.format().slice(0,10)
		model.tec.find(function(err,rows){
		if(err) throw err
			model.escala.findD(now, end, function(err, data){
				if(err) throw err
				menus(function(err,menu){
					res.render('./pages/Escala/escala', { tec: data, tecs : rows, date: now, navmenu : menu, user: req.user } )
				})
			})
		})	
	}	
}