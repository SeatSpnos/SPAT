
var passport = require('passport')
require('../config/passport')(passport)
var LocalStrategy   = require('passport-local').Strategy

module.exports = {
login : login,
loginA : logAuth,
profile : profile,
signup : signup,
signupA : sigAuth

}

function login(req, res){
    res.render('./pages/login.ejs', { message: req.flash('loginMessage') })
  
}


function logAuth(req, res){
    passport.authenticate('local-login', {
            successRedirect : '/mainpage', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }),
        function(req, res) {
            console.log("hello")

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3
            } else {
              req.session.cookie.expires = false
            }
        res.redirect('/')
    }
}

function profile(req,res){
    res.render('./pages/profile.ejs', {
      user : req.user // get the user out of session and pass to template
  })
}

function signup(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/signup.ejs', { message: req.flash('signupMessage') })
  }


function sigAuth(){
    passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  })
} 

