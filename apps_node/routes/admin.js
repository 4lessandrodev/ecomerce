var express = require('express');
var router = express.Router();
const adminController = require('../controllers/AdminController');
const categoriaProdutoController = require('../controllers/CategoriaProdutoController');
const categoriaCestaController = require('../controllers/CategoriaCestaController');


//------------------------------------------------------------------------------------------------------
//Renderizar a pagina principal de admin
router.get('/', (req, res, next) => {
  res.render('admin/index', {
    data: '',
    navbar: false
  });
});
//------------------------------------------------------------------------------------------------------
//Metodo para listar os emails de usuarios inscritos 
router.get('/inscricoes', (req, res, next) => {
  adminController.listarInscricoes(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Metodo para listar as mensagens de usuarios  
router.get('/mensagens', (req, res, next) => {
  adminController.listarMensagens(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Metodo para salvar as categorias de produto
router.post('/salvar-categoria-produto', (req, res, next) => {
  categoriaProdutoController.salvarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para listar as categorias de produtos
router.get('/listar-categorias-produto', (req, res, next) => {
  categoriaProdutoController.listarCategorias(req, res, next);
});
//------------------------------------------------------------------------------------------------------


//CATEGORIA DE PRODUTOS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de categoria de produto
router.get('/categoria-produtos', (req, res, next) => {
  categoriaProdutoController.listarTodasCategorias(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Salvar uma categoria de produto
router.post('/categoria-produtos', (req, res, next) => {
  categoriaProdutoController.salvarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Editar uma categoria de produto
router.post('/editar-categoria-produtos', (req, res, next) => {
  categoriaProdutoController.editarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Deletar uma categoria de produto
router.delete('/categoria-produtos/:id', (req, res, next) => {
  categoriaProdutoController.desabilitarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------


//CATEGORIA DE CESTAS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de categoria de cesta
router.get('/categoria-cestas', (req, res, next) => {
  categoriaCestaController.listarTodasCategorias(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Salvar uma categoria de cesta
router.post('/categoria-cestas', (req, res, next) => {
  categoriaCestaController.salvarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Editar uma categoria de cesta
router.post('/editar-categoria-cestas', (req, res, next) => {
  categoriaCestaController.editarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Deletar uma categoria de cesta
router.delete('/categoria-cestas/:id', (req, res, next) => {
  categoriaCestaController.desabilitarCategoria(req, res, next);
});
//------------------------------------------------------------------------------------------------------


module.exports = router;