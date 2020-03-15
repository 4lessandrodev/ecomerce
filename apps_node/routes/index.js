var express = require('express');
var router = express.Router();
const indexController = require('../controllers/IndexController');
const contactController = require('../controllers/ContatosController');
const usuarioController = require('../controllers/UsuarioController');
const clienteController = require('../controllers/ClienteController');


//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina principal  
router.get('/', (req, res, next) => {
  indexController.carregarIndex(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina principal  
router.get('/logout', (req, res, next) => {
  indexController.sair(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de contato
router.get('/contact', (req, res, next) => {
  let logado = (req.session.user != undefined);
  res.render('contact', { body: {}, logado});
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de cestas da semana
router.get('/cestas', (req, res, next) => {
  indexController.carregarMercearia(req, res, next);
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
  usuarioController.renderizarPaginaLogin(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de cadastro de usuario/cliente 
router.get('/register', (req, res, next) => {
  indexController.carregarCadastro(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de login
router.post('/register-user', (req, res, next) => {
  usuarioController.salvarUsuario(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para cadastrar dados do usuário
router.post('/register-cliente', (req, res, next) => {
  clienteController.salvarCliente(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para cesta selecionada
router.get('/cesta-selecionada/:id', (req, res, next) => {
  indexController.listarCestaSelecionada(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de produto selecionado
router.get('/produto-selecionado/:id', (req, res, next) => {
  indexController.exibirProdutoSelecionadoNaHome(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para criar chave de compra inserindo o id do usuario... a qual irá em cada item adicionado no carrinho e no pedido.
//Amarrando assim item e pedido ao usuário
router.post('/iniciar-compra', (req, res, next) => {
  indexController.iniciarCompra(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para adicionar produto comprado no banco de dados 
router.post('/comprar-produto', (req, res, next) => {
  indexController.addProdutoNoCarrinho(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para adicionar produto comprado no banco de dados 
router.post('/comprar-cesta', (req, res, next) => {
  indexController.addCestaNoCarrinho(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para carrinho de compras
router.get('/carrinho', (req, res, next) => {
  let logado = (req.session.user != undefined);
  res.render('carrinho', {
    logado,
    rotulo: 'Carrinho',
    produtos: [],
    cestas: [],
    enderecos:
    [
      { descricao: 'Entregar em meu endereço', valor: '0', frete: '10.00' },
      { descricao: 'Quero retirar em: Loja I - Centro', valor: '1', frete: '0.00' },
      { descricao: 'Quero retirar em: Loja II - Zona Oeste', valor: '2', frete: '0.00' }
    ],
    frete:'10.00',
    total:'52.90',
    formaPagamento:
    [
      'Dinheiro - Na entrega',
      'Cartão Marter - Na entrega',
      'Cartão Visa - Na entrega'
    ],
    cliente:{nome:'Alessandro', endereco:'Avenida Afonso Pena, 50 Centro Itumbiara-GO'}
  });
});
//------------------------------------------------------------------------------------------------------
//Rota para realizar login
router.post('/login', (req, res, next) => {
  usuarioController.entrar(req, res, next);
});
//------------------------------------------------------------------------------------------------------





//Rota para renderizar a pagina de login
router.get('/teste', (req, res, next) => {
  //req.session.user = `Usuario logado: ${req.params.id}`;
  res.send(req.session.user);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de login
router.get('/teste2', (req, res, next) => {
  res.send(req.session.user);
});
//------------------------------------------------------------------------------------------------------
//Rota para renderizar a pagina de login
router.get('/teste', (req, res, next) => {
  res.render('teste', { body: [] });
});
//------------------------------------------------------------------------------------------------------


module.exports = router;
