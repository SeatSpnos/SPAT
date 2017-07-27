const controller = require('controllers');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const middlewares = require('middlewares');
const gestorGroup = ['Admin', 'Gestão'];
const supervisorGroup = gestorGroup.concat(['Supervisor']);
const operadorGroup = supervisorGroup.concat(['Operador']);
const express = require('express')
const router = express.Router()

router.get('/paleteBoxes/:palete', controller.armazem.recolhas.paletes.paletesBoxes);
router.put('/', controller.armazem.recolhas.paletes.update);

module.exports = router;

