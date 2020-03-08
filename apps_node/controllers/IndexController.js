var Inscricao = require('../models/InscricaoModel');
const Produto = require('./../models/ProdutoModel');




//------------------------------------------------------------------------------------------------------
const renderizar = (req, res, next, produtos) => {
  res.render('index', {
    produtos,
    cestas: []
  });
};
//------------------------------------------------------------------------------------------------------
const inscrever = (req, res, next) => {
  inscricao = new Inscricao(req.body.email);
  inscricao.salvarInscricao(inscricao).then(resposta => {
    res.redirect('/');
  }).catch(err => {
    res.redirect('/');
  });
};
//------------------------------------------------------------------------------------------------------
const carregarIndex = (req, res, next) => {
  let produto = new Produto();
  produto.produto_especial = 1;
  produto.listarProdutosEspeciaisAtivos(produto).then(produtos => {
    renderizar(req, res, next, produtos);
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------


module.exports = { inscrever, carregarIndex };