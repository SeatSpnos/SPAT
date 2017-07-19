const FIND = require('./find');
const INSERT = require('./insert');

module.exports = {
  find: find,
  findCategory: findCategory,
  findTec: findTec,
  findTecItem: findTecItem,
  findItem: findItem,
  findSerial: findSerial,
  findOT: findOT,
  validateItem: validateItem,
  insert: insert,
  addSerial: addSerial
};

function find (req, res, next) {
  FIND.init(req, res, next);
}

function findCategory (req, res, next) {
  FIND.category(req, res, next);
}

function findTec (req, res, next) {
  FIND.tec(req, res, next);
}

function findOT (req, res, next) {
  FIND.ot(req, res, next);
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