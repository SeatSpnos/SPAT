const recolhasModels = require('models').armazem.recolhas;

module.exports = {
  init: init,
  paletesBoxes: paletesBoxes,
  update: update
};

function init (req, res, next) {
  recolhasModels.find.paletesPaletizadas(function (err, paletes) {
    if (err) return res.status(500).json(err);
    res.status(200).render('pages/armazem/recolhas/paletes/paletes.ejs', {paletes: paletes});
  });
}

function paletesBoxes (req, res, next) {
  recolhasModels.find.paletesBoxes(req.params.palete, function (err, boxes) {
    if (err) return res.status(500).json(err);
    if (!boxes.length) return res.status(404).json('No items found');
    res.status(200).render('pages/armazem/recolhas/paletes/paletesBoxes.ejs', {boxes: boxes});
  });
}

function update (req, res, next) {
  recolhasModels.update.paleteSubmit(req.body.paletes, function (err, items) {
    if (err) return res.status(500).json(err);
    res.status(200).json(items);
  });
}
