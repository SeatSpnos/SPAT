const models = require('models');
const itemsModel = models.armazem.items;
const stockModel = models.armazem.stock;
const tecsModel = models.tecnicos;
const parceirosModel = models.parceiros;
const navbar = require('controllers/navbar').navbar;

module.exports = {
  render: render,
  serial: serial,
  category: category,
  tec: tec,
  tecItem: tecItem,
  item: item,
  validateItem: validateItem,
  addSerial: addSerial
};

function render (req, res, next) {
  tecsModel.find(function (err, tecs) {
    if (err) next(err);
    itemsModel.findAllCategory(function (err, category) {
      if (err) next(err);
      parceirosModel.findAll(function (err, parceiros) {
        if (err) next(err);
        navbar(function (err, nbar) {
          if (err) next(err);
          res.render('pages/armazem/adminV2/admin', {
            navmenu: nbar,
            tecs: tecs,
            user: req.user,
            category: category,
            parceiros: parceiros
          });
        });
      });
    });
  });
}

function serial (req, res, next) {
  stockModel.findSerialTec(req.query.serial, req.query.city, function (err, item) {
    if (err) next(err);
    if (item.length) res.render('pages/armazem/admin/addSerialModal', {item: item[0]});
    else res.sendStatus(404);
  });
}

function addSerial (req, res, next) {
  stockModel.findSerialTec(req.query.serial, req.query.city, function (err, item) {
    if (err) next(err);

    if (item.length) {
      item[0].quantity = 1;
      res.render('pages/armazem/admin/tBody', {item: item[0], quantity: 1});
    } else res.sendStatus(404);
  });
}

function category (req, res, next) {
  let cat = req.query.category;
  if (cat === 'Todos') {
    stockModel.findCategoryAllOwner(req.query.city, function (err, items) {
      if (err) next(err);
      res.render('pages/armazem/admin/addItemsTable', {items: items});
    });
  } else {
    itemsModel.findCategoryOwner(cat, req.query.city, function (err, items) {
      if (err) next(err);
      res.render('pages/armazem/admin/addItemsTable', {items: items});
    });
  }
}

function tec (req, res, next) {
  stockModel.findTecSerial(req.query.tec, function (err, serial) {
    if (err) next(err);
    stockModel.findTecNoSerial(req.query.tec, function (err, noSerial) {
      if (err) next(err);
      if (!serial.length && !noSerial.length) res.sendStatus(404);
      else res.render('pages/armazem/admin/tecStock', {tecnico: req.query.tec, serials: serial, noSerials: noSerial});
    });
  });
}

function tecItem (req, res, next) {
  stockModel.findTecItem(req.body.tec, req.body.item, function (err, items) {
    if (err) next(err);
    res.render('pages/armazem/partials/item_modal', {items: items});
  });
}

function item (req, res, next) {
  stockModel.findTecItem(req.query.city, req.query.item, function (err, item) {
    if (err) next(err);
    if (!item.length) res.sendStatus(404);
    else res.render('pages/armazem/admin/tBody', {item: item[0], quantity: req.query.quantity});
  });
}

function validateItem (req, res, next) {
  let msg = '';
  stockModel.validateItem(req.query.item, req.query.city, function (err, item) {
    if (err) next(err);
    if (!item.length) msg = 'O item não existem em stock';
    else if (item[0].quantity < req.query.quantity) msg = 'O stock do item ' + req.query.item + ' é de ' + item[0].quantity + ' unidades, o teu valor é de ' + req.query.quantity;
    res.json(msg);
  });
}
