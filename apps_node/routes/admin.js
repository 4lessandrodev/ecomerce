var express = require('express');
var router = express.Router();
const adminController = require('../controllers/AdminController');
const categoriaProdutoController = require('../controllers/CategoriaProdutoController');

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
//Renderizar a pagina principal de admin
router.get('/', (req, res, next) => {
  res.render('admin/index', {
    data: '',
    navbar: false
  });
});
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de categoria de produto
router.get('/categoria-produtos', (req, res, next) => {
  res.render('admin/categoria-produtos', {
    categoriasProd: [],
    data: '',
    navbar: true,
    pagina: 'Categoria produtos',
    btnLabel: 'categoria produto'
  });
});
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de categoria de produto
router.get('/categoria-produtos', (req, res, next) => {
  res.render('admin/categoria-produtos', {
    categoriasProd: [],
    data: '',
    navbar: true,
    pagina: 'Categoria produtos',
    btnLabel: 'categoria produto'
  });
});
//------------------------------------------------------------------------------------------------------
module.exports = router;