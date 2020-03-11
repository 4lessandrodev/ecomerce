var express = require('express');
var router = express.Router();
const indexController = require('../controllers/IndexController');
const contactController = require('../controllers/ContatosController');


//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina principal  
router.get('/', (req, res, next) => {
  indexController.carregarIndex(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de contato
router.get('/contact', (req, res, next) => {
  res.render('contact', { body: {} });
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de cestas da semana
router.get('/cestas', (req, res, next) => {
  indexController.carregarMercearia(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de carrinho com os itens adicionados
router.get('/carrinho', (req, res, next) => {
  res.render('carrinho', { clientLoged: { name: 'Usuario', street: 'Rua sem nome casa sem numero' } });
});
//------------------------------------------------------------------------------------------------------
//Metodo de postagem do email 
router.post('/inscrever', (req, res, next) => {
  indexController.inscrever(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Metodo de enviar mensagem de contato 
router.post('/contact', (req, res, next) => {
  contactController.salvarMensagem(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de login
router.get('/login', (req, res, next) => {
  res.render('login', { body: [] });
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de login
router.get('/register', (req, res, next) => {
  res.render('register', { body: [], regioes: [] });
});
//------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de login
router.get('/teste', (req, res, next) => {
  res.render('teste', { body: [] });
});
//------------------------------------------------------------------------------------------------------


module.exports = router;
