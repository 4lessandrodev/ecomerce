const Mensagem = require('./../models/ContatoModel');

//--------------------------------------------------------------------------------
const salvarMensagem = (req, res, next) => {
  let mensagem = new Mensagem(req.body.nome, req.body.email, req.body.mensagem);
  mensagem.enviarMensagem(mensagem).then(mensagem => {
    res.send(mensagem);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const marcarComoLida = (req, res, next) => {
  let mensagem = new Mensagem();
  mensagem.id = req.body.id;
  mensagem.marcarComoLida(mensagem).then(mensagem => {
    res.send(mensagem);
  }).catch(err => {
    res.send(err.mensagem);
  });
};
//--------------------------------------------------------------------------------
const excluirMensagem = (req, res, next) => {
  let mensagem = new Mensagem();
  mensagem.id = req.body.id;
  mensagem.excluirMensagem(mensagem).then(mensagem => {
    res.send(mensagem);
  }).catch(err => {
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const listarMensagens = (req, res, next) => {
  let mensagem = new Mensagem();
  mensagem.listarMensagens(mensagem).then(mensagens => {
    res.send(mensagens);
  }).catch(err => {
    res.send(err.message);
  });
};



module.exports = { salvarMensagem, marcarComoLida, excluirMensagem, listarMensagens };