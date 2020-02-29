const Inscricao = require('../models/InscricaoModel');
const Mensagens = require('../models/ContatoModel');


//------------------------------------------------------------------------------------------------------
//Metodo listar todos os emails salvos no banco de dados 
const listarInscricoes = (req, res, next) => {
  //Criar um novo objeto inscricao de acordo com a classe
  let inscricao = new Inscricao();
  //chamar o metodo listar da classe inscricao
  inscricao.listarEmails().then(inscricoes => {
    //Enviar as inscricoes para o cliente, mensagem recebe nulo
    res.send({ inscricoes, mensagem: null });
  }).catch(err => {
    //Enviar um array vazio para o cliente, pois ocorreu algum erro, tambem enviar a mensagem com o erro
    res.send({ inscricoes: [], mensagem: err.message });
  });
};

//------------------------------------------------------------------------------------------------------
//Metodo para listar mensagens de usuarios 
const listarMensagens = (req, res, next) => {
  let mensagens = new Mensagens();
  mensagens.listarMensagens().then(mensagens => {
    res.send({ mensagens, mensagem: null });
  }).catch(err => {
    res.send({ mensagens: [], mensagem: err.message });
  });
};

//------------------------------------------------------------------------------------------------------

//Metodos exportados 
module.exports = { listarInscricoes, listarMensagens };