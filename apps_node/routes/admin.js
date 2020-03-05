var express = require('express');
var router = express.Router();
const adminController = require('../controllers/AdminController');
const categoriaProdutoController = require('../controllers/CategoriaProdutoController');

//------------------------------------------------------------------------------------------------------
router.get('/inscricoes', (req, res, next) => {
  adminController.listarInscricoes(req, res, next);
});
//------------------------------------------------------------------------------------------------------
router.get('/mensagens', (req, res, next) => {
  adminController.listarMensagens(req, res, next);
});
//------------------------------------------------------------------------------------------------------
router.post('/salvar-categoria', (req, res, next) => {
  categoriaProdutoController.salvarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------
router.get('/listar-categorias-produto', (req, res, next) => {
  categoriaProdutoController.listarCategorias(req, res, next);
});


module.exports = router;