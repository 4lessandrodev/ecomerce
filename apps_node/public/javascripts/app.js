import { CompraModel } from './Model/CompraModel.js';
import { ProdutoModel } from './Model/ProdutoModel.js';
import { CestaModel } from './Model/CestaModel.js';

import { CompraController } from './Controller/CompraController.js';
import { ProdutoController } from './Controller/ProdutoController.js';
import { CestaController } from './Controller/CestaController.js';


let view = document.querySelector('body');

var cestaModel = new CestaModel();
var produtoModel = new ProdutoModel();
var compraModel = new CompraModel();

var produtoCont = new ProdutoController(produtoModel, view);
var cestaCont = new CestaController(cestaModel, view);
var compraCont = new CompraController(compraModel, view, produtoCont, cestaCont);



const currentPage = location.pathname.slice(0, 19);
switch (currentPage) {
  case '/cesta-selecionada/':
    //-------------------------------------------------------------------------------------------------
    const btnComprarCesta = document.querySelector('#btn-comprar-cesta');
    const btnAddCestaNoCarrinho = document.querySelector('#btn-add-cesta');

    btnComprarCesta.addEventListener('click', function () {
      let cesta = cestaCont.novaCesta();
      compraCont.iniciarCompra('Cesta', cesta);
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
      compraCont.iniciarCompra('Produto', produto);
    });
    btnComprarProduto.addEventListener('click', function () {
      let produto = produtoCont.novoProduto();
      compraCont.iniciarCompra('Produto', produto);
    });
    //-------------------------------------------------------------------------------------------------
    break;
  default:
    break;
}







