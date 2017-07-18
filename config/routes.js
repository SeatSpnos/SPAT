const controller = require('controllers');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const middlewares = require('middlewares');
const operadorGroup = ['Admin', 'Gestão', 'Supervisor', 'Operador'];
const supervisorGroup = ['Admin', 'Gestão', 'Supervisor'];
const gestorGroup = ['Admin', 'Gestão'];
module.exports = function (app, passport) {
  // ROUTES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  app.get('/reporting_wt', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.reporting.find);
  app.post('/reporting_wt', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.reporting.find);

  // ARMAZEM ITEMS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem_item', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.item.find);
  app.post('/armazem_item_new', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.item.create);
  app.get('/armazem_item_add', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.item.add);
  app.post('/armazem_item_edit', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.item.edit);
  app.post('/armazem_item_update', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.item.update);
  app.post('/armazem_item_inactive', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.item.remove);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ARMAZEM STOCK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem_stock', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.stock.find);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ARMAZEM LOGS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem_logs', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.logs.find);
  app.post('/armazem_logs_options', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.logs.findOptions);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ARMAZEM RECOLHAS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem/recolhas/', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.recolhas.init);
  app.get('/armazem/recolhas/tecnicos/:tecName', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.recolhas.tecnicos.find);
  app.get('/armazem/recolhas/tecnicos/verify/:serial', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.recolhas.tecnicos.verify);
  app.get('/armazem/recolhas/tecnicos/render', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.recolhas.tecnicos.render);
  app.put('/armazem/recolhas/tecnicos/', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.armazem.recolhas.tecnicos.update);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ARMAZEM ADMIN+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem_admin', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.find);
  app.get('/armazem_admin_getCategory', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.findCategory);
  app.get('/armazem_admin_getTec', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.findTec);
  app.get('/armazem_admin_getItem', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.findItem);
  app.get('/armazem_admin_getSerial', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.findSerial);
  app.get('/armazem_admin_addSerial', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.addSerial);
  app.get('/armazem_admin_validateItem', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.validateItem);
  app.get('/armazem_admin_sendItemsDelivery', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.removeDelivery);
  app.post('/armazem_admin_getTecItem', middlewares.isLoggedIn, middlewares.hasPermission(gestorGroup), controller.armazem.admin.findTecItem);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   // ARMAZEM DELIVERY+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem_delivery', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.find);
  app.get('/armazem_delivery_getCategory', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.findCategory);
  app.get('/armazem_delivery_getTec', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.findTec);
  app.post('/armazem_delivery_getTecItem', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.findTecItem);
  app.get('/armazem_delivery_getItem', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.findItem);
  app.get('/armazem_delivery_getSerial', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.findSerial);
  app.get('/armazem_delivery_addSerial', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.addSerial);
  app.get('/armazem_delivery_validateItem', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.validateItem);
  app.get('/armazem_delivery_sendItems', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.insert);
  app.get('/armazem_delivery_getGuia', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.getGuia);
  app.get('/armazem_delivery_makePdf', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.delivery.makePdf);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ARMAZEM ENTRY+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem_entry', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.find);
  app.get('/armazem_entry_serialCategory', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.findSerialCategory);
  app.get('/armazem_entry_getCategory', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.findCategory);
  app.get('/armazem_entry_submitSerial', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.insertSerial);
  app.get('/armazem_entry_submitnoSerial', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.insertNoSerial);
  app.post('/armazem_entry_allSerialModal', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.allSerialModal);
  app.get('/armazem_entry_getItem', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.findItem);
  app.get('/armazem_entry_addSerials', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.addSerials);
  app.get('/armazem_entry_verifySerials', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.verifySerials);
  app.post('/armazem_entry_getAllSerialsModal', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.entry.getSerialsModal);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ARMAZEM CONSUME+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/armazem_consume', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.find);
  app.get('/armazem_consume_getCategory', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.findCategory);
  app.get('/armazem_consume_getTec', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.findTec);
  app.post('/armazem_consume_getTecItem', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.findTecItem);
  app.get('/armazem_consume_getItem', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.findItem);
  app.get('/armazem_consume_getSerial', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.findSerial);
  app.get('/armazem_consume_sendItems', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.insert);
  app.get('/armazem_consume_getOT', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.findOT);
  app.get('/armazem_consume_validateItem', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.validateItem);
  app.get('/armazem_consume_addSerial', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.armazem.consume.addSerial);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // TECNICOS MANAGEMENT+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/tecnico', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.tecnicos.find);
  app.post('/tecnico_new', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.tecnicos.create);
  app.get('/tecnico_add', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.tecnicos.add);
  app.post('/tecnico_edit', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.tecnicos.edit);
  app.post('/tecnico_update', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.tecnicos.update);
  app.post('/tecnico_inactive', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.tecnicos.remove);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // USER+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/user', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.user.find);
  app.post('/newUser', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.user.create);
  app.get('/newUser', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.user.add);
  app.post('/user_edit', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.user.edit);
  app.post('/user_update', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.user.update);
  app.post('/user_reset', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.user.reset);
  app.post('/user_inactive', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.user.remove);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // KM LINKS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/km_link', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.km.link.find);
  app.post('/km_link_insert', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.km.link.create);
  app.post('/km_link_edit', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.km.link.edit);
  app.post('/km_link_update', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.km.link.update);
  app.post('/km_link_updateHits', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.km.link.updateHits);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // NEW FEED+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/newFeed', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.admin.newFeed.find);
  app.post('/newFeed', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), upload.array('datafile'), controller.admin.newFeed.create);
  app.post('/newFeed_read', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.newsfeed.update);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // NEWS FEED +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/mainpage', middlewares.isLoggedIn, controller.newsfeed.find);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Homepage+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/', middlewares.isLoggedIn, controller.home);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // FIRST LOG IN +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/firstLogIn', middlewares.isLoggedIn, middlewares.firstLogIn, middlewares.hasPermission(operadorGroup), controller.home);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ESCALA ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/escala_create', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.create);
  app.get('/escala', middlewares.isLoggedIn, controller.escala.find);
  app.get('/escala:date', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.escala.find);
  app.post('/escala_date', middlewares.isLoggedIn, controller.escala.find);
  app.get('/escala/folga/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.folga);
  app.get('/escala/ferias/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.ferias);
  app.get('/escala/faltas/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.falta);
  app.get('/escala/horario/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.horario);
  app.get('/escala/feriado/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.feriado);
  app.get('/escala/sabado/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.sabado);
  app.get('/escala/clear/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.clear);
  app.get('/escala/delete/:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.clear);
  app.get('/escala/formacao/:value-:id-:date', middlewares.hasPermission(supervisorGroup), middlewares.isLoggedIn, controller.escala.update.formacao);
  app.post('/escala_blk_update', middlewares.isLoggedIn, middlewares.hasPermission(supervisorGroup), controller.escala.update.update);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // DEADLINE CONTROL +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/deadlinecontrol', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.deadlinecontrol.find);
  app.post('/deadlinecontrol_add', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.deadlinecontrol.add);
  app.post('/deadlinecontrol_addWT', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.deadlinecontrol.addWT);
  app.post('/deadlinecontrol_create', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.deadlinecontrol.create);
  app.post('/deadlinecontrol_createWT', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.deadlinecontrol.createWT);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // WORK TASK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/worktask', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.find);
  app.post('/worktask_filters', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.find);
  app.post('/worktask_create', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.create);
  app.post('/worktask_add', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.add);
  app.post('/worktask_delete', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.del);
  app.post('/worktask_picket', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.picket);
  app.post('/worktask_nowork', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.nowork);
  app.post('/worktask_reserve', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.reserve);
  app.post('/worktask_verify', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.verify);
  app.get('/worktask_celula', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.findCel);
  app.get('/worktask_tecnico', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.findTec);
  app.get('/worktask_findAvailableTec', middlewares.isLoggedIn, middlewares.hasPermission(operadorGroup), controller.worktask.findAvailable);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/login', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/firstLogIn', // redirect to the secure profile section
    failureRedirect: '/login',   // redirect back to the signup page if there is an error
    failureFlash: true          // allow flash messages
  }),
    function (req, res) {
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 4;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/newPassword', {message: req.flash('signupMessage')});
  });

  // process the signup form
  app.post('/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/mainpage',  // redirect to the secure profile section
      failureRedirect: '/login',  // redirect back to the signup page if there is an error
      failureFlash: true          // allow flash messages
    }));

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};
