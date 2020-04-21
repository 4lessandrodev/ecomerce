var express = require('express');
var router = express.Router();
const indexController = require('../controllers/IndexController');
const contactController = require('../controllers/ContatosController');
const usuarioController = require('../controllers/UsuarioController');
const clienteController = require('../controllers/ClienteController');
//-------------------------------------------------------------------------
const produtoCompraController = require('../controllers/ProdutoCompraController');




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
  indexController.carregarCarrinhoDeCompras(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para realizar login
router.post('/login', (req, res, next) => {
  usuarioController.entrar(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Rota para salvar o pedido
router.post('/salvar-pedido', (req, res, next) => {
  indexController.salvarPedido(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Limpar carrinho de compras
router.post('/limpar-carrinho', (req, res, next) => {
  indexController.limparCarrinho(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Ver plano especifico
router.get('/plano/:id', (req, res, next) => {
  indexController.verPlano(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Assinar um plano
router.post('/assinar-plano', (req, res, next) => {
  indexController.assinarPlano(req, res, next);
});



module.exports = router;
