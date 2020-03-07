const ProdutoParaCesta = require('./../models/ProdutosParaCestaModel');

//-------------------------------------------------------------------
const salvarProdParaCesta = (req, res, next) => {
  let prodPcesta = new ProdutoParaCesta(req.body.id_produto, req.body.id_cesta);
  prodPcesta.salvarProdutoParaCesta(prodPcesta).then(prodPcesta => {
    res.send(prodPcesta);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const editarProdParaCesta = (req, res, next) => {
  let prodPcesta = new ProdutoParaCesta(req.body.id_produto, req.body.id_cesta);
  prodPcesta.id = req.body.id;
  prodPcesta.atualizarProdutoParaCesta(prodPcesta).then(prodPcesta => {
    res.send(prodPcesta);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const listarProdParaCesta = (req, res, next) => {
  let prodPcesta = new ProdutoParaCesta();
  prodPcesta.listarProdutoParaCesta(prodPcesta).then(prodPcesta => {
    res.send(prodPcesta);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const excluirProdParaCesta = (req, res, next) => {
  let prodPcesta = new ProdutoParaCesta();
  prodPcesta.id = req.body.id;
  prodPcesta.excluirProdutoParaCesta(prodPcesta).then(prodPcesta => {
    res.send(prodPcesta);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarProdParaCesta, editarProdParaCesta, listarProdParaCesta, excluirProdParaCesta };