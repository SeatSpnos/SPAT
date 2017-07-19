const models = require('models');
const itemsModel = models.armazem.items;
const tecsModel = models.tec;
const stockModel = models.armazem.stock;
const otModel = models.OT;
const navbar = require('controllers/navbar').navbar;

module.exports = {
  init: init,
  serial: serial,
  category: category,
  tec: tec,
  tecItem: tecItem,
  item: item,
  validateItem: validateItem,
  ot: ot,
  addSerial: addSerial
};

function init (req, res, next) {
  tecsModel.find(function (err, tecsRes) {
    if (err) next(err);
    itemsModel.findAllCategory(function (err, category) {
      if (err) next(err);
      navbar(function (err, nbar) {
        if (err) next(err);
        res.render('pages/armazem/consume/consume', {
          navmenu: nbar,
          tecs: tecsRes,
          user: req.user,
          category: category
        });
      });
    });
  });
}

function serial (req, res, next) {
  stockModel.findSerialTec(req.query.serial, req.query.tec, function (err, item) {
    if (err) next(err);
    if (item.length) res.render('pages/armazem/consume/addSerialModal', {item: item[0]});
    else res.sendStatus(404);
  });
}

function addSerial (req, res, next) {
  stockModel.findSerialTec(req.query.serial, req.query.tec, function (err, item) {
    if (err) next(err);

    if (item.length) {
      item[0].quantity = 1;
      res.render('pages/armazem/consume/tBody', {item: item[0], quantity: 1});
    } else res.sendStatus(404);
  });
}

function category (req, res, next) {
  let cat = req.query.category;
  if (cat === 'Todos') {
    itemsModel.findCategorySumTecAll(req.query.tec, function (err, items) {
      if (err) next(err);
      res.render('pages/armazem/consume/addItemsTable', {items: items});
    });
  } else {
    itemsModel.findCategorySumTec(req.query.category, req.query.tec, function (err, items) {
      if (err) next(err);
      res.render('pages/armazem/consume/addItemsTable', {items: items});
    });
  }
}

function tec (req, res, next) {
  stockModel.findTecSerial(req.query.tec, function (err, serial) {
    if (err) next(err);
    models.stock.findTecNoSerial(req.query.tec, function (err, noSerial) {
      if (err) next(err);
      res.json({serial: serial, noSerial: noSerial});
    });
  });
}

function tecItem (req, res, next) {
  stockModel.findTecItem(req.body.tec, req.body.item, function (err, items) {
    if (err) next(err);
    res.render('pages/armazem/consume/item_modal', {items});
  });
}

function item (req, res, next) {
  itemsModel.findREF(req.query.item, function (err, item) {
    if (err) next(err);
    if (!item.length) res.sendStatus(404);
    else res.render('pages/armazem/consume/tBody', {item: item[0], quantity: req.query.quantity});
  });
}

function validateItem (req, res, next) {
  let msg = '';
  if (req.query.quantity < 1) {
    msg = 'A quantidade têm que ser superiror a uma unidade';
    res.json(msg);
  } else {
    stockModel.validateItemTec(req.query.item, req.query.tec, function (err, item) {
      if (err) next(err);
      if (item[0].quantity < req.query.quantity) msg = 'O stock do item ' + req.query.item + ' é de ' + item[0].quantity + ' unidades, o teu valor é de ' + req.query.quantity;
      res.json(msg);
    });
  }
}

function ot (req, res, next) {
  otModel.getOT(req.query.ot, function (err, item) {
    if (err) next(err);
    res.json(item);
  });
}
