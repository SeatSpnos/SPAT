const controller = require('controllers');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const middlewares = require('middlewares');
const gestorGroup = ['Admin', 'Gestão'];
const supervisorGroup = gestorGroup.concat(['Supervisor']);
const operadorGroup = supervisorGroup.concat(['Operador']);
const express = require('express')
const router = express.Router()

router.get('/boxItems/:box', controller.armazem.recolhas.armazem.boxItems);
router.get('/verifyPaleteName/:palete', controller.armazem.recolhas.armazem.verifyPaleteName);
router.get('/', controller.armazem.recolhas.armazem.paletes);
router.put('/', controller.armazem.recolhas.armazem.update);

module.exports = router;


