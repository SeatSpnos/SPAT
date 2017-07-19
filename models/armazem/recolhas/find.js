const table = 'armazem_recolhas';
const dbConnection = require('models/query').post;
const db = 'spnos';

module.exports = {
  verify: verify,
  tecItems: tecItems,
  items: items
};

function verify (serial, callback) {
  let sql =
  ` SELECT *
    FROM ${table}
    WHERE 
      serial = ? AND
      (currentOwner != 'Armazem' AND
      currentOwner != 'Paletizado' AND
      currentOwner != 'Devolvido')
  `;

  dbConnection(db, sql, serial, callback);
}

function tecItems (tecName, callback) {
  let name = tecName.split(' ');
  let value = `%${name[0]}% %${name[1]}%`;
  let sql =
  `SELECT *
  FROM ${table}
  WHERE currentOwner LIKE ?
  `;
  dbConnection(db, sql, value, callback);
}

function items (serials, callback) {
  let sql =
  `SELECT *
  FROM ${table}
  WHERE serial IN ( ? )
  `;
  dbConnection(db, sql, [serials], callback);
}
