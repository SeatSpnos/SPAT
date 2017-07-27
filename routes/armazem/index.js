const recolhas = require('./recolhas')
const express = require('express')
const router = express.Router()

router.use('/recolhas', recolhas);

module.exports = router;
