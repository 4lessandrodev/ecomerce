const CategoriaProdutoModel = require('./../models/CategoriaProdutoModel');

//--------------------------------------------------------------------------------
const salvarCategoria = (req, res, next) => {
  let categoria = new CategoriaProdutoModel(req.body.descricao, req.body.status);
  categoria.salvarCategoria(categoria).then(categoria => {
    res.send(categoria);
  }).catch(err => {
    res.send(err);
  });
};
//--------------------------------------------------------------------------------
const listarCategorias = (req, res, next) => {
  let categoria = new CategoriaProdutoModel();
  categoria.listarCategorias(categoria).then(categorias => {
    res.send(categorias);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const editarCategoria = (req, res, next) => {
  let categoria = new CategoriaProdutoModel(req.body.descricao, req.body.status);
  categoria.id = req.body.id;
  categoria.atualizarCategoria(categoria).then(categorias => {
    res.send(categorias);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const desabilitarCategoria = (req, res, next) => {
  let categoria = new CategoriaProdutoModel();
  categoria.id = req.body.id;
  categoria.categoria_p_excluida = 1;
  categoria.desabilitarCategoria(categoria).then(categoria => {
    res.send(categoria);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------

module.exports = { salvarCategoria, listarCategorias, editarCategoria, desabilitarCategoria };