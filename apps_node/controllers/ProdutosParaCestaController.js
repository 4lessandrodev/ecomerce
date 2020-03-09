const ProdutoParaCesta = require('./../models/ProdutosParaCestaModel');

//-------------------------------------------------------------------
const salvarProdParaCesta = (req, res, next) => {
  let prodPcesta = new ProdutoParaCesta(req.params.id_produto, req.params.id_cesta);
  console.log(prodPcesta);
  prodPcesta.salvarProdutoParaCesta(prodPcesta).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err.message);
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
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const listarProdParaCesta = (req, res, next) => {
  let prodPcesta = new ProdutoParaCesta();
  prodPcesta.listarProdutoParaCesta(prodPcesta).then(prodPcesta => {
    res.send(prodPcesta);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const excluirProdParaCesta = (req, res, next) => {
  let prodPcesta = new ProdutoParaCesta(req.params.id_produto, req.params.id_cesta);
  prodPcesta.excluirProdutoParaCesta(prodPcesta).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};

module.exports = { salvarProdParaCesta, editarProdParaCesta, listarProdParaCesta, excluirProdParaCesta };