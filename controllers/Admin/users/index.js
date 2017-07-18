var colum = ["Utilizador","Primeiro nome","Ultimo nome","Grupo","Estado", "Password"]
var colAll = ["Utilizador","Email","Primeiro nome", "Ultimo nome", "Grupo","Data de Nascimento", "Data de Entrada", "Foto","Carta de Condução", "Numero cartão NOS", "Observações","Estádo"]
var FindUser			= require('./find')
var RemoveUser 		= require('./remove')
var UpdateUser 		= require('./update')
var CreateUser 		= require('./create')
var ResetPassword = require('./reset')
var model = require('models')
module.exports = {

find 		: find,
create	: create,
update	: update,
remove	:	remove,
add 		: add_form,
edit 		: edit_form,
reset 	: reset
}

function find(req, res, next){
	FindUser.all(req,res,next)
}

function add_form(req, res){
	model.group.all(function(err, data){
		res.render('../views/partials/new_user', {group:data})
	})
  
}

function remove(req,res,next){
	RemoveUser(req.params,res,next)
}

function edit_form(req,res,next){
	FindUser.id(req.body,res,next)
}

function update(req,res,next){
	UpdateUser(req.body,res,function(err,data){
		if (err) return next(err)
		 	
    res.redirect('/user')
	})
}

function create(req,res,next){
	CreateUser(req.body,res,function(err,data){
		 if (err) return next(err)

    res.sendStatus(201)
	})
}

function reset (req, res, next){
	ResetPassword(req.body, res, next)
}