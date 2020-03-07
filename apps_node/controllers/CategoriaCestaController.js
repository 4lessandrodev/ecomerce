const CategoriaCestaModel = require('./../models/CategoriaCestasModel');

//--------------------------------------------------------------------------------
const salvarCategoria = (req, res, next) => {
  let categoria = new CategoriaCestaModel(req.body.descricao, req.body.status);
  categoria.salvarCategoriaCesta(categoria).then(categoria => {
    res.send(categoria);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const editarCategoria = (req, res, next) => {
  let categoria = new CategoriaCestaModel(req.body.descricao, req.body.status);
  categoria.id = req.body.id;
  categoria.atualizarCategoriaCesta(categoria).then(categoria => {
    res.send(categoria);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const desabilitarCategoria = (req, res, next) => {
  let categoria = new CategoriaCestaModel();
  categoria.id = req.body.id;
  categoria.categoria_c_excluida = 1;
  categoria.desabilitarCategoriaCesta(categoria).then(categoria => {
    res.send(categoria);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const listarCategorias = (req, res, next) => {
  let categoria = new CategoriaCestaModel();
  categoria.listarCategoriaCestas(categoria).then(categoria => {
    res.send(categoria);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------

module.exports = { salvarCategoria, editarCategoria, desabilitarCategoria, listarCategorias };