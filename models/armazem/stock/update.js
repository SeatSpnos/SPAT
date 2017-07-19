const query = require('models/query');
const db = 'spnos';

module.exports = {
  quantity: quantity
};

function quantity (ref, quantity, owner, callback) {
  let sql = 'UPDATE armazem_stock SET quantity = ? WHERE ref = ? AND owner = ?';
  let values = [quantity, ref, owner];
  query.post(db, sql, values, callback);
}
