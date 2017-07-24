const table = 'armazem_recolhas';
const dbConnection = require('models/query').post;
const db = 'spnos';

module.exports = {
  tecSubmit: tecSubmit,
  boxSubmit: boxSubmit,
  paleteSubmit: paleteSubmit
};

function tecSubmit (values, callback) {
  let sql =
    `UPDATE ${table}
    SET 
      currentOwner = ?,
      caixa = ?
    WHERE serial IN ( ? )
    `;

  dbConnection(db, sql, values, callback);
}

function boxSubmit (values, callback) {
  let sql =
    `UPDATE ${table}
    SET 
      currentOwner = ?,
      palete = ?
    WHERE caixa IN ( ? )
    `;
  dbConnection(db, sql, values, callback);
}

function paleteSubmit (paletes, callback) {
  let sql =
    `UPDATE ${table}
    SET currentOwner = ?
    WHERE
      palete IN ( ? ) AND
      currentOwner = ?

    `;
  let values = ['Devolvido', paletes, 'Paletizado'];
  dbConnection(db, sql, values, callback);
}
