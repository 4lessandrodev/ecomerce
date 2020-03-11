var Inscricao = require('../models/InscricaoModel');
const Produto = require('./../models/ProdutoModel');
const Cesta = require('./../models/CestaModel');




//------------------------------------------------------------------------------------------------------
const renderizar = (req, res, next, produtos, cestas) => {
  res.render('index', {
    produtos,
    cestas,

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaCestas = (req, res, next, produtos, cestas) => {
  res.render('cestas', {
    produtos,
    cestas,

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: 'display-none',
      caminho: '/admin'
    }
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
  let cesta = new Cesta();
  produto.produto_especial = 1;
  produto.listarProdutosEspeciaisAtivos(produto).then(produtos => {
    cesta.listarCestasAtivas(cesta).then(cestas => {
      renderizar(req, res, next, produtos, cestas);
    });
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const carregarMercearia = (req, res, next) => {
  let produto = new Produto();
  let cesta = new Cesta();
  produto.produto_especial = 1;
  produto.listarProdutosEspeciaisAtivos(produto).then(produtos => {
    cesta.listarCestasAtivas(cesta).then(cestas => {
      renderizarPaginaCestas(req, res, next, produtos, cestas);
    });
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------


module.exports = { inscrever, carregarIndex, carregarMercearia };