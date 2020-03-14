const TipoPg = require('./../models/FormaDePagamentoModel');

//------------------------------------------------------------------------------------------------
const salvarTipoPg = (req, res, next) => {
  let tipoPg = new TipoPg(req.body.desconto, req.body.descricao_regras, req.body.descricao);
  tipoPg.salvarFormaPagamento(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------
const editarTipoPg = (req, res, next) => {
  let tipoPg = new TipoPg(req.body.desconto, req.body.descricao_regras, req.body.descricao);
  tipoPg.id = req.body.id;
  tipoPg.atualizarFormaPagamento(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------
const listarTodosTipoPg = (req, res, next) => {
  let tipoPg = new TipoPg();
  tipoPg.listarTodasFormasPagamento(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------
const listarTipoPgAtivo = (req, res, next) => {
  let tipoPg = new TipoPg();
  tipoPg.listarFormasPagamentoAtivas(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------
const desativarTipoPg = (req, res, next) => {
  let tipoPg = new TipoPg();
  tipoPg.id = req.body.id;
  tipoPg.tipo_pagamento_excluido = 1;
  tipoPg.desabilitarFormaPagamento(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};

module.exports = { salvarTipoPg, editarTipoPg, listarTipoPgAtivo, desativarTipoPg, listarTodosTipoPg };