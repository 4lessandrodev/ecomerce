const CategoriaCestaModel = require('./../models/CategoriaCestasModel');

//--------------------------------------------------------------------------------
const renderizarPaginaCategoria = (req, res, next, categorias) => {
  let logado = (req.session.user != undefined);
  res.render('admin/categoria-cestas', {
    logado,
    categorias,
    data: '',
    navbar: true,
    pagina: 'Categoria cestas',
    btnLabel: 'Nova categoria',


    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//--------------------------------------------------------------------------------
const salvarCategoria = (req, res, next) => {
  let categoria = new CategoriaCestaModel(req.body.descricao, req.body.status);
  categoria.salvarCategoriaCesta(categoria).then(categoria => {
    res.redirect('categoria-cestas');
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const editarCategoria = (req, res, next) => {
  let categoria = new CategoriaCestaModel(req.body.descricao, req.body.status);
  categoria.id = req.body.id;
  categoria.atualizarCategoriaCesta(categoria).then(result => {
    categoria.listarTodasCategoriaCestas(categoria).then(categorias => {
      renderizarPaginaCategoria(req, res, next, categorias);
    });
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const desabilitarCategoria = (req, res, next) => {
  let categoria = new CategoriaCestaModel();
  categoria.id = req.params.id;
  categoria.categoria_c_excluida = 1;
  categoria.desabilitarCategoriaCesta(categoria).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const listarTodasCategorias = (req, res, next) => {
  let categoria = new CategoriaCestaModel();
  categoria.listarTodasCategoriaCestas(categoria).then(categorias => {
    categoria.listarTodasCategoriaCestas(categoria).then(categorias => {
      renderizarPaginaCategoria(req, res, next, categorias);
    });
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const listarCategoriasAtivas = (req, res, next) => {
  let categoria = new CategoriaCestaModel();
  categoria.listarCategoriaCestasAtivas(categoria).then(categoria => {
    res.send(categoria);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------

module.exports = { salvarCategoria, editarCategoria, desabilitarCategoria, listarTodasCategorias, listarCategoriasAtivas };