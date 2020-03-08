const ProdutoCompra = require('./../models/ProdutoCompraModel');


//------------------------------------------------------------------
const salvarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra(req.body.id_produto, req.body.id_compra);
  produtoCompra.salvarProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const editarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra(req.body.id_produto, req.body.id_compra);
  produtoCompra.id = req.body.id;
  produtoCompra.atualizarProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const excluirProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra();
  produtoCompra.id = req.body.id;
  produtoCompra.excluirProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------
const listarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra();
  produtoCompra.listarProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {
    res.send(err.message);
  });
};


module.exports = { salvarProdutoCompra, editarProdutoCompra, excluirProdutoCompra, listarProdutoCompra };