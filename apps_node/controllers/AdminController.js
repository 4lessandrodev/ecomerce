const Inscricao = require('../models/InscricaoModel');
const Mensagens = require('../models/ContatoModel');
const DashBoard = require('../models/DashboardModel');


//AUTENTICAÇÃO DO USUÁRIO COMO ADMINISTRADOR 
//------------------------------------------------------------------------------------------------------
const autenticar = (req, res, next) => {
  let logado = (req.session.user != undefined);
  if (logado) {
    if (req.session.user.admin == 0) {
      res.redirect('/');
    } else {
      return true;
    }
  } else {
    res.redirect('/login');
  }
};
//------------------------------------------------------------------------------------------------------
const renderizarInscricoes = (req, res, next, inscricoes) => {
  let logado = (req.session.user != undefined);
  res.render('admin/inscricoes', {
    logado,
    data: '',
    navbar: true,
    pagina: 'Emails Inscritos',
    btnLabel: 'Voltar',
    inscricoes,

    btn: {
      label: 'Voltar',
      classe: '',
      classe2: 'display-none',
      caminho: '/admin'
    }
  });
};
//-----------------------------------------------------------------------------

//Renderizar a pagina principal de admin
const renderizarAdmin = (req, res, next, dados) => {
  let logado = (req.session.user != undefined);
  if (logado) {
    res.render('admin/index', {
      data: '',
      navbar: false,
      dados,
      logado
    });
  } else {
    res.redirect('/login');
  }
};
//------------------------------------------------------------------------------------------------------
//Metodo listar todos os emails salvos no banco de dados 
const listarInscricoes = (req, res, next) => {
  let logado = (req.session.user != undefined);
  //Criar um novo objeto inscricao de acordo com a classe
  let inscricao = new Inscricao();
  //chamar o metodo listar da classe inscricao
  inscricao.listarEmails().then(inscricoes => {
    //Enviar as inscricoes para o cliente, mensagem recebe nulo
    renderizarInscricoes(req, res, next, inscricoes);
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
module.exports = { listarInscricoes, listarMensagens, listarPainel, autenticar};