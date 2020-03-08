const Cesta = require('./../models/CestaModel');
const Produto = require('./../models/ProdutoModel');
const CategoriaCesta = require('./../models/CategoriaCestasModel');

//--------------------------------------------------------------------------------
const renderizar = (req, res, next, unidades, cestas = [], categorias = [], produtos = []) => {
  res.render('admin/cestas', {
    unidades,
    data: '',
    navbar: true,
    pagina: 'Cestas',
    btnLabel: 'Nova cesta',
    categorias,
    produtos,
    cestas
  });
};
//---------------------------------------------------------------------------------------------
const salvarCesta = (req, res, next) => {
  let cesta = new Cesta(req.body.descricao, req.body.id_categoria_cesta, req.body.preco, req.body.informacoes_nutricionais, req.body.alteracoes_permitidas, req.body.imagem, req.body.status);
  cesta.salvarCesta(cesta).then(cesta => {
    res.redirect('cestas');
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const editarCesta = (req, res, next) => {
  let cesta = new Cesta(req.body.descricao, req.body.id_categoria_cesta, req.body.preco, req.body.informacoes_nutricionais, req.body.alteracoes_permitidas, req.body.imagem, req.body.status);
  cesta.id = req.body.id;
  cesta.atualizarCesta(cesta).then(result => {
    cesta.listarTodasCestas(cesta).then(cestas => {
      renderizar(req, res, next, cestas);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const desabilitarCesta = (req, res, next) => {
  let cesta = new Cesta();
  cesta.id = req.body.id;
  cesta.cesta_excluida = 1;
  cesta.desabilitarCesta(cesta).then(cesta => {
    res.send(cesta);
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const listarCestasAtivas = (req, res, next) => {
  let cesta = new Cesta();
  cesta.listarCestasAtivas(cesta).then(cestas => {
    renderizar(req, res, next, cestas);
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const listarTodasCestas = (req, res, next) => {
  let cesta = new Cesta();
  let produto = new Produto();
  console.log(produto);
  let categoria = new CategoriaCesta();
  cesta.listarTodasCestas(cesta).then(cestas => {
    categoria.listarCategoriaCestasAtivas(categoria).then(categorias => {
      produto.listarTodosProdutos(produto).then(produtos => {
        renderizar(req, res, next, cestas, categorias, produtos);
      });
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------

module.exports = { salvarCesta, editarCesta, desabilitarCesta, listarCestasAtivas, listarTodasCestas };