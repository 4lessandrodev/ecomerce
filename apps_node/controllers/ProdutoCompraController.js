const ProdutoCompra = require('./../models/ProdutoCompraModel');


const salvarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra(req.body.id_produto, req.body.id_compra);
  produtoCompra.salvarProdutoCompra(produtoCompra).then(produtoCompra => {
    res.send(produtoCompra);
  }).catch(err => {

  });
};


const editarProdutoCompra = (req, res, next) => {
  let produtoCompra = new ProdutoCompra(req.body.id_produto, req.body.id_compra);
  x.editar().then(xx => {

  }).catch(err => {

  });
};

const excluirProdutoCompra = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.excluir().then(xx => {

  }).catch(err => {

  });
};

const listarProdutoCompra = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.listar().then(xx => {

  }).catch(err => {

  });
};

const desativarProdutoCompra = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.desativar().then(xx => {

  }).catch(err => {

  });
};

module.exports = { salvarProdutoCompra, editarProdutoCompra, excluirProdutoCompra, listarProdutoCompra, desativarProdutoCompra };