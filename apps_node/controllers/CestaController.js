const Cesta = require('./../models/CestaModel');

//---------------------------------------------------------------------------------------------
const salvarCesta = (req, res, next) => {
  let cesta = new Cesta(req.body.descricao, req.body.id_categoria_cesta, req.body.preco, req.body.informacoes_nutricionais, req.body.alteracoes_permitidas, req.body.imagem, req.body.status);
  cesta.salvarCesta(cesta).then(cesta => {
    res.send(cesta);
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------
const editarCesta = (req, res, next) => {
  let cesta = new Cesta(req.body.descricao, req.body.id_categoria_cesta, req.body.preco, req.body.informacoes_nutricionais, req.body.alteracoes_permitidas, req.body.imagem, req.body.status);
  cesta.atualizarCesta(cesta).then(cesta => {
    res.send(cesta);
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
const listarCestas = (req, res, next) => {
  let cesta = new Cesta();
  x.listar(cesta).then(cestas => {
    res.send(cestas);
  }).catch(err => {
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------

module.exports = { salvarCesta, editarCesta, desabilitarCesta, listarCestas };