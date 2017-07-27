const controller = require('controllers');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const middlewares = require('middlewares');
const gestorGroup = ['Admin', 'Gestão'];
const supervisorGroup = gestorGroup.concat(['Supervisor']);
const operadorGroup = supervisorGroup.concat(['Operador']);
const express = require('express')
const router = express.Router()

router.get('/items/:tecName', controller.armazem.recolhas.tecnicos.find);
router.get('/verify/:serial', controller.armazem.recolhas.tecnicos.verify);
router.get('/verifyBoxName/:caixa', controller.armazem.recolhas.tecnicos.verifyBoxName);
router.get('/addItems', controller.armazem.recolhas.tecnicos.renderItemsBody);
router.put('/', controller.armazem.recolhas.tecnicos.update);

module.exports = router;

function teste (req, res, next) {
	console.log(req.user);
	next();
}