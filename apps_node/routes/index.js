var express = require('express');
var router = express.Router();
const indexController = require('../controllers/IndexController');

//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina principal  
router.get('/', (req, res, next) => {
  res.render('index', { cestas: [], produtos: [] });
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de contato
router.get('/contact', (req, res, next) => {
  res.render('contact', { body: {} });
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de cestas da semana
router.get('/cestas', (req, res, next) => {
  res.render('cestas', { cestas: [], produtos: [] });
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
router.post('/mensagem', (req, res, next) => {
  indexController.enviarMensagem(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de login
router.get('/login', (req, res, next) => {
  res.render('login', { body: [] });
});
//------------------------------------------------------------------------------------------------------
module.exports = router;
