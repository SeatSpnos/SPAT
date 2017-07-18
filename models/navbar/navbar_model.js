//Common-parts-of-all-models++++++++++++++++++++++++++++++++++
let query = require('models/query2');
let db = 'SE_SPNOS';

module.exports = function(callback){
	var sql = 'SELECT nav_bar.premissions, nav_bar.name, nav_bar.link, group_concat(sub_menu.name) as submenu, group_concat(sub_menu.link) as sublinks, group_concat(sub_menu.premissions) as subpremissions FROM nav_bar INNER JOIN sub_menu ON nav_bar.sub_menu_FK_id = sub_menu.id GROUP BY name'
  query.get(db, sql, callback)
}

