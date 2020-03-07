const Pedido = require('./../models/PedidoModel');

//id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, retirar_na_loja = 0, status = 1
const salvarPedido = (req, res, next) => {
  let pedido = new Pedido(req.body.id_compras, req.body.ecobag_adicional, req.body.id_tipo_pagamento, req.body.anotacoes, req.body.retirar_na_loja, req.body.status);
  pedido.salvarPedido(pedido).then(pedido => {
    res.send(pedido);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------
const editarPedido = (req, res, next) => {
  let pedido = new Pedido(req.body.id_compras, req.body.ecobag_adicional, req.body.id_tipo_pagamento, req.body.anotacoes, req.body.retirar_na_loja, req.body.status);
  pedido.id = req.body.id;
  pedido.atualizarPedido(pedido).then(pedido => {
    res.send(pedido);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------
const excluirPedido = (req, res, next) => {
  let pedido = new Pedido(req.body.id_compras, req.body.ecobag_adicional, req.body.id_tipo_pagamento, req.body.anotacoes, req.body.retirar_na_loja, req.body.status);
  pedido.id = req.body.id;
  pedido.excluirPedido(pedido).then(pedido => {
    res.send(pedido);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------
const listarPedidos = (req, res, next) => {
  let pedido = new Pedido();
  pedido.listarPedidos(pedido).then(pedidos => {
    res.send(pedidos);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------


module.exports = { salvarPedido, editarPedido, excluirPedido, listarPedidos };