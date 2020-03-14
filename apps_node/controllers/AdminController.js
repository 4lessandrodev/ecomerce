const Inscricao = require('../models/InscricaoModel');
const Mensagens = require('../models/ContatoModel');
const DashBoard = require('../models/DashboardModel');




//------------------------------------------------------------------------------------------------------
//Renderizar a pagina principal de admin
const renderizarAdmin = (req, res, next, dados) => {
  res.render('admin/index', {
    data: '',
    navbar: false,
    dados
  });
};
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
    console.log(err.message);
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
    console.log(err.message);
    res.send({ mensagens: [], mensagem: err.message });
  });
};
//------------------------------------------------------------------------------------------------------
//Listar dados do dashboard da pagina de admin
const listarPainel = (req, res, next) => {
  let dash = new DashBoard();
  dash.buscarDadosDashBoardNoBD().then(dados => {
    renderizarAdmin(req, res, next, dados[0]);
  });
};
//------------------------------------------------------------------------------------------------------


//Metodos exportados 
module.exports = { listarInscricoes, listarMensagens, listarPainel };