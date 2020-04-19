const PlanoCompra = require('./../models/PlanoCompraModel');

//-------------------------------------------------------------------
const salvarPlanoCompra = (req, res, next) => {
  let plano = new PlanoCompra(req.body.id_plano, req.body.id_compra);
  plano.salvarPlanoCompra(plano).then(plano => {
    res.send(plano);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const editarPlanoCompra = (req, res, next) => {
  let plano = new PlanoCompra(req.body.id_plano, req.body.id_compra);
  plano.id = req.body.id;
  plano.atualizarPlanoCompra(plano).then(plano => {
    res.send(plano);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const listarPlanoCompra = (req, res, next) => {
  let plano = new PlanoCompra();
  plano.listarPlanoCompra(plano).then(plano => {
    res.send(plano);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------
const excluirPlanoCompra = (req, res, next) => {
  let plano = new PlanoCompra();
  plano.id = req.body.id;
  plano.excluirPlanoCompra(plano).then(plano => {
    res.send(plano);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};

module.exports = { salvarPlanoCompra, editarPlanoCompra, listarPlanoCompra, excluirPlanoCompra, renderizarPaginaAdminPlanos };