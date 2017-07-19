const FIND = require('./find');
const INSERT = require('./insert');

module.exports = {
  find: find,
  findSerialCategory: findSerialCategory,
  findItem: findItem,
  findItemsModal: findItemsModal,
  insertSerial: insertSerial,
  insertNoSerial: insertNoSerial,
  findCategory: findCategory,
  allSerialModal: allSerialModal,
  addSerials: addSerials,
  verifySerials: verifySerials,
  getSerialsModal: getSerialsModal
};

function find (req, res, next) {
  FIND.init(req, res, next);
}

function findItem (req, res, next) {
  FIND.item(req, res, next);
}

function insertSerial (req, res, next) {
  INSERT.insertSerial(req, res, next);
}

function insertNoSerial (req, res, next) {
  INSERT.insertNoSerial(req, res, next);
}

function findSerialCategory (req, res, next) {
  FIND.serialCategory(req, res, next);
}

function findCategory (req, res, next) {
  FIND.category(req, res, next);
}

function allSerialModal (req, res, next) {
  FIND.allSerialModal(req, res, next);
}

function findItemsModal (req, res, next) {
  FIND.itemsModal(req, res, next);
}

function addSerials (req, res, next) {
  FIND.addSerials(req, res, next);
}

function verifySerials (req, res, next) {
  FIND.verifySerials(req, res, next);
}

function getSerialsModal (req, res, next) {
  FIND.getSerialsModal(req, res, next);
}
