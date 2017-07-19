const FindUser = require('./find');
const RemoveUser = require('./remove');
const UpdateUser = require('./update');
const CreateUser = require('./create');

module.exports = {
  find: find,
  create: create,
  update: update,
  remove: remove,
  add: addForm,
  edit: editForm
};

function find (req, res, next) {
  FindUser.all(req, res, next);
}

function addForm (req, res, next) {
  res.render('pages/armazem/items/item_new');
}

function remove (req, res, next) {
  RemoveUser(req, res, next);
}

function editForm (req, res, next) {
  FindUser.id(req.body, res, next);
}

function update (req, res, next) {
  UpdateUser(req, res, function (err, data) {
    if (err) next(err);
    res.redirect('/armazem_item');
  });
}

function create (req, res, next) {
  CreateUser(req, res, function (err, data) {
    if (err) next(err);
    res.redirect('/armazem_item');
  });
}
