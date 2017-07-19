const models = require('models').armazem;
const itemsModel = models.items;
const stockModel = models.stock;
const navbar = require('controllers/navbar').navbar;
const async = require('async');

module.exports = {
  init: init,
  serialCategory: serialCategory,
  category: category,
  item: item,
  addSerials: addSerials,
  verifySerials: verifySerials,
  getSerialsModal: getSerialsModal
};

function init (req, res, next) {
  let opts = {
    req: req,
    res: res
  };

  let tasks = [
    async.constant(opts),
    serialCategories,
    categories,
    itemsSerial,
    render
  ];

  async.waterfall(tasks, after);

  function after (err, data) {
    if (err) return callback(err);
    callback(null, data);
  }
}

function categories (params, next) {
  itemsModel.findAllCategory(function (err, category) {
    if (err) next(err);
    params.category = category;
    next(null, params);
  });
}

function serialCategories (params, next) {
  itemsModel.findSerialCaregories(function (err, serialCategories) {
    if (err) next(err);
    params.serialCategories = serialCategories;
    next(null, params);
  });
}

function itemsSerial (params, next) {
  itemsModel.findItemsSerial(function (err, itemsSerial) {
    if (err) next(err);
    params.itemsSerial = itemsSerial;
    next(null, params);
  });
}

function render (params, next) {
  navbar(function (err, nbar) {
    if (err) next(err);
    params.res.render('pages/armazem/entry/entry', {
      navmenu: nbar,
      user: params.req.user,
      serialCategories: params.serialCategories,
      itemsSerial: params.itemsSerial,
      category: params.category
    });
  });
}

function serialCategory (req, res, next) {
  let category = req.query.category;
  if (category === 'Todos') {
    itemsModel.findItemsSerial(function (err, itemsSerial) {
      if (err) next(err);
      res.render('pages/armazem/entry/serialCategory', {items: itemsSerial});
    });
  } else {
    itemsModel.findSerialCaregory(req.query.category, function (err, itemsSerial) {
      if (err) next(err);
      res.render('pages/armazem/entry/serialCategory', {items: itemsSerial});
    });
  }
}

function category (req, res, next) {
  let category = req.query.category;

  if (category === 'Todos') {
    itemsModel.findAllNoSerial(function (err, itemsSerial) {
      if (err) next(err);
      res.render('pages/armazem/entry/addItemsTable', {items: itemsSerial});
    });
  } else {
    itemsModel.findCategory(category, function (err, itemsSerial) {
      if (err) next(err);
      if (!itemsSerial.length) res.sendStatus(404);
      else res.render('pages/armazem/entry/addItemsTable', {items: itemsSerial});
    });
  }
}

function getSerialsModal (req, res, next) {
  itemsModel.findREF(req.body.ref, function (err, item) {
    if (err) next(err);
    res.render('pages/armazem/entry/allSerialsModal', {
      item: item[0],
      serials: req.body.serials
    });
  });
}

function item (req, res, next) {
  itemsModel.findREF(req.query.item, function (err, item) {
    if (err) next(err);
    res.render('pages/armazem/entry/tBodyNoSerial', {item: item[0], quantity: req.query.quantity});
  });
}

function verifySerials (req, res, next) {
  let serials = req.query.serials;
  let duplicates;

  stockModel.findSerials(serials, function (err, rows) {
    if (err) next(err);
    if (rows.length) {
      duplicates = rows;
      for (let i in duplicates) {
        let index = serials.indexOf(duplicates[i].serial);
        if (index !== -1) serials.splice(index, 1);
      }
    }
    itemsModel.findREF(req.query.ref, function (err, item) {
      if (err) next(err);
      res.json({serials: serials, duplicates: duplicates, item: item[0]});
    }) 
    
  });
}

function addSerials (req, res, next) {
  itemsModel.findREF(req.query.ref, function (err, item) {
    if (err) next(err);
    res.render('pages/armazem/entry/tBodySerial', {item: item[0], size: req.query.size});
  });
}
