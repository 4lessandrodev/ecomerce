import { CompraModel } from './Model/CompraModel.js';
import { ProdutoModel } from './Model/ProdutoModel.js';
import { CestaModel } from './Model/CestaModel.js';
import { PedidoModel } from './Model/PedidoModel.js';

import { CompraController } from './Controller/CompraController.js';
import { ProdutoController } from './Controller/ProdutoController.js';
import { CestaController } from './Controller/CestaController.js';
import { PedidoController } from './Controller/PedidoController.js';


let view = document.querySelector('body');

var cestaModel = new CestaModel();
var produtoModel = new ProdutoModel();
var compraModel = new CompraModel();
var pedidoModel = new PedidoModel();

var produtoCont = new ProdutoController(produtoModel, view);
var cestaCont = new CestaController(cestaModel, view);
var compraCont = new CompraController(compraModel, view, produtoCont, cestaCont);
var pedidoCont = new PedidoController(pedidoModel, view);



const currentPage = location.pathname.slice(0, 19);
switch (currentPage) {
  case '/cesta-selecionada/':
  //-------------------------------------------------------------------------------------------------
  const btnComprarCesta = document.querySelector('#btn-comprar-cesta');
  const btnAddCestaNoCarrinho = document.querySelector('#btn-add-cesta');
  
  btnComprarCesta.addEventListener('click', function () {
    let cesta = cestaCont.novaCesta();
    compraCont.iniciarCompra('Cesta', cesta, true); //Parametros = Tipo de compra, objeto cesta, redirecionar para carrinho
  });
    
  btnAddCestaNoCarrinho.addEventListener('click', function () {
    let cesta = cestaCont.novaCesta();
    compraCont.iniciarCompra('Cesta', cesta);
  });
  
  //-------------------------------------------------------------------------------------------------
  break;
  case '/produto-selecionad':
  //-------------------------------------------------------------------------------------------------
  const btnComprarProduto = document.querySelector('#btn-comprar-produto');
  const btnAddProdutoNoCarrinho = document.querySelector('#btn-add-produto');
  
  btnAddProdutoNoCarrinho.addEventListener('click', function () {
    let produto = produtoCont.novoProduto();
    compraCont.iniciarCompra('Produto', produto); //Parametros = Tipo de compra, objeto cesta, redirecionar para carrinho
  });
    
  btnComprarProduto.addEventListener('click', function () {
    let produto = produtoCont.novoProduto();
    compraCont.iniciarCompra('Produto', produto, true);
  });
  break;
  //-------------------------------------------------------------------------------------------------
  case '/carrinho':
  //-------------------------------------------------------------------------------------------------
    const btnConfirmarPedido = document.querySelector('#btn-confirmar-pedido');
    btnConfirmarPedido.addEventListener('click', function () {
      let pedido = pedidoCont.novoPedido(); 
      pedidoCont.salvarPedido(pedido);
    });

  break;
  default:
  break;
}







