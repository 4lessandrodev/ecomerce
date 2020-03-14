const CestaCompra = require('./../models/CestaCompraModel');

//---------------------------------------------------------------------------
const salvarCestaCompra = (req, res, next) => {
  let cestaCompra = new CestaCompra(req.body.id_cesta, req.body.id_compra);
  cestaCompra.salvarCestaCompra(cestaCompra).then(cestaCompra => {
    res.send(cestaCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------
const editarCestaCompra = (req, res, next) => {
  let cestaCompra = new CestaCompra(req.body.id_cesta, req.body.id_compra);
  cestaCompra.id = req.body.id;
  cestaCompra.atualizarCestaCompra(cestaCompra).then(cestaCompra => {
    res.send(cestaCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------
const excluirCestaCompra = (req, res, next) => {
  let cestaCompra = new CestaCompra();
  cestaCompra.id = req.body.id;
  cestaCompra.excluirCestaCompra(cestaCompra).then(cestaCompra => {
    res.send(cestaCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------
const listarCestaCompra = (req, res, next) => {
  let cestaCompra = new CestaCompra();
  cestaCompra.listarCestaCompra(cestaCompra).then(cestasCompra => {
    res.send(cestasCompra);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------
module.exports = { salvarCestaCompra, editarCestaCompra, excluirCestaCompra, listarCestaCompra };