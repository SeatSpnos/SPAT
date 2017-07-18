var model = require('models').user
var bcrypt = require('bcrypt-nodejs')

module.exports = function (req, res,next){
  var tomodel = {
    username        : req.username,
    firstName       : req.firstName,
    lastName        : req.lastName,
    email           : req.email,
    password        : bcrypt.hashSync(req.password, null, null),
    data_nascimento : req["Data Nascimento"],
    data_entrada    : req["Data Entrada"],
    foto            : req.picture,
    phonenumber     : req.cellnumber,
    carta_conducao  : req.driverslicence,
    cartao_nos      : req.noscard,
    comments        : req.obs,
    state           : "Active",
    group           : req.group
  }

  model.insert(tomodel,function(err, rows){
    if(err) next(err,rows)
    res.redirect('/user')
  })
}