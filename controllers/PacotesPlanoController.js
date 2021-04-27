const PacotePlanoModel = require('./../models/PacotesPlanosModel');
const CestaModel = require('./../models/CestaModel');

//-------------------------------------------------------------------
const renderizarPaginaAdminPlanos = (req, res, cestas, planos) => {
     let logado = req.session.user != undefined;
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
               caminho: '',
          },
     });
};
//-------------------------------------------------------------------
const salvarPacotePlano = (req, res) => {
     let pacote = new PacotePlanoModel(
          req.body.descricao,
          req.body.titulo,
          req.body.id_cesta,
          req.body.preco,
          req.body.quantidade_cestas,
          req.body.status,
          req.body.plano_excluido,
          req.body.regulamento,
     );

     pacote.id = req.body.id;

     async function salvar() {
          try {
               let resultado = await pacote.salvarPacote(pacote);
               res.redirect('/admin/planos');
          } catch (error) {
               console.log(error);
               res.sendStatus(400);
          }
     }

     async function atualizar() {
          try {
               let resultado = await pacote.atualizarpacote(pacote);
               res.redirect('/admin/planos');
          } catch (error) {
               console.log(error);
               res.sendStatus(400);
          }
     }

     if (pacote.id == '' || pacote.id == undefined || pacote.id == null) {
          salvar();
     } else {
          atualizar();
     }
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
//-------------------------------------------------------------------
const deletarPlano = (req, res) => {
     let plano = new PacotePlanoModel();
     plano.id = req.body.id;
     plano.plano_excluido = 1;

     async function excluir() {
          try {
               let resultado = await plano.desabilitarpacote(plano);
               res.send(resultado);
          } catch (error) {
               console.log(error);
               res.sendStatus(400);
          }
     }
     excluir();
};

module.exports = {
     paginaPlanos,
     salvarPacotePlano,
     deletarPlano,
};
