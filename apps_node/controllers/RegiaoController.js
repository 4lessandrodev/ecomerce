const Regiao = require('./../models/RegiaoModel');

//----------------------------------------------------------------
const salvarRegiao = (req, res, next) => {
  let regiao = new Regiao(req.body.escricao, req.body.status);
  regiao.salvarRegiao(regiao).then(regiao => {
    res.send(regiao);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const editarRegiao = (req, res, next) => {
  let regiao = new Regiao(req.body.escricao, req.body.status);
  regiao.id = req.body.id;
  regiao.atualizarRegiao(regiao).then(regiao => {
    res.send(regiao);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const listarRegioes = (req, res, next) => {
  let regiao = new Regiao();
  regiao.listarRegiao(regiao).then(regioes => {
    res.send(regioes);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const desativarRegiao = (req, res, next) => {
  let regiao = new Regiao(req.body.escricao, req.body.status);
  regiao.id = req.body.id;
  regiao.regiao_excluida = 1;
  regiao.desabilitarRegiao(regiao).then(regiao => {
    res.send(regiao);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------

module.exports = { salvarRegiao, editarRegiao, listarRegioes, desativarRegiao };