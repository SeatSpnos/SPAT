const table = 'armazem_recolhas';
const dbConnection = require('models/query').post;
const db = 'spnos';

module.exports = {
  tecSubmit: tecSubmit
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
