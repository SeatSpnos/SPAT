const models = require('models').armazem;
const itemsModel = models.items;
const stockModel = models.stock;

module.exports = {
  allSerialsCategories: allSerialsCategories,
  allItemsCategories: allItemsCategories,
  serialsCategoryItems: serialsCategoryItems,
  serialsCategoryStock: serialsCategoryStock,
  itemsCategoryItems: itemsCategoryItems,
  itemsCategoryStock: itemsCategoryStock,
  referenceItems: referenceItems,
  referenceStock: referenceStock,
  serialStock: serialStock,
  allItems: allItems,
  allStock: allStock
};

function allSerialsCategories (req, res, next) {
  itemsModel.find.allSerialsCategories(function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function allItemsCategories (req, res, next) {
  itemsModel.find.allItemsCategories(function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function serialsCategoryItems (req, res, next) {
  itemsModel.find.serialsCategories(req.query.data, function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function serialsCategoryStock (req, res, next) {
  stockModel.find.serialsCategories(req.query.data, function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function itemsCategoryItems (req, res, next) {
  itemsModel.find.itemsCategories(req.query.data, function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function itemsCategoryStock (req, res, next) {
  stockModel.find.itemsCategories(req.query.data, function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function referenceStock (req, res, next) {
  stockModel.find.ref(req.query.data, function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function referenceItems (req, res, next) {
  itemsModel.find.ref(req.query.data, function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function serialStock (req, res, next) {
  stockModel.find.serial(req.query.data, function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function allStock (req, res, next) {
  stockModel.find.all(function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}

function allItems (req, res, next) {
  itemsModel.find.all(function (err, results) {
    if (err) next(err);
    res.json(results);
  });
}
