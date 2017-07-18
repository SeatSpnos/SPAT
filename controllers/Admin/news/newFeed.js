var model = require('/models').newFeed
var fs = require('fs');
var navbar 	= require('controllers/navbar').navbar

module.exports = {
	new : newf,
	insert : insert
}

function newf (req, res) {

	navbar(function(err,data){

		res.render('../views/pages/newFeed', {

      navmenu : data,
      user    : req.user

    })

 	})

}

function insert(req,res){

	var data = {

	title 		: req.body.Title,
	text 			: req.body.about,
	priority 	: req.body.priority,
	required 	: req.body.required,
	group 		: req.body.group,
	category 	: req.body.category,
	tags			: req.body.tags

	}
	
	model.insert(data,function(err,result){

		res.redirect('/')

	})
	
}

function display(req,res){

	newFeed.select(function(err,result){

		res.render('../views/pages/newsFeed', {

			news : result[0]

		})

	})
	
}
