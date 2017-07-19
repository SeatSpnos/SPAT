const query = require('models/query');
const db = 'spnos';

module.exports = {
  find: find,
  findOptions: findOptions,
  insert: insert,
  update: update
};

function find (callback) {
  let sql = 'SELECT * from armazem_transferencias';
  query.get(db, sql, callback);
}

function insert (data, callback) {
  let sql = 'INSERT INTO armazem_transferencias SET ref = ?, name = ?, quantity = ?, serial = ?, date = ?, previousOwner = ?, currentOwner = ?, user = ?, state = ?, obs = ?';
  let values = [data.ref, data.name, data.quantity, data.serial.trim(), data.date, data.from, data.to, data.user, data.state, data.obs];
  query.post(db, sql, values, callback);
}

function update (data, callback) {
  let sql = 'UPDATE armazem_transferencias SET ref = ?, name = ?, fornecedor = ?, saida = ?, saida_qtd = ?, comentarios = ?, hasSerial = ?, tipo = ?, designacao = ?, categoria = ? WHERE id = ?';
  let values = [data.referencia, data.nome, data.fornecedor, data.saida, data.saida_qtd, data.comentarios, data.hasSerial, data.tipo, data.designacao, data.categoria, data.id];
  query.post(db, sql, values, callback);
}

function findOptions (data, callback) {
  let andFlag = false;
  let sql = 'SELECT * FROM armazem_transferencias WHERE ';
  let values = [];
  if (data.dateBegin) {
    sql += ' date >= ? AND date <= ?';
    values.push(data.dateBegin);
    values.push(data.dateEnd);
    andFlag = true;
  }

  if (data.ref) {
    if (andFlag) sql += ' AND';
    sql += ' ref = ?';
    values.push(data.ref);
    andFlag = true;
  }

  if (data.serial) {
    if (andFlag) sql += ' AND';
    sql += ' serial = ?';
    values.push(data.serial);
    andFlag = true;
  }
  if (data.state) {
    if (andFlag) sql += ' AND';
    sql += ' state = ?';
    values.push(data.state);
    andFlag = true;
  }

  if (data.from) {
    if (andFlag) sql += ' AND';
    sql += ' previousOwner LIKE ?';
    values.push('%' + data.from + '%');
    andFlag = true;
  }

  if (data.to) {
    if (andFlag) sql += ' AND';
    sql += ' currentOwner LIKE ?';
    values.push('%' + data.to + '%');
    andFlag = true;
  }

  if (data.user) {
    if (andFlag) sql += ' AND';
    sql += ' user LIKE ?';
    values.push('%' + data.user + '%');
    andFlag = true;
  }
  if (data.name) {
    if (andFlag) sql += ' AND';
    sql += ' name LIKE ?';
    values.push('%' + data.name + '%');
    andFlag = true;
  }
  if (data.obs) {
    if (andFlag) sql += ' AND';
    sql += ' obs LIKE ?';
    values.push('%' + data.obs + '%');
    andFlag = true;
  }
  sql += ' ORDER BY date DESC';
  if (andFlag) query.post(db, sql, values, callback);
  else callback(null);
}
