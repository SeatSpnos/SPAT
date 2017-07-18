var controller  = require('controllers')
var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var async  = require('async')
const operadorGroup = ['Admin', 'Gestão', 'Supervisor', 'Operador'];
const supervisorGroup = ['Admin', 'Gestão', 'Supervisor'];
const gestorGroup = ['Admin', 'Gestão'];
module.exports = function (app, passport) {  
 

  //Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //User+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //pp.get('/chat', isLoggedIn, controller.chat.find)
  //app.post('/chat_new', isLoggedIn, controller.chat.create)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  app.get('/reporting_wt', isLoggedIn, hasPermission(["Admin"]), controller.reporting.find)
  app.post('/reporting_wt', isLoggedIn, hasPermission(["Admin"]), controller.reporting.find)
   //User+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/user', isLoggedIn, hasPermission(["Admin","Supervisão"]), controller.user.find)
  app.post('/newUser', isLoggedIn, hasPermission(["Admin"]),controller.user.create)
  app.get('/newUser', isLoggedIn, hasPermission(["Admin"]),controller.user.add)
  app.post('/user_edit',isLoggedIn, hasPermission(["Admin"]), controller.user.edit)
  app.post('/user_update', isLoggedIn, hasPermission(["Admin"]), controller.user.update)
  app.post('/user_reset', isLoggedIn, hasPermission(["Admin"]), controller.user.reset)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //KM_Link++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/km_link', isLoggedIn, hasPermission(["Admin", "Supervisão", "Operador"]), controller.km.link.find)
  app.post('/km_link_insert', isLoggedIn, hasPermission(["Admin", "Supervisão"]), controller.km.link.create)
  app.post('/km_link_edit', isLoggedIn, hasPermission(["Admin", "Supervisão"]), controller.km.link.edit)
  app.post('/km_link_update', isLoggedIn, hasPermission(["Admin", "Supervisão"]), controller.km.link.update)
  app.post('/km_link_updateHits', isLoggedIn, hasPermission(["Admin", "Supervisão", "Operador"]), controller.km.link.updateHits)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 //New Feed+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/newFeed', isLoggedIn, hasPermission(["Admin", "Supervisão"]), controller.newFeed.find)
  app.post('/newFeed', isLoggedIn, hasPermission(["Admin", "Supervisão"]), upload.array('datafile'), controller.newFeed.create)
  app.post('/newFeed_read', isLoggedIn, controller.newsfeed.update)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //News Feed +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/mainpage', isLoggedIn,controller.newsfeed.find)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //Homepage+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/', isLoggedIn,controller.home)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/firstLogIn', isLoggedIn, firstLogIn, hasPermission(["Admin", "Supervisão", "Segmento"]), controller.home)
   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   
  //ESCALA ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/escala_create', hasPermission(["Admin"]), isLoggedIn, controller.escala.create);
  app.get('/escala', isLoggedIn, controller.escala.find)
  app.get('/escala:date', isLoggedIn, hasPermission(["Admin"]), controller.escala.find)
  app.post('/escala_date', isLoggedIn, controller.escala.find)
  app.get('/escala/folga/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn, controller.escala.update.folga)
  app.get('/escala/ferias/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn, controller.escala.update.ferias)
  app.get('/escala/faltas/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn, controller.escala.update.falta)
  app.get('/escala/horario/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn,controller.escala.update.horario)
  app.get('/escala/feriado/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn, controller.escala.update.feriado)
  app.get('/escala/sabado/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn,  controller.escala.update.sabado)
  app.get('/escala/clear/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn,  controller.escala.update.clear)
  app.get('/escala/delete/:id-:date', hasPermission(["Admin"]), isLoggedIn,  controller.escala.clear)
  app.get('/escala/formacao/:value-:id-:date', hasPermission(["Admin"]), isLoggedIn,  controller.escala.update.formacao)
  app.post('/escala_blk_update', isLoggedIn, hasPermission(["Admin"]),  controller.escala.update.update)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  //WORK TASK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/deadlinecontrol', isLoggedIn, controller.deadlinecontrol.find)
  app.post('/deadlinecontrol_add', isLoggedIn, controller.deadlinecontrol.add)
  app.post('/deadlinecontrol_addWT', isLoggedIn, controller.deadlinecontrol.addWT)
  app.post('/deadlinecontrol_create', isLoggedIn, controller.deadlinecontrol.create)
  app.post('/deadlinecontrol_createWT', isLoggedIn, controller.deadlinecontrol.createWT)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   //WORK TASK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/worktask', isLoggedIn, controller.worktask.find)
  app.post('/worktask_filters', isLoggedIn, controller.worktask.find)
  app.post('/worktask_create', isLoggedIn, controller.worktask.create)
  app.post('/worktask_add', isLoggedIn, controller.worktask.add)
  app.post('/worktask_delete', isLoggedIn, controller.worktask.del)
  app.post('/worktask_picket', isLoggedIn, controller.worktask.picket)
  app.post('/worktask_nowork', isLoggedIn, controller.worktask.nowork)
  app.post('/worktask_reserve', isLoggedIn, controller.worktask.reserve)
  app.get('/worktask_celula', isLoggedIn, controller.worktask.findCel)
  app.post('/worktask_verify', isLoggedIn, controller.worktask.verify)
  app.get('/worktask_findAvailableTec', isLoggedIn, controller.worktask.findAvailable)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('./pages/login.ejs', { message: req.flash('loginMessage') })
  })

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/firstLogIn', // redirect to the secure profile section
            failureRedirect : '/login',   // redirect back to the signup page if there is an error
            failureFlash : true          // allow flash messages
    }),
        function(req, res) {
            console.log("hello")

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 60 * 4
            } else {
              req.session.cookie.expires = false
            }
        res.redirect('/')
    })


  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/newPassword', { message: req.flash('signupMessage')})
  })

  // process the signup form
  app.post('/signup', function(req,res,next)
    { console.log(req.body.password+"\n"+req.body.username) 
    next()},
    passport.authenticate('local-signup', {
    successRedirect : '/mainpage',  // redirect to the secure profile section
    failureRedirect : '/login',  // redirect back to the signup page if there is an error
    failureFlash : true          // allow flash messages
  }))

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('./pages/profile.ejs', {
      user : req.user // get the user out of session and pass to template
    })
  })

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()

  res.redirect('/login')
}

function hasPermission(permissions){
  return function checkPermission(req,res,next){
    var hasP = false
    async.each(permissions,function(permission,callback){
      if(req.user.group_permission == permission)
        hasP = true
      callback()
    },function(err,data){
      console.log(req.user.username)
      if(req.user.required == "true")
        hasP = false
      if(hasP) next()
      else
      res.redirect('/mainpage')  
    })
  }
}

function firstLogIn(req,res,next){
  if((req.user.firstLogIn !== "True"))
    return next()
    res.render('./pages/newPassword', { message: req.flash('signupMessage'), username: req.user.username})
}

function hasRead(req,res,next){
  if(req.body.readContent == "sim")
    return next()
  res.redirect('/mainpage')
}

