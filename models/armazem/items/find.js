const query = require('models/query');
const db = 'spnos';
const table = 'armazem_items';

module.exports = {
  allSerialsCategories: allSerialsCategories,
  allItemsCategories: allItemsCategories,
  serialsCategoryItems: serialsCategoryItems,
  itemsCategoryItems: itemsCategoryItems,
  referenceItems: referenceItems,
  all: all
};

function all (callback) {
  let sql = 'SELECT * FROM ' + table;
  query.get(db, sql, callback);
}

function allSerialsCategories (data, callback) {
  let sql = 'SELECT * FROM' + table + 'WHERE ';
  let values;
}
