const FIND = require('./find');
const INSERT = require('./insert');
const DELETE = require('./delete');

module.exports = {
  find: find,
  findRef: findRef,
  findCategory: findCategory,
  findTec: findTec,
  findTecItem: findTecItem,
  findItem: findItem,
  findSerial: findSerial,
  validateItem: validateItem,
  addSerial: addSerial,
  insert: insert,
  removeDelivery: removeDelivery
};

function find (req, res, next) {
  FIND.render(req, res, next);
}

function findRef (req, res, next) {
  FIND.ref(req, res, next);
}

function findCategory (req, res, next) {
  FIND.category(req, res, next);
}

function findTec (req, res, next) {
  FIND.tec(req, res, next);
}

function findTecItem (req, res, next) {
  FIND.tecItem(req, res, next);
}

function findItem (req, res, next) {
  FIND.item(req, res, next);
}

function findSerial (req, res, next) {
  FIND.serial(req, res, next);
}

function validateItem (req, res, next) {
  FIND.validateItem(req, res, next);
}

function insert (req, res, next) {
  INSERT(req, res, next);
}

function addSerial (req, res, next) {
  FIND.addSerial(req, res, next);
}

function removeDelivery (req, res, next) {
  DELETE(req, res, next);
}
