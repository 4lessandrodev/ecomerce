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
const listarTodasRegioes = (req, res, next) => {
  let regiao = new Regiao();
  regiao.listarTodasRegioes(regiao).then(regioes => {
    res.send(regioes);
  }).catch(err => {
    res.send(err.message);
  });
};
//----------------------------------------------------------------
const listarRegioesAtivas = (req, res, next) => {
  let regiao = new Regiao();
  regiao.listarRegioesAtivas(regiao).then(regioes => {
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

module.exports = { salvarRegiao, editarRegiao, listarTodasRegioes, desativarRegiao, listarRegioesAtivas };