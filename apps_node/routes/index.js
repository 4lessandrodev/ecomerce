var express = require('express');
var router = express.Router();
const indexController = require('../controllers/IndexController');

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
module.exports = router;
