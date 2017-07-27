const controller = require('controllers');
const multer = require('multer');0
const upload = multer({ dest: 'public/uploads/' });
const middlewares = require('middlewares');
const gestorGroup = ['Admin', 'Gestão'];
const supervisorGroup = gestorGroup.concat(['Supervisor']);
const operadorGroup = supervisorGroup.concat(['Operador']);
const express = require('express');
const passport = require('passport');
const router = express.Router()

const tecnicos = require('./tecnicos.js');
const paletes = require('./paletes.js');
const armazem = require('./armazem.js');

router.get('/', controller.armazem.recolhas.init);
router.use('/tecnicos', tecnicos);
router.use('/paletes', paletes);
router.use('/armazem', armazem);

module.exports = router;