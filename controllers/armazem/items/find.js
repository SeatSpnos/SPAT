var model = require('models').armazem.items;
var navbar = require('controllers/navbar').navbar;

module.exports = {
  all: all,
  id: id,
  ref: ref
};

function all (req, res, next) {
  model.findAll(function (err, rows) {
    if (err) return next(err);

    navbar(function (err, data) {
      if (err) return next(err);
      res.render('pages/armazem/items/items', {
        table: rows,
        navmenu: data,
        user: req.user
      });
    });
  });
}

function id (req, res, next) {
  model.findID(req.id, function (err, rows) {
    if (err) return next(err);
    res.render('pages/armazem/items/item_update_modal', {
      rows: rows
    });
  });
}

function ref (req, res, next) {
  model.findREF(req.query.ref, function (err, item) {
    if (err) return next(err);
    res.json(item);
  });
}
