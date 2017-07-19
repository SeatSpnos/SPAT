const models = require('models');
const tecsModel = models.tecnicos;
const navbar = require('controllers/navbar').navbar;

module.exports = {
  tecnicos: require('./tecnicos'),
  init: init
};

function init (req, res, next) {
  tecsModel.find(function (err, tecs) {
    if (err) next(err);
    navbar(function (err, nbar) {
      if (err) next(err);
      res.render('pages/armazem/recolhas/recolhas.ejs', {
        navmenu: nbar,
        tecs: tecs,
        user: req.user
      });
    });
  });
}
