const model = require('models').armazem.logs;
const navbar = require('controllers/navbar').navbar;
const users = require('models').user;

module.exports = {
  render: render,
  options: options
};

function render (req, res, next) {
  users.all( function (err, response) {
    if (err) next(err);
    navbar(function (err, data) {
      if (err) return next(err);
      res.render('pages/armazem/logs/logs', {
        navmenu: data,
        user: req.user,
        users: response
      });
    });
  });  
}

function options (req, res, next) {

  model.findOptions(req.body.data, function (err, results) {
    if (err) next(err);
    res.render('pages/armazem/logs/table', {table: results});
  });
}
