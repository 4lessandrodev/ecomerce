var express = require('express');
var router = express.Router();
const adminController = require('../controllers/AdminController');
const categoriaProdutoController = require('../controllers/CategoriaProdutoController');
const categoriaCestaController = require('../controllers/CategoriaCestaController');
const unidadeMedidaController = require('../controllers/UnidadeMedidaController');
const regiaoController = require('../controllers/RegiaoController');
const freteController = require('../controllers/FreteController');
const fornecedorController = require('../controllers/FornecedorController');
const lojaController = require('../controllers/LojaController');
const produtoController = require('../controllers/ProdutoController');
const cestaController = require('../controllers/CestaController');
const clienteController = require('../controllers/ClienteController');
const pedidoController = require('../controllers/PedidosController');
//------------------------------------------------------------------------------------------------------
const produtoParaCestaController = require('../controllers/ProdutosParaCestaController');
const contatoController = require('../controllers/ContatosController');



//------------------------------------------------------------------------------------------------------
//Renderizar a pagina principal de admin
router.get('/', (req, res, next) => {
  (adminController.autenticar(req, res, next))?adminController.listarPainel(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Metodo para listar os emails de usuarios inscritos 
router.get('/inscricao', (req, res, next) => {
  (adminController.autenticar(req, res, next))?adminController.listarInscricoes(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Metodo para listar as mensagens de usuarios  
router.get('/mensagem', (req, res, next) => {
  (adminController.autenticar(req, res, next))?contatoController.listarMensagens(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Metodo para salvar as categorias de produto
router.post('/salvar-categoria-produto', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaProdutoController.salvarCategoria(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Rota para listar as categorias de produtos
router.get('/listar-categorias-produto', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaProdutoController.listarCategorias(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------


//CATEGORIA DE PRODUTOS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de categoria de produto
router.get('/categoria-produtos', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaProdutoController.listarTodasCategorias(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma categoria de produto
router.post('/categoria-produtos', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaProdutoController.salvarCategoria(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma categoria de produto
router.post('/editar-categoria-produtos', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaProdutoController.editarCategoria(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma categoria de produto
router.delete('/categoria-produtos/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaProdutoController.desabilitarCategoria(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------


//CATEGORIA DE CESTAS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de categoria de cesta
router.get('/categoria-cestas', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaCestaController.listarTodasCategorias(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma categoria de cesta
router.post('/categoria-cestas', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaCestaController.salvarCategoria(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma categoria de cesta
router.post('/editar-categoria-cestas', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaCestaController.editarCategoria(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma categoria de cesta
router.delete('/categoria-cestas/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?categoriaCestaController.desabilitarCategoria(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//UNIDADES DE MEDIDA
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de unidade de medida de cesta
router.get('/unidade-medida', (req, res, next) => {
  (adminController.autenticar(req, res, next))?unidadeMedidaController.listarTodasUndMed(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma unidade de medida
router.post('/unidade-medida', (req, res, next) => {
  (adminController.autenticar(req, res, next))?unidadeMedidaController.salvarUndMed(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma unidade de medida
router.post('/editar-unidade-medida', (req, res, next) => {
  (adminController.autenticar(req, res, next))?unidadeMedidaController.editarUndMed(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma unidade de medida
router.delete('/unidade-medida/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?unidadeMedidaController.desativarUndMed(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//REGIOES
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de regioes
router.get('/regiao', (req, res, next) => {
  (adminController.autenticar(req, res, next))?regiaoController.listarTodasRegioes(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma regioes
router.post('/regiao', (req, res, next) => {
  (adminController.autenticar(req, res, next))?regiaoController.salvarRegiao(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma regioes
router.post('/editar-regiao', (req, res, next) => {
  (adminController.autenticar(req, res, next))?regiaoController.editarRegiao(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma regioes
router.delete('/regiao/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?regiaoController.desativarRegiao(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//TABELA DE FRETE 
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de tabela de frete
router.get('/frete', (req, res, next) => {
  (adminController.autenticar(req, res, next))?freteController.listarFretes(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma tabela de frete
router.post('/frete', (req, res, next) => {
  (adminController.autenticar(req, res, next))?freteController.salvarFrete(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma tabela de frete
router.post('/editar-frete', (req, res, next) => {
  (adminController.autenticar(req, res, next))?freteController.editarFrete(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma tabela de frete
router.delete('/frete/:id', (req, res, next) => {
  freteController.desabilitarFrete(req, res, next);
});
//------------------------------------------------------------------------------------------------------



//FORNECEDORES
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de fornecedores
router.get('/fornecedor', (req, res, next) => {
  (adminController.autenticar(req, res, next))?fornecedorController.listarFornecedores(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar um fornecedores
router.post('/fornecedor', (req, res, next) => {
  (adminController.autenticar(req, res, next))?fornecedorController.salvarFornecedor(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar um fornecedores
router.post('/editar-fornecedor', (req, res, next) => {
  (adminController.autenticar(req, res, next))?fornecedorController.editarFornecedor(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar um fornecedores
router.delete('/fornecedor/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?fornecedorController.desabilitarFornecedor(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//LOJAS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de lojas
router.get('/loja', (req, res, next) => {
  (adminController.autenticar(req, res, next))?lojaController.listarTodasLojas(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma lojas
router.post('/loja', (req, res, next) => {
  (adminController.autenticar(req, res, next))?lojaController.salvarLoja(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma lojas
router.post('/editar-loja', (req, res, next) => {
  (adminController.autenticar(req, res, next))?lojaController.editarLoja(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma lojas
router.delete('/loja/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?lojaController.desabilitarLoja(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//PRODUTOS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de produtos
router.get('/produto', (req, res, next) => {
  (adminController.autenticar(req, res, next))?produtoController.listarTodosProdutos(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma produtos
router.post('/produto', (req, res, next) => {
  (adminController.autenticar(req, res, next))?produtoController.salvarProduto(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar status dos produtos
router.post('/status-produtos', (req, res, next) => {
  (adminController.autenticar(req, res, next)) ? produtoController.editarStatusProdutos(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma produtos
router.get('/editar-produto/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?produtoController.exibirProdutoSelecionado(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma produtos
router.post('/editar-produto', (req, res, next) => {
  (adminController.autenticar(req, res, next))?produtoController.editarProduto(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma produtos
router.delete('/produto/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?produtoController.desativarProduto(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//CESTAS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de cesta
router.get('/cesta', (req, res, next) => {
  (adminController.autenticar(req, res, next))?cestaController.listarTodasCestas(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar uma cesta
router.post('/cesta', (req, res, next) => {
  (adminController.autenticar(req, res, next))?cestaController.salvarCesta(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma cesta
router.post('/editar-cesta', (req, res, next) => {
  (adminController.autenticar(req, res, next))?cestaController.editarCesta(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar uma cesta
router.get('/editar-cesta/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?cestaController.listarCestaSelecionada(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma cesta
router.delete('/cesta/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?cestaController.desabilitarCesta(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//PEDIDOS
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de pedidos
router.get('/cesta', (req, res, next) => {
  (adminController.autenticar(req, res, next))?pedidoController.listarPedidos(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar um pedidos
router.post('/pedido', (req, res, next) => {
  (adminController.autenticar(req, res, next))?pedidoController.salvarPedido(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Editar um pedidos
router.post('/editar-pedido', (req, res, next) => {
  (adminController.autenticar(req, res, next))?pedidoController.editarPedido(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar um pedidos
router.delete('/pedido/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?pedidoController.excluirPedido(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//CLIENTES
//------------------------------------------------------------------------------------------------------
//Renderizar a pagina de admin de cliente
router.get('/cliente', (req, res, next) => {
  (adminController.autenticar(req, res, next))?clienteController.listarClientes(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Salvar um cliente
router.post('/cliente', (req, res, next) => {
  clienteController.salvarCliente(req, res, next);
});
//------------------------------------------------------------------------------------------------------
//Editar um cliente
router.post('/editar-cliente', (req, res, next) => {
  (adminController.autenticar(req, res, next))?clienteController.editarCliente(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar um cliente
router.delete('/cliente/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next))?clienteController.desabilitarCliente(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//PRODUTOS PARA CESTAS
//------------------------------------------------------------------------------------------------------
//Salvar chave de produtos para cesta
router.post('/produto-para-cesta/:id_produto/:id_cesta', (req, res, next) => {
  (adminController.autenticar(req, res, next))?produtoParaCestaController.salvarProdParaCesta(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------
//Deletar uma chave de produto para cesta
router.delete('/produto-para-cesta/:id_produto/:id_cesta', (req, res, next) => {
  (adminController.autenticar(req, res, next))?produtoParaCestaController.excluirProdParaCesta(req, res, next):'';
});
//------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------
//Listar relatorio de pedidos
//`/admin/pedido/${numero_pedido}/${status_pedido}/${data_inicial}/${data_final}`
router.get('/pedido/:status_pedido?/:data_inicial?/:data_final?/:numero_pedido?', (req, res, next) => {
  (adminController.autenticar(req, res, next)) ? pedidoController.listarPedidos(req, res, next) : '';
});
//------------------------------------------------------------------------------------------------------
//Listar pedido selecionado
router.get('/pedido-selecionado/:id', (req, res, next) => {
  (adminController.autenticar(req, res, next)) ? pedidoController.listarPedidoEspecifico(req, res, next) : '';
});
//------------------------------------------------------------------------------------------------------
//Alterar status do pedido
router.post('/status-pedido/:id/:status', (req, res, next) => {
  (adminController.autenticar(req, res, next)) ? pedidoController.alterarStatusPedido(req, res, next) : '';
});
//------------------------------------------------------------------------------------------------------
//Alterar status dos pedidos listados
router.post('/status-pedidos', (req, res, next) => {
  (adminController.autenticar(req, res, next)) ? pedidoController.alterarStatusPedidos(req, res, next) : '';
});
//------------------------------------------------------------------------------------------------------

module.exports = router;