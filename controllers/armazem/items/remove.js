var model = require('models').armazem.items;

module.exports = function (req, res, next) {
  model.remove(req.id, function (err, rows) {
  	if (err) return next(err);
  	next(null, rows)
  });
};
