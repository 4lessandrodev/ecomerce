const FornecedorParaProduto = require('./../models/FornecedorParaProdutoModel');

//-------------------------------------------------------------------------------
const salvarFornecedorParaProduto = (req, res, next) => {
  let fpp = new FornecedorParaProduto(req.body.id_fornecedor, req.body.id_produto);
  fpp.salvarFornecedorParaProduto(fpp).then(forn => {
    res.send(forn);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------
const editarFornecedorParaProduto = (req, res, next) => {
  let fpp = new FornecedorParaProduto(req.body.id_fornecedor, req.body.id_produto);
  fpp.id = req.body.id;
  fpp.atualizarFornecedoresParaProduto(fpp).then(forn => {
    res.send(forn);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------
const excluirFornecedorParaProduto = (req, res, next) => {
  let fpp = new FornecedorParaProduto(req.body.id_fornecedor, req.body.id_produto);
  fpp.id = req.body.id;
  fpp.excluirFornecedoresParaProduto(fpp).then(forn => {
    res.send(forn);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------
const listarFornecedoresParaProduto = (req, res, next) => {
  let fpp = new FornecedorParaProduto(req.body.id_fornecedor, req.body.id_produto);
  fpp.listarFornecedoresParaProduto(fpp).then(fornecedores => {
    res.send(fornecedores);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};

module.exports = { salvarFornecedorParaProduto, editarFornecedorParaProduto, excluirFornecedorParaProduto, listarFornecedoresParaProduto };