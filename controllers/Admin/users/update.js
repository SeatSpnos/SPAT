var model = require('models').user
module.exports = function (req,res,next){
  var tomodel= {
    id              : req.id, 
    username        : req.username,
    firstName       : req.firstName,
    lastName        : req.lastName,
    email           : req.email,
    data_nascimento : req["Data Nascimento"],
    data_entrada    : req["Data Entrada"],
    foto            : req.picture,
    phonenumber     : req.cellnumber,
    carta_conducao  : req.driverslicence,
    cartao_nos      : req.noscard,
    comments        : req.obs,
    state           : req.state,
    group           : req.group 
  }

  model.update(tomodel, function(err,rows){
    if(err) throw err
    next(null, rows)
  })
}