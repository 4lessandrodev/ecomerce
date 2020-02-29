var express = require('express');
var router = express.Router();
const adminController = require('../controllers/AdminController');
//------------------------------------------------------------------------------------------------------
router.get('/inscricoes', (req, res, next) => {
  adminController.listarInscricoes(req, res, next);
});
//------------------------------------------------------------------------------------------------------
router.get('/mensagens', (req, res, next) => {
  adminController.listarMensagens(req, res, next);
});
//------------------------------------------------------------------------------------------------------

module.exports = router;