const TipoPg = require('./../models/FormaDePagamentoModel');

//------------------------------------------------------------------------------------------------
const salvarTipoPg = (req, res, next) => {
  let tipoPg = new TipoPg(req.body.desconto, req.body.descricao_regras, req.body.descricao);
  tipoPg.salvarFormaPagamento(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
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
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------
const listarTipoPg = (req, res, next) => {
  let tipoPg = new TipoPg();
  tipoPg.listarFormasPagamento(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------
const desativarTipoPg = (req, res, next) => {
  let tipoPg = new TipoPg();
  tipoPg.id = req.body.id;
  tipoPg.desabilitarFormaPagamento(tipoPg).then(tipoPg => {
    res.send(tipoPg);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarTipoPg, editarTipoPg, listarTipoPg, desativarTipoPg };