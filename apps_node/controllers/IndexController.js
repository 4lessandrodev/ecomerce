var Inscricao = require('../models/InscricaoModel');
const Produto = require('./../models/ProdutoModel');
const Cesta = require('./../models/CestaModel');
const Regioes = require('./../models/RegiaoModel');
const ProdutosDeCesta = require('./../models/ProdutosParaCestaModel');





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
//Rota para cesta selecionada
const renderizarPaginaCestaSelecionada = (req, res, next, cesta, produtos, produtos_da_cesta) => {
  //res.send(produtos_da_cesta);
  //res.send(cesta);
  res.render('cesta-selecionada', {
    rotulo: 'Cesta Selecionada',
    cesta,
    produtos,
    produtos_da_cesta
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaCadastroUsuario = (req, res, next, regioes) => {
  res.render('register', {
    body: req.body,
    regioes
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
const renderizarPaginaProdutoSelecionado = (req, res, next, produto, indicacoes) => {
  res.render('produto-selecionado', {
    rotulo: 'Produto Selecionado',
    produto, indicacoes
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
const carregarCadastro = (req, res, next) => {
  let regiao = new Regioes();
  regiao.listarRegioesAtivas(regiao).then(regioes => {
    renderizarPaginaCadastroUsuario(req, res, next, regioes);
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const listarCestaSelecionada = (req, res, next) => {
  let cesta = new Cesta();
  cesta.id = req.params.id;
  let produto = new Produto();
  let produtosDeCesta = new ProdutosDeCesta(null, cesta.id);
  cesta.listarCestaEspecifica(cesta).then(cesta => {
    produto.listarTodosProdutos(produto).then(produtos => {
      produtosDeCesta.listarDescricaoProdutosDeUmaCestaEspecifica(produtosDeCesta).then(produtos_da_cesta => {
        renderizarPaginaCestaSelecionada(req, res, next, cesta[0], produtos, produtos_da_cesta);
      }).catch(err => {
        res.send(err.message);
      });
    }).catch(err => {
      res.send(err.message);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const exibirProdutoSelecionadoNaHome = (req, res, next) => {
  let produto = new Produto();
  produto.id = req.params.id;
  produto.listarProdutoSelecionado(produto).then(produtoSelecionado => {
    produto.abrirProdutosIndicados(produto).then(indicacoes => {
      renderizarPaginaProdutoSelecionado(req, res, next, produtoSelecionado[0], indicacoes);
      //res.send(produto);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------

module.exports = { inscrever, carregarIndex, carregarMercearia, carregarCadastro, listarCestaSelecionada, exibirProdutoSelecionadoNaHome };