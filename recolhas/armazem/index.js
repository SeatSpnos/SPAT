const recolhasModels = require('models').armazem.recolhas;

module.exports = {
  init: init,
  boxItems: boxItems,
  update: update,
  paletes: paletes,
  verifyPaleteName: verifyPaleteName
};

function init (req, res, next) {
  recolhasModels.find.boxesArmazem(function (err, item) {
    if (err) return res.status(500).json(err);
    res.status(200).render('pages/armazem/recolhas/armazem/boxs.ejs', {item: item});
  });
}

function boxItems (req, res, next) {
  recolhasModels.find.boxesItems(req.params.box, function (err, items) {
    if (err) return res.status(500).json(err);
    if (!items.length) return res.status(404).json('No items found');
    res.status(200).render('pages/armazem/recolhas/armazem/boxItems.ejs', {items: items});
  });
}

function update (req, res, next) {
  let values = ['Paletizado', req.body.palete, req.body.boxes];

  recolhasModels.update.boxSubmit(values, function (err, items) {
    if (err) return res.status(500).json(err);
    res.status(200).json(items);
  });
}

function paletes (req, res, next) {
  recolhasModels.find.paletesPaletizadas(function (err, paletes) {
    if (err) return res.status(500).json(err);
    res.status(200).render('pages/armazem/recolhas/armazem/paletes.ejs', {paletes: paletes});
  });
}

function verifyPaleteName (req, res, next) {
  recolhasModels.find.verifyPaleteName(req.params.palete, function (err, items) {
    if (err) return res.status(500).json(err);
    if (!items.length) return res.status(200).json(items);
    return res.status(200).json({err: 'O Nome já está atribuido'});
  });
}
