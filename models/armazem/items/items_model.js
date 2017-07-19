const query = require('models/query');
const db = 'spnos';

module.exports = {
  findAll: findAll,
  findID: findID,
  findREF: findREF,
  findCategory: findCategory,
  findCategoryOwner: findCategoryOwner,
  findCategorySumTec: findCategorySumTec,
  findCategorySumTecAll: findCategorySumTecAll,
  findAllCategory: findAllCategory,
  findSerialCaregories: findSerialCaregories,
  findSerialCaregory: findSerialCaregory,
  findName: findName,
  findAllNoSerial: findAllNoSerial,
  findItemsSerial: findItemsSerial,
  insert: insert,
  update: update,
  remove: remove
};

function findAll (callback) {
  let sql = 'SELECT * from armazem_items';
  query.get(db, sql, callback);
}

function findAllNoSerial (callback) {
  let sql = 'SELECT * FROM armazem_items WHERE hasSerial = ?';
  let values = ['Não Seriado'];
  query.post(db, sql, values, callback);
}

function findID (id, callback) {
  let sql = 'SELECT * from armazem_items WHERE id = ?';
  let values = id;
  query.post(db, sql, values, callback);
}

function findREF (ref, callback) {
  let sql = 'SELECT * from armazem_items WHERE referencia = ?';
  let values = ref;
  query.post(db, sql, values, callback);
}

function findCategory (category, callback) {
  let sql = 'SELECT nome, referencia FROM armazem_items WHERE tipo = ? AND hasSerial = ?';
  let values = [category, 'Não Seriado'];
  query.post(db, sql, values, callback);
}

function findCategoryOwner (category, owner, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.quantity as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND tipo = ? AND hasSerial = ? AND armazem_stock.owner = ? GROUP BY nome';
  let values = [category, 'Não Seriado', owner];
  query.post(db, sql, values, callback);
}

function findCategorySumTec (category, tec, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.quantity as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND tipo = ? AND hasSerial = ? AND armazem_stock.owner = ? GROUP BY nome';
  let values = [category, 'Não Seriado', tec];
  query.post(db, sql, values, callback);
}

function findCategorySumTecAll (tec, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.quantity as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND hasSerial = ? AND armazem_stock.owner = ? GROUP BY nome';
  let values = ['Não Seriado', tec];
  query.post(db, sql, values, callback);
}

function findSerialCaregory (category, callback) {
  let sql = 'SELECT nome, referencia FROM armazem_items WHERE categoria = ? AND hasSerial = ? ORDER BY categoria';
  let values = [category, 'Seriado'];
  query.post(db, sql, values, callback);
}

function findSerialCaregories (callback) {
  let sql = 'SELECT DISTINCT categoria FROM armazem_items WHERE hasSerial = "Seriado" ORDER BY categoria';
  query.get(db, sql, callback);
}

function findAllCategory (callback) {
  let sql = 'SELECT tipo from armazem_items WHERE hasSerial = "Não Seriado" GROUP BY tipo';
  query.get(db, sql, callback);
}

function findItemsSerial (callback) {
  let sql = 'SELECT * FROM armazem_items WHERE hasSerial = "Seriado" ORDER BY nome';
  query.get(db, sql, callback);
}

function findName (name, callback) {
  let sql = 'SELECT * FROM armazem_items WHERE nome = ?';
  let values = name;
  query.post(db, sql, values, callback);
}

function insert (data, callback) {
  let sql = 'INSERT INTO armazem_items SET referencia = ?, nome = ?, fornecedor = ?, saida = ?, saida_qtd = ?, comentarios = ?, hasSerial = ?, tipo = ?, designacao = ?, categoria = ?';
  let values = [data.referencia, data.nome, data.fornecedor, data.saida, data.saida_qtd, data.comentarios, data.hasSerial, data.tipo, data.designacao, data.categoria];
  query.post(db, sql, values, callback);
}

function update (data, callback) {
  let sql = 'UPDATE armazem_items SET referencia = ?, nome = ?, fornecedor = ?, saida = ?, saida_qtd = ?, comentarios = ?, hasSerial = ?, tipo = ?, designacao = ?, categoria = ? WHERE id = ?';
  let values = [data.referencia, data.nome, data.fornecedor, data.saida, data.saida_qtd, data.comentarios, data.hasSerial, data.tipo, data.designacao, data.categoria, data.id];
  query.post(db, sql, values, callback);
}
function remove (id, callback) {
  let sql = 'UPDATE armazem_items SET state = "Inactive" WHERE id = ?';
  let values = [id];
  query.post(db, sql, values, callback);
}
