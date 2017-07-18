var model = require('models')
var navbar 	= require('controllers/navbar').navbar
var colum = ["Utilizador","Primeiro nome","Ultimo nome","Grupo","Estado", "Password"]
var colAll = ["Utilizador", "Email", "Primeiro nome", "Ultimo nome", "Grupo","Data de Nascimento", "Data de Entrada", "Foto", "Carta de Condução", "Numero cartão NOS", "Observações", "Estádo", "Contacto", "Reset Password"]

module.exports = {
	all 	: all,
	id 		: id
}


function all(req, res, next){
		model.user.all(function(err, rows){
    	if (err) return next(err)
    	navbar(function(err,data){
				if(err) throw err
	    	res.render('../views/pages/user', {
	            table : rows,
	            colName : colAll,
	            navmenu : data,
	            user    : req.user
	        })
      }) 
   })  
}

function id(req,res,next){
	model.user.selectID(req.id, function(err,rows){
		if(err) next(err,rows)
	  model.group.all(function(err,row){
		if(err) next(err,rows)
	    res.render('../views/partials/user_update_modal', {
	      rows 		: rows,
	      groups 	: row
	    })
	  })    
	})
}