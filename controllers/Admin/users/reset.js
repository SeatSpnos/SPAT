var model = require('models').user
var bcrypt = require('bcrypt-nodejs')

module.exports = function(req, res, next){
var pass = bcrypt.hashSync("password", null, null)
	model.reset(req.id, pass, function(err, rows){
		if(err) next(err, rows)
    res.redirect('/user')
	})
}