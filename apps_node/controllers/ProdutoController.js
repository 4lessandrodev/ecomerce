const xxx = require('model');


const salvar = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.salvar().then(xx => {

  }).catch(err => {

  });
};


const editar = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.editar().then(xx => {

  }).catch(err => {

  });
};

const excluir = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.excluir().then(xx => {

  }).catch(err => {

  });
};

const listar = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.listar().then(xx => {

  }).catch(err => {

  });
};

const desativar = (req, res, next) => {
  let x = new xxx(req, req, req, req);
  x.desativar().then(xx => {

  }).catch(err => {

  });
};

module.exports = { salvar, editar, excluir, listar, desativar };