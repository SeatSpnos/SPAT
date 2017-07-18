//group controller
var model = require('../models').group
  data = {}
  tomodel = {}
  
  module.exports = {
    getAll : list,
    add : add_form,
    edit : edit,
    update : edit_save,
    insert : add_insert

  }



//Function to list all groups
function list (req, res){
  data.title = 'groups'
  model.all_groups(tomodel, function(err, rows){
    data.rows
    res.render('../views/pages/all_group', data)
  })
}

//Function to show the add new form
function add_form(req, res){
  data.title = 'Add New group'
  res.render('../view/pages/new_group', data)
}

//Function to insert a new group
function add_insert(req, res){
  tomodel.group_name = req.body.group_name
  tomodel.group_menu = req.body.group_menu
  tomodel.group_submenu = req.body.group_submenu
  tomodel.group_content = req.body.group_content
  model.insert(tomodel,function(err, rows){
    res.redirect('/')
  })
}

//Function to edit group
function edit(req,res){

  data.title = 'Edit group'
  tomodel.group_id = req.params.id 
  model.select_group(tomodel, function(err,rows){
    data.rows = rows
    res.render('../views/pages/edit_group', data)
  })
}

//Function to save the editted group
function edit_save(req,res){
  tomodel.group_name = req.body.group_name
  tomodel.group_menu = req.body.group_menu
  tomodel.group_submenu = req.body.group_submenu
  tomodel.group_content = req.body.group_content
  tomodel.group_id = req.body.group_id
  model.save(tomodel, function(err,rows){
    res.redirect('/')
  })
}

