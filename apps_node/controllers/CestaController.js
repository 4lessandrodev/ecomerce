const Cesta = require('./../models/CestaModel');
const Produto = require('./../models/ProdutoModel');
const CategoriaCesta = require('./../models/CategoriaCestasModel');
const ProdutosDeCesta = require('./../models/ProdutosParaCestaModel');

//--------------------------------------------------------------------------------
const renderizar = (req, res, next, cestas, categorias, produtos, produtos_de_cestas) => {
  let logado = (req.session.user != undefined);
  res.render('admin/cestas', {
    logado,
    data: '',
    navbar: true,
    pagina: 'Cestas',
    btnLabel: 'Nova cesta',
    categorias,
    produtos,
    cestas,
    produtos_de_cestas,
    local: 'http://localhost:3000',

    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin/cesta'
    }
  });
};
//---------------------------------------------------------------------------------------------
const renderizarPaginaEditar = (req, res, next, cesta, categorias, produtos, produtos_da_cesta) => {
  let logado = (req.session.user != undefined);
  res.render('admin/editar-cesta', {
    logado,
    data: '',
    navbar: true,
    pagina: 'Editar Cesta',
    btnLabel: '',
    categorias,
    produtos,
    cesta,
    produtos_da_cesta,
    local: 'http://localhost:3000',

    btn: {
      label: 'Voltar',
      classe: '',
      classe2: 'display-none',
      caminho: '/admin/cesta'
    }
  });
};
//---------------------------------------------------------------------------------------------
const salvarCesta = (req, res, next) => {
  let cesta = new Cesta(req.body.descricao, req.body.id_categoria_cesta, req.body.preco, req.body.informacoes_nutricionais, req.body.alteracoes_permitidas, req.body.imagem, req.body.status);
  cesta.salvarCesta(cesta).then(cesta => {
    res.redirect('cesta');
  }).catch(err => {
    console.log(err.message);
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
  cesta.atualizarCesta(cesta).then(result => {
    cesta.listarTodasCestas(cesta).then(cestas => {
      categoria.listarCategoriaCestasAtivas(categoria).then(categorias => {
        produto.listarTodosProdutos(produto).then(produtos => {
          produtosDeCesta.listarProdutosDeCestas(produtosDeCesta).then(produtos_de_cestas => {
            renderizar(req, res, next, cestas, categorias, produtos, produtos_de_cestas);
          }).catch(err => {
            console.log(err.message);
            res.send(err.message);
          });
        }).catch(err => {
          console.log(err.message);
          res.send(err.message);
        });
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    }).catch(err => {
      console.log(err.message);
      res.send(err.message);
    });
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const desabilitarCesta = (req, res, next) => {
  let cesta = new Cesta();
  cesta.id = req.params.id;
  cesta.cesta_excluida = 1;
  cesta.desabilitarCesta(cesta).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const listarCestasAtivas = (req, res, next) => {
  let cesta = new Cesta();
  cesta.listarCestasAtivas(cesta).then(cestas => {
    renderizar(req, res, next, cestas);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const listarTodasCestas = (req, res, next) => {
  let cesta = new Cesta();
  cesta.listarTodasCestas(cesta).then(cestas => {
    let categoria = new CategoriaCesta();
    categoria.listarCategoriaCestasAtivas(categoria).then(categorias => {
      let produto = new Produto();
      produto.listarTodosProdutos(produto).then(produtos => {
        let produtosDeCesta = new ProdutosDeCesta();
        produtosDeCesta.listarProdutosDeCestas(produtosDeCesta).then(produtos_de_cestas => {
          renderizar(req, res, next, cestas, categorias, produtos, produtos_de_cestas);
        }).catch(err => {
          console.log(err.message);
          res.send(err.message);
        });
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    }).catch(err => {
      console.log(err.message);
      res.send(err.message);
    });
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const listarCestaSelecionada = (req, res, next) => {
  let cesta = new Cesta();
  cesta.id = req.params.id;
  let produto = new Produto();
  let categoria = new CategoriaCesta();
  let produtosDeCesta = new ProdutosDeCesta(null, cesta.id);
  cesta.listarCestaEspecifica(cesta).then(cesta => {
    categoria.listarCategoriaCestasAtivas(categoria).then(categorias => {
      produto.listarTodosProdutos(produto).then(produtos => {
        produtosDeCesta.listarDescricaoProdutosDeUmaCestaEspecifica(produtosDeCesta).then(produtos_da_cesta => {
          renderizarPaginaEditar(req, res, next, cesta[0], categorias, produtos, produtos_da_cesta);
        }).catch(err => {
          console.log(err.message);
          res.send(err.message);
        });
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    }).catch(err => {
      console.log(err.message);
      res.send(err.message);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------

module.exports = { salvarCesta, editarCesta, desabilitarCesta, listarCestasAtivas, listarTodasCestas, listarCestaSelecionada };