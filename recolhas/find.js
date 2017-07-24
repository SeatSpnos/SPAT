const table = 'armazem_recolhas';
const dbConnection = require('models/query').post;
const db = 'spnos';

module.exports = {
  verify: verify,
  tecItems: tecItems,
  items: items,
  boxesArmazem: boxesArmazem,
  boxesItems: boxesItems,
  paletesPaletizadas: paletesPaletizadas,
  paletesBoxes: paletesBoxes,
  verifyPaleteName: verifyPaleteName,
  verifyBoxName: verifyBoxName
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

function boxesArmazem (callback) {
  let sql =
    `SELECT 
      caixa,
      count(codigoOT) as sumCaixa
    FROM ${table}
    WHERE currentOwner = ?
    GROUP BY caixa
    `;
  dbConnection(db, sql, 'Armazem', callback);
}

function boxesItems (box, callback) {
  let sql =
    `SELECT *
    FROM ${table}
    WHERE caixa = ?
    `;
  dbConnection(db, sql, box, callback);
}

function paletesPaletizadas (callback) {
  let sql =
    `SELECT 
      palete,
      count(distinct caixa) as sumPalete
    FROM ${table}
    WHERE currentOwner = ?
    GROUP BY palete
    `;
  dbConnection(db, sql, 'Paletizado', callback);
}

function paletesBoxes (palete, callback) {
  let sql =
    `SELECT 
      caixa,
      count(codigoOT) as sumCaixa
    FROM ${table}
    WHERE
      currentOwner = ? AND
      palete = ?
    GROUP BY caixa
    `;
  let values = ['Paletizado', palete];
  dbConnection(db, sql, values, callback);
}

function verifyPaleteName (palete, callback) {
  let sql =
    `SELECT *
    FROM ${table}
    WHERE palete = ?
    `;
  dbConnection(db, sql, palete, callback);
}

function verifyBoxName (box, callback) {
  let sql =
    `SELECT *
    FROM ${table}
    WHERE
      caixa = ? AND
      (currentOwner = ? OR 
      currentOwner = ? )
    `;
  let values = [box, 'Devolvido', 'Paletizado'];
  dbConnection(db, sql, values, callback);
}
