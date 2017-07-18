var model = require('models').worktask;
var navbar = require('controllers/navbar').navbar;
var colName = ["Data", "Tecnico", "Numero de Cliente", "Tipo OT", "Tipo TBR", "Slot", "Resultado"];
  
module.exports ={
  find  : list

};

function list (req, res, next) {  
  if (!req.body.begin) {
    req.body.begin = new Date;
    req.body.end = new Date;
  } else {
    req.body.begin = new Date(req.body.begin);
    req.body.end = new Date(req.body.end );
  }

  var begin = req.body.begin.toISOString().slice(0,10);
  var end = req.body.end.toISOString().slice(0,10);

  model.state(begin, end, function (err, table) {
    if (err) next(err);
    model.stateNoOt( begin, end, function( err, rows) {
      if( err ) throw err
      rows.forEach( function( row ) {
        row.RESULTADO = 'Realizada'
        table.push(row)
      })
      render(table, req, res);
    })
  });
}

function render( table, req, res) {
  navbar( function( err, navMenu ) { 
    res.render('pages/reporting/worktask/worktask_rp', {
      tables  : table, 
      navmenu : navMenu, 
      user    : req.user, 
      colName : colName    
    });
  });
}
