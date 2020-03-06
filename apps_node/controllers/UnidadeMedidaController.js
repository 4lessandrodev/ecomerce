const UndMed = require('./../models/UnidadeMedidaModel');

//------------------------------------------------------------------
const salvarUndMed = (req, res, next) => {
  let und = new UndMed(req.body.descricao, req.body.status);
  und.salvarUnidadeMedida(und).then(und => {
    res.send(und);
  }).catch(err => {
    res.send(und);
  });
};
//------------------------------------------------------------------
const editarUndMed = (req, res, next) => {
  let und = new UndMed(req.body.descricao, req.body.status);
  und.id = req.body.id;
  und.atualizarUnidadeMedida(und).then(und => {
    res.send(und);
  }).catch(err => {
    res.send(und);
  });
};
//------------------------------------------------------------------
const listarUndMed = (req, res, next) => {
  let und = new UndMed();
  und.listarUnidadesMedida(und).then(und => {
    res.send(und);
  }).catch(err => {
    res.send(und);
  });
};
//------------------------------------------------------------------
const desativarUndMed = (req, res, next) => {
  let und = new UndMed();
  und.id = req.body.id;
  und.desabilitarUnidadeMedida(und).then(und => {
    res.send(und);
  }).catch(err => {
    res.send(und);
  });
};

module.exports = { salvarUndMed, editarUndMed, listarUndMed, desativarUndMed };