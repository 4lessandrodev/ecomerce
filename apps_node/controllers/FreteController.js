const Frete = require('./../models/FreteModel');

//------------------------------------------------------------------------
const salvarFrete = (req, res, next) => {
  let frete = new Frete(req.body.id_origem, req.body.id_destino, req.body.preco);
  frete.salvarFrete(frete).then(frete => {
    res.send(frete);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const editarFrete = (req, res, next) => {
  let frete = new Frete(req.body.id_origem, req.body.id_destino, req.body.preco);
  frete.id = req.body.id;
  frete.atualizarFrete(frete).then(frete => {
    res.send(frete);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const desabilitarFrete = (req, res, next) => {
  let frete = new Frete();
  frete.id = req.body.id;
  frete.tabela_excluida = 1;
  frete.desabilitarFrete(frete).then(frete => {
    res.send(frete);
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------
const listarFretes = (req, res, next) => {
  let frete = new Frete();
  frete.listarFretes(frete).then(fretes => {
    res.send(fretes);
  }).catch(err => {
    res.send(err.message);
  });
};

module.exports = { salvarFrete, editarFrete, desabilitarFrete, listarFretes };