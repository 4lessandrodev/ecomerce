const Loja = require('./../models/LojaModel');

//-------------------------------------------------------------------------------------------
const salvarLoja = (req, res, next) => {
  let loja = new Loja(req.body.razao_social, req.body.nome_fantasia, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.id_regiao, req.body.bairro, req.body.status);
  loja.salvarLoja(loja).then(loja => {
    res.send(loja);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const editarLoja = (req, res, next) => {
  let loja = new Loja(req.body.razao_social, req.body.nome_fantasia, req.body.cnpj_cpf, req.body.cep, req.body.cidade, req.body.estado, req.body.endereco, req.body.phone, req.body.email, req.body.id_regiao, req.body.bairro, req.body.status);
  loja.id = req.body.id;
  loja.atualizarLoja(loja).then(loja => {
    res.send(loja);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const desabilitarLoja = (req, res, next) => {
  let loja = new Loja();
  loja.loja_excluida = 1;
  loja.id = req.body.id;
  loja.desabilitarLoja(loja).then(loja => {
    res.send(loja);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const listarLojasAtivas = (req, res, next) => {
  let loja = new Loja();
  loja.listarLojasAtivas(loja).then(lojas => {
    res.send(lojas);
  }).catch(err => {
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------------
const listarTodasLojas = (req, res, next) => {
  let loja = new Loja();
  loja.listarTodasLojas(loja).then(lojas => {
    res.send(lojas);
  }).catch(err => {
    res.send(err.message);
  });
};


module.exports = { salvarLoja, editarLoja, desabilitarLoja, listarLojasAtivas, listarTodasLojas };