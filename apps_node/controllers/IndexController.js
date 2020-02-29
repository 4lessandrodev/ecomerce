var Inscricao = require('../models/InscricaoModel');
var MensagemContato = require('../models/ContatoModel');


//------------------------------------------------------------------------------------------------------
const inscrever = (req, res, next) => {
  inscricao = new Inscricao(req.body.email);
  inscricao.salvarInscricao(inscricao).then(resposta => {
    res.send({ resposta, mensagem: null });
  }).catch(err => {
    res.send({ mensagem: err.message });
  });
};
//------------------------------------------------------------------------------------------------------

const enviarMensagem = (req, res, next) => {
  let mensagem = new MensagemContato(req.body.nome, req.body.email, req.body.mensagem);
  mensagem.enviarMensagem(mensagem).then(resposta => {
    res.send(resposta);
  }).catch(err => {
    res.send(err.message);
  });
};

//------------------------------------------------------------------------------------------------------
module.exports = { inscrever, enviarMensagem };