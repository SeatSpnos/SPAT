const query = require('models/query');
const db = 'spnos';

module.exports = {
  findAll: findAll,
  findRef: findRef,
  findTecNoSerial: findTecNoSerial,
  findTecSerial: findTecSerial,
  findTecItem: findTecItem,
  findSerial: findSerial,
  findSerialTec: findSerialTec,
  findCategoryAllOwner: findCategoryAllOwner,
  insertUpdate: insertUpdate,
  insert: insert,
  update: update,
  updateRef: updateRef,
  updateOwner: updateOwner,
  updateQuantity: updateQuantity,
  remove: remove,
  removeSerial: removeSerial,
  validateItem: validateItem,
  validateItemTec: validateItemTec,
  findSerials: findSerials
};

function findAll (callback) {
  let sql = 'SELECT armazem_stock.id, armazem_items.nome as name, armazem_stock.quantity, armazem_stock.owner, armazem_stock.serial, armazem_stock.ref, armazem_stock.mac FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref ';
  query.get(db, sql, callback);
}

function findRef (ref, owner, callback) {
  let sql = 'SELECT * from armazem_stock WHERE ref = ? AND owner = ?';
  let values = [ref, owner];
  query.post(db, sql, values, callback);
}

function findTecNoSerial (tec, callback) {
  let sql = 'SELECT nome, referencia, SUM(armazem_stock.quantity) as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND armazem_stock.owner = ? AND hasSerial = ? GROUP BY nome';
  let values = [tec, 'Não Seriado'];
  query.post(db, sql, values, callback);
}

function findTecSerial (tec, callback) {
  let sql = 'SELECT nome, referencia, SUM(armazem_stock.quantity) as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND armazem_stock.owner = ? AND hasSerial = ? GROUP BY nome';
  let values = [tec, 'Seriado'];
  query.post(db, sql, values, callback);
}

function findTecItem (tec, item, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.quantity as quantity, armazem_stock.serial FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND armazem_stock.owner = ? AND referencia = ?';
  let values = [tec, item];
  query.post(db, sql, values, callback);
}

function findSerial (serial, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.serial FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND armazem_stock.serial = ?';
  let values = serial;
  query.post(db, sql, values, callback);
}

function findSerialTec (serial, tec, callback) {
  let sql = 
    `SELECT
      nome, 
      referencia, 
      armazem_stock.serial 
    FROM armazem_items 
    JOIN armazem_stock 
    WHERE 
      armazem_items.referencia = armazem_stock.ref 
      AND armazem_stock.serial = ? 
      AND armazem_stock.owner = ?`;
  let values = [serial, tec];
  query.post(db, sql, values, callback);
}

function findCategoryAllOwner (owner, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.quantity as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND hasSerial = ? AND armazem_stock.owner = ? GROUP BY nome';
  let values = ['Não Seriado', owner];
  query.post(db, sql, values, callback);
}

function findSerials (serials, callback) {
  let multiple = false;
  let sql = 'SELECT * FROM armazem_stock WHERE ';
  let values = [];
  for (let i in serials) {
    if (multiple) sql += ' OR ';
    sql += 'serial = ?';
    multiple = true;
    values.push(serials[i]);
  }

  query.post(db, sql, values, callback);
}

function insertUpdate (data, callback) {
  let sql = 'SELECT * FROM armazem_stock WHERE ref = ? AND owner = ?';
  let values = [data.ref, data.to];
  query.post(db, sql, values, function (err, res) {
    if (err) callback(err);
    if (res.length) {
      data.id = res[0].id;
      let temp = +res[0].quantity;
      data.quantity = +data.quantity + temp;
      update(data, callback);
    } else {
      insert(data, callback);
    }
  });
}

function insert (data, callback) {
  let sql = `INSERT INTO armazem_stock 
              SET quantity = ?, owner = ?, serial = ?, ref = ?`;
  let values = [ data.quantity, data.tec, data.serial.trim(), data.ref ];
  query.post(db, sql, values, callback);
}

function update (data, callback) {
  let sql = 'UPDATE armazem_stock SET quantity = ?, owner = ?, serial = ?, ref = ?, mac = ?  WHERE id = ?';
  let values = [data.quantity, data.tec, data.serial, data.ref, data.mac, data.id];
  query.post(db, sql, values, callback);
}

function updateOwner (data, callback) {
  let sql = 'UPDATE armazem_stock SET owner = ? WHERE serial = ?';
  let values = [data.to, data.serial];
  query.post(db, sql, values, callback);
}

function updateQuantity (ref, value, owner, callback) {
  let sql = 'UPDATE armazem_stock SET quantity = ? WHERE ref = ? AND owner = ?';
  let values = [value, ref, owner];
  query.post(db, sql, values, callback);
}

function updateRef (data, callback) {
  let sql = 'UPDATE armazem_stock SET ref = ? WHERE ref = ? ';
  let values = [data.ref, data.oldRef];
  query.post(db, sql, values, callback);
}

function remove (ref, owner, callback) {
  let sql = 'UPDATE armazem_stock SET state = "Inactive" WHERE id = ?';
  let values = [ref];
  query.post(db, sql, values, callback);
}

function removeSerial (data, callback) {
  let sql = 'DELETE FROM armazem_stock WHERE serial = ?';
  let values = data.serial;
  query.post(db, sql, values, callback);
}

function validateItem (ref, city, callback) {
  let sql = `SELECT nome, referencia, armazem_stock.quantity as quantity 
              FROM armazem_items 
              JOIN armazem_stock 
              WHERE armazem_items.referencia = armazem_stock.ref 
                AND ref = ? 
                AND owner = ?`;

  let values = [ref, city];
  query.post(db, sql, values, callback);
}

function validateItemTec (ref, tec, callback) {
  let sql = 'SELECT nome, referencia, armazem_stock.quantity as quantity FROM armazem_items JOIN armazem_stock WHERE armazem_items.referencia = armazem_stock.ref AND ref = ? AND owner = ?';
  let values = [ref, tec];
  query.post(db, sql, values, callback);
}
