const recolhasModels = require('models').armazem.recolhas;

module.exports = {
  verify: verify,
  find: find,
  update: update,
  renderItemsBody: renderItemsBody
};

function verify (req, res, next) {
  if (!req.params.serial) return res.status(400).json('Serial is empty');

  recolhasModels.find.verify(req.params.serial, function (err, item) {
    if (err) return res.status(500).json(err);
    if (!item.length) return res.status(404).json('Not found');
    res.status(200).render('pages/armazem/recolhas/tecnicos/serialsToAddTable.ejs', {item: item});
  });
}

function find (req, res, next) {
  if (!req.params.tecName.length) return res.status(400).json('No tec was selected');

  recolhasModels.find.tecItems(req.params.tecName, function (err, items) {
    if (err) return res.status(500).json(err);
    if (!items.length) return res.status(404).json('No items found');
    res.status(200).render('pages/armazem/recolhas/tecnicos/tecItems.ejs', {items: items});
  });
}

function update (req, res, next) {
  let values = ['Armazem', req.body.box, req.body.serials];

  recolhasModels.update.tecSubmit(values, function (err, items) {
    if (err) return res.status(500).json(err);
    res.status(200).json(items);
  });
}

function renderItemsBody (req, res, next) {
  if (!req.query.serials.length) return res.status(400).json('No serials');
  recolhasModels.find.items(req.query.serials, function (err, items) {
    if (err) return res.status(500).json(err);
    res.status(200).render('pages/armazem/recolhas/tecnicos/tableBodyRow.ejs', {items: items});
  });
}
