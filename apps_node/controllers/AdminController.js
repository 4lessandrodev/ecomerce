const Inscricao = require('../models/InscricaoModel');
const Mensagens = require('../models/ContatoModel');
const DashBoard = require('../models/DashboardModel');
const Assinaturas = require('../models/PlanoCompraModel');
const Status = require('../models/StatusPedidoModel');
const Pedido = require('../models/PedidoModel');


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
const relatorioPedidos = (req, res, next) => {
  let logado = (req.session.user != undefined);
  async function listar() {
    try {
      let pedido = new Pedido();
      let pedidos = await pedido.listarRelatorioDePedidos(pedido);
      
      let itens = [];
      for (let pedi of pedidos) {
        pedi.itens = [];
        for (let i = 0; i < pedidos.length; i++) {
          if (pedi.pedido == pedidos[i].pedido) {
            pedi.itens.push(`0${pedidos[i].quantidade_produto} - ${pedidos[i].produto}`);
          }
        }
        
        itens.push(pedi);
        
      }
      
      let listaDePedidosUnicos = [];
      for (let i = 1; i < itens.length; i++) {
        if (i == 1) {
          listaDePedidosUnicos.push(itens[i]);
        }else if (itens[i].pedido != itens[i - 1].pedido) {
          listaDePedidosUnicos.push(itens[i]);
        }
      }
      pedidos = listaDePedidosUnicos;
      
      
     
      
      res.render('admin/relatorio_pedidos', {
        data: '',
        navbar: true,
        logado,
        pedidos,
        pagina: 'Relatório',
        btnLabel: 'Voltar',
        assinaturas:[],
        btn: {
          label: 'Voltar',
          classe: '',
          classe2: 'display-none',
          caminho: '/admin'
        }
      });
      
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
    
  }
  listar();
};
//------------------------------------------------------------------------------------------------------
const relatorioEntregas = (req, res, next) => {
  let logado = (req.session.user != undefined);
  async function listar() {
    try {
      let pedido = new Pedido();
      let pedidos = await pedido.listarRelatorioDeProdutosEmPedidos(pedido);
      res.render('admin/relatorio_entregas', {
        data: '',
        navbar: true,
        logado,
        pedidos,
        pagina: 'Relatório',
        btnLabel: 'Voltar',
        assinaturas:[],
        btn: {
          label: 'Voltar',
          classe: '',
          classe2: 'display-none',
          caminho: '/admin'
        }
      });
      
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
    
  }
  listar();
};
//------------------------------------------------------------------------------------------------------
const relatorioAssinantes = (req, res, next) => {
  async function listar() {
    try {
      let assinatura = new Assinaturas();
      let logado = (req.session.user != undefined);
      let assinaturas = await assinatura.listarPlanoCompra();
      res.render('admin/relatorio_assinantes', {
        data: '',
        navbar: true,
        pagina: 'Relatório',
        btnLabel:'Voltar',
        btn: {
          label: 'Voltar',
          classe: '',
          classe2: 'display-none',
          caminho: '/admin'
        },
        logado,
        assinaturas
      }); 
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  listar();
};
//------------------------------------------------------------------------------------------------------
const assinaturaSelecionada = (req, res, next) => {
  let logado = (req.session.user != undefined);
  async function listar() {
    try {
      let plan = new Assinaturas();
      let status = new Status();
      plan.id = req.params.id;
      let plano = await plan.selecionarPlanoCompra(plan);
      let cestas = await plan.listarCestasDoPlano(plan);
      let statusPedido = await status.listarStatus();
      res.render('admin/assinatura-selecionada', {
        data: '',
        navbar: true,
        pagina: 'Relatório',
        btnLabel: 'Voltar',
        btn: {
          label: 'Voltar',
          classe: '',
          classe2: 'display-none',
          caminho: '/admin/relatorio-assinantes'
        },
        logado,
        plano:plano[0],
        cestas,
        statusPedido
      }); 
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  listar();
};
//------------------------------------------------------------------------------------------------------
const lancarCestaEntregue = (req, res, next) => {
  async function salvar() {
    try {
      let plan = new Assinaturas();
      let resultado = await plan.lancarCestaEntregue(req.body.id);
      res.send(resultado);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  salvar();
};
//------------------------------------------------------------------------------------------------------
const alterarStatusPlano = (req, res, next) => {
  async function alterar(){
    try {
      let assinatura = new Assinaturas();
      assinatura.id = req.body.id_plano;
      assinatura.status = req.body.id_status;
      let resultado = await assinatura.atualizarStatusPlanoCompra(assinatura);
      res.send(resultado);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  alterar();
};
//------------------------------------------------------------------------------------------------------




//Metodos exportados 
module.exports = {
  listarInscricoes,
  listarMensagens,
  listarPainel,
  autenticar,
  relatorioEntregas,
  relatorioAssinantes,
  relatorioPedidos,
  assinaturaSelecionada,
  lancarCestaEntregue,
  alterarStatusPlano
};