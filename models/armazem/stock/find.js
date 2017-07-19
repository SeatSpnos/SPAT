const query = require('models/query');
const db = 'spnos';

module.exports = {
	all: all,
	serialsCategories: serialsCategories,
	itemsCategories: itemsCategories,
	ref: ref,
	serial: serial,
	noSerialOwner: noSerialOwner
};

function all (callback) {
  let sql = 'SELECT armazem_stock.id, armazem_items.nome as name, armazem_stock.quantity, armazem_stock.owner, armazem_stock.serial, armazem_stock.ref, armazem_stock.mac FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref ';
  query.get(db, sql, callback);
}

function noSerialOwner (owner, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.quantity as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND hasSerial = ? AND armazem_stock.owner = ? GROUP BY nome';
  let values = ['Não Seriado', owner];
  query.post(db, sql, values, callback);
}

