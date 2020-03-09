const Cesta = require('./../models/CestaModel');
const Produto = require('./../models/ProdutoModel');
const CategoriaCesta = require('./../models/CategoriaCestasModel');
const ProdutosDeCesta = require('./../models/ProdutosParaCestaModel');

//--------------------------------------------------------------------------------
const renderizar = (req, res, next, cestas, categorias, produtos, produtos_de_cestas) => {
  res.render('admin/cestas', {
    data: '',
    navbar: true,
    pagina: 'Cestas',
    btnLabel: 'Nova cesta',
    categorias,
    produtos,
    cestas,
    produtos_de_cestas
  });
};
//---------------------------------------------------------------------------------------------
const salvarCesta = (req, res, next) => {
  let cesta = new Cesta(req.body.descricao, req.body.id_categoria_cesta, req.body.preco, req.body.informacoes_nutricionais, req.body.alteracoes_permitidas, req.body.imagem, req.body.status);
  cesta.salvarCesta(cesta).then(cesta => {
    res.redirect('cesta');
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const editarCesta = (req, res, next) => {
  let produto = new Produto();
  let categoria = new CategoriaCesta();
  let produtosDeCesta = new ProdutosDeCesta();
  let cesta = new Cesta(req.body.descricao, req.body.id_categoria_cesta, req.body.preco, req.body.informacoes_nutricionais, req.body.alteracoes_permitidas, req.body.imagem, req.body.status);
  cesta.id = req.body.id;
  console.log(cesta);
  cesta.atualizarCesta(cesta).then(result => {
    cesta.listarTodasCestas(cesta).then(cestas => {
      categoria.listarCategoriaCestasAtivas(categoria).then(categorias => {
        produto.listarTodosProdutos(produto).then(produtos => {
          produtosDeCesta.listarProdutosDeCestas(produtosDeCesta).then(produtos_de_cestas => {
            renderizar(req, res, next, cestas, categorias, produtos, produtos_de_cestas);
          });
        });
      });
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const desabilitarCesta = (req, res, next) => {
  let cesta = new Cesta();
  cesta.id = req.params.id;
  cesta.cesta_excluida = 1;
  console.log(cesta);
  cesta.desabilitarCesta(cesta).then(result => {
    res.send(result);
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
  let categoria = new CategoriaCesta();
  let produtosDeCesta = new ProdutosDeCesta();
  cesta.listarTodasCestas(cesta).then(cestas => {
    categoria.listarCategoriaCestasAtivas(categoria).then(categorias => {
      produto.listarTodosProdutos(produto).then(produtos => {
        produtosDeCesta.listarProdutosDeCestas(produtosDeCesta).then(produtos_de_cestas => {
          renderizar(req, res, next, cestas, categorias, produtos, produtos_de_cestas);
        });
      });
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------

module.exports = { salvarCesta, editarCesta, desabilitarCesta, listarCestasAtivas, listarTodasCestas };