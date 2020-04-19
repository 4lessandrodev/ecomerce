const PacotePlanoModel = require('../models/PacotesPlanosModel');
const CestaModel = require('../models/CestaModel');

//-------------------------------------------------------------------
const renderizarPaginaAdminPlanos = (req, res, cestas, planos) => {
  let logado = (req.session.user != undefined);
  res.render('admin/planos', {

    logado,
    data: '',
    navbar: true,
    pagina: 'Planos',
    btnLabel: 'Voltar',
    cestas,
    planos,

    btn: {
      label: 'Novo',
      classe: '',
      classe2: 'display-none',
      caminho: ''
    }
  });
};
//-------------------------------------------------------------------
const salvarPacotePlano = (req, res) => {
  let pacote = new PacotePlanoModel(
    req.body.descricao, req.body.titulo, req.body.id_cesta, req.body.preco, req.body.quantidade_cestas, req.body.status,
    req.body.plano_excluido, req.body.regulamento
  );
  async function salvar() {
    try {
      let resultado = await pacote.salvarPacote(pacote);
      res.redirect('/admin/planos');
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  salvar();
};
//-------------------------------------------------------------------
const paginaPlanos = (req, res) => {
  let cesta = new CestaModel();
  let pacote = new PacotePlanoModel();
  pacote.plano_excluido = 0;

  async function listar() {
    try {
      let cestas = await cesta.listarDescricaoECodigoCestas();
      let pacotes = await pacote.listarTodosPacotesPlanos(pacote);
      renderizarPaginaAdminPlanos(req, res, cestas, pacotes);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  listar();
};

module.exports = {
  paginaPlanos,
  salvarPacotePlano
};