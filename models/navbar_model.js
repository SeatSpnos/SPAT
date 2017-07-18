//Common-parts-of-all-models++++++++++++++++++++++++++++++++++
var query = require('./query')
var db = 'spnos'
var sql
var sql1 = 'SELECT nav_bar.name, nav_bar.link, group_concat(sub_menu.name) as submenu, sub_menu.link as sublinks FROM nav_bar INNER JOIN sub_menu ON nav_bar.sub_menu_FK_id = sub_menu.id GROUP BY name'
//var sql2 = 'SELECT sub_menu.name, sub_menu.link, group_concat(content.name) as content, group_concat(content.link) as contentlinks FROM sub_menu INNER JOIN content ON sub_menu.content_FK_id = content.id GROUP BY name'


module.exports = function(callback){
 // if(q)	{sql = sql1}
  //else 	{sql = sql2}
var sql = 'SELECT nav_bar.premissions, nav_bar.name, nav_bar.link, group_concat(sub_menu.name) as submenu, group_concat(sub_menu.link) as sublinks, group_concat(sub_menu.premissions) as subpremissions FROM nav_bar INNER JOIN sub_menu ON nav_bar.sub_menu_FK_id = sub_menu.id GROUP BY name'

  query.get(db, sql, callback)
}

