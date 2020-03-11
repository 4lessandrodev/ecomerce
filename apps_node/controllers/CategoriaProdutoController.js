const CategoriaProdutoModel = require('./../models/CategoriaProdutoModel');

const renderizarPaginaCategoria = (req, res, next, categorias) => {
  res.render('admin/categoria-produtos', {
    categorias,
    data: '',
    navbar: true,
    pagina: 'Categoria produtos',
    btnLabel: 'Nova categ. produto',

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
  let categoria = new CategoriaProdutoModel(req.body.descricao, req.body.status);
  categoria.salvarCategoria(categoria).then(categoria => {
    res.redirect('categoria-produtos');
  }).catch(err => {
    res.send(err);
  });
};
//--------------------------------------------------------------------------------
const listarTodasCategorias = (req, res, next) => {
  let categoria = new CategoriaProdutoModel();
  categoria.listarTodasCategorias(categoria).then(categorias => {
    renderizarPaginaCategoria(req, res, next, categorias);
  }).catch(err => {
    return err;
  });
};
//--------------------------------------------------------------------------------
const listarCategoriasAtivas = (req, res, next) => {
  let categoria = new CategoriaProdutoModel();
  categoria.listarCategoriasAtivas(categoria).then(categorias => {
    renderizarPaginaCategoria(req, res, next, categorias);
  }).catch(err => {
    return err;
  });
};
//--------------------------------------------------------------------------------
const editarCategoria = (req, res, next) => {
  let categoria = new CategoriaProdutoModel(req.body.descricao, req.body.status);
  categoria.id = req.body.id;
  categoria.atualizarCategoria(categoria).then(result => {
    categoria.listarCategoriasAtivas(categoria).then(categorias => {
      renderizarPaginaCategoria(req, res, next, categorias);
    }).catch(err => {
      return err;
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const desabilitarCategoria = (req, res, next) => {
  let categoria = new CategoriaProdutoModel();
  categoria.id = req.params.id;
  categoria.categoria_p_excluida = 1;
  categoria.desabilitarCategoria(categoria).then(result => {
    res.send(result);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------

module.exports = { salvarCategoria, listarTodasCategorias, editarCategoria, desabilitarCategoria, listarCategoriasAtivas };