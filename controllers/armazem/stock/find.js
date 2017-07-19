const model = require('models').armazem.stock;
const navbar = require('controllers/navbar').navbar;

module.exports = function (req, res, next) {
  model.findAll(function (err, rows) {
    if (err) return next(err);

    navbar(function (err, data) {
      if (err) return next(err);
      res.render('pages/armazem/stock/stock', {
        table: rows,
        navmenu: data,
        user: req.user
      });
    });
  });
};
