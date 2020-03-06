const Compra = require('./../models/CompraModel');

//------------------------------------------------------------------------
const salvarCompra = (req, res, next) => {
  let compra = new Compra(req.body.id_cliente);
  compra.salvarCompra(compra).then(compra => {
    res.send(compra);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const editarCompra = (req, res, next) => {
  let compra = new Compra(req.body.id_cliente, new Date(), req.body.pedido_aberto);
  compra.id = req.body.id;
  compra.atualizarCompra(compra).then(compra => {
    res.send(compra);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const excluirCompra = (req, res, next) => {
  let compra = new Compra();
  compra.id = req.body.id;
  compra.excluirCompra(compra).then(compra => {
    res.send(compra);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const listarCompras = (req, res, next) => {
  let compra = new Compra();
  compra.listarCompra(compra).then(compras => {
    res.send(compras);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarCompra, editarCompra, excluirCompra, listarCompras };