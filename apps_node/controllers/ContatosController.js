const Mensagem = require('./../models/ContatoModel');



//--------------------------------------------------------------------------------
const renderizar = (req, res, next, mensagens) => {
  let logado = (req.session.user != undefined);
  res.render('admin/mensagem', {
    logado,
    data: '',
    navbar: true,
    pagina: 'Mensagens Recebidas',
    btnLabel: 'Voltar',
    mensagens,
    
    btn: {
      label: 'Voltar',
      classe: '',
      classe2: 'display-none',
      caminho: '/admin'
    }
  });
};
//--------------------------------------------------------------------------------
const salvarMensagem = (req, res, next) => {
  let logado = (req.session.user != undefined);
  let mensagem = new Mensagem(req.body.nome, req.body.email, req.body.mensagem);
  mensagem.enviarMensagem(mensagem).then(mensagem => {
    res.render('contact', { success: 'Mensagem enviada com sucesso!', body:{}, logado });
  }).catch(err => {
    console.log(err.message);
    res.send('contact', { error: `ERRO: ${err.message}`, body: req.body });
  });
};
//--------------------------------------------------------------------------------
const marcarComoLida = (req, res, next) => {
  let mensagem = new Mensagem();
  mensagem.id = req.body.id;
  mensagem.marcarComoLida(mensagem).then(mensagem => {
    res.send(mensagem);
  }).catch(err => {
    console.log(err.message);
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
    console.log(err.message);
    res.send(err.message);
  });
};
//--------------------------------------------------------------------------------
const listarMensagens = (req, res, next) => {
  let mensagem = new Mensagem();
  mensagem.listarMensagens(mensagem).then(mensagens => {
    renderizar(req, res, next, mensagens);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};



module.exports = { salvarMensagem, marcarComoLida, excluirMensagem, listarMensagens };