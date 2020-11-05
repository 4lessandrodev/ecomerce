var Inscricao = require('../models/InscricaoModel');
const Produto = require('./../models/ProdutoModel');
const Cesta = require('./../models/CestaModel');
const Regioes = require('./../models/RegiaoModel');
const ProdutosDeCesta = require('./../models/ProdutosParaCestaModel');
const Compra = require('./../models/CompraModel');
const ProdutoCompra = require('./../models/ProdutoCompraModel');
const CestaCompra = require('./../models/CestaCompraModel');
const usuarioController = require('./../controllers/UsuarioController');
const Cliente = require('./../models/ClienteModel');
const Loja = require('./../models/LojaModel');
const Frete = require('./../models/FreteModel');
const FormasPagamento = require('./../models/FormaDePagamentoModel');
const Pedido = require('./../models/PedidoModel');
const pedidoController = require('./../controllers/PedidosController');
const enviarEmail = require('./../services/enviarEmail');
const Estoque = require('./../models/EstoqueProdutoModel');
const PlanoModel = require('./../models/PacotesPlanosModel');
const PlanoCompraModel = require('./../models/PlanoCompraModel');
const UsuarioModel = require('./../models/UsuarioModel');
const ObservacoesModel = require('./../models/ObservacaoModel');

//------------------------------------------------------------------------------------------------------
const renderizar = (req, res, next, produtos = [], cestas = [], planos = []) => {
  let logado = (req.session.user != undefined);
  res.render('index', {
    logado,
    produtos,
    cestas,
    planos,
    
    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaDeAssinaturasDoCliente = (req, res, next, assinaturas = []) => {
  let logado = (req.session.user != undefined);
  res.render('minhas-assinaturas', {
    logado,
    assinaturas
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarAssinaturaSelecionada = (req, res, next, assinatura = [], entregas = [], observacoes = []) => {
  let logado = (req.session.user != undefined);
  res.render('minha-assinatura-selecionada', {
    logado,
    assinatura:assinatura[0],
    entregas,
    observacoes
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaDePedidosDoCliente = (req, res, pedidos = []) => {
  let logado = (req.session.user != undefined);
  res.render('meus-pedidos', {
    logado,
    pedidos
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaDePedidoSelecionado = (req, res, pedidos = []) => {
  let logado = (req.session.user != undefined);
  res.render('meu-pedido-selecionado', {
    logado,
    pedidos
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaCestas = (req, res, next, produtos = [], cestas = []) => {
  let logado = (req.session.user != undefined);
  res.render('cestas', {
    logado,
    produtos,
    cestas,
    
    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: 'display-none',
      caminho: '/admin'
    }
  });
};
//------------------------------------------------------------------------------------------------------
//Rota para cesta selecionada
const renderizarPaginaCestaSelecionada = (req, res, next, cesta = [], produtos = [], produtos_da_cesta = []) => {
  //res.send(produtos_da_cesta);
  //res.send(produtos);
  let logado = (req.session.user != undefined);
  res.render('cesta-selecionada', {
    logado,
    rotulo: 'Cesta Selecionada',
    cesta,
    produtos,
    produtos_da_cesta
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaCadastroUsuario = (req, res, next, regioes = []) => {
  let logado = (req.session.user != undefined);
  res.render('register', {
    logado,
    body: req.body,
    regioes
  });
};
//------------------------------------------------------------------------------------------------------
const inscrever = (req, res, next) => {
  inscricao = new Inscricao(req.body.email);
  inscricao.salvarInscricao(inscricao).then(resposta => {
    res.redirect('/');
  }).catch(err => {
    res.redirect('/');
  });
};
//------------------------------------------------------------------------------------------------------
const renderizarPaginaProdutoSelecionado = (req, res, next, produto = [], indicacoes = []) => {
  let logado = (req.session.user != undefined);
  res.render('produto-selecionado', {
    logado,
    rotulo: 'Produto Selecionado',
    produto,
    indicacoes
  });
};
//------------------------------------------------------------------------------------------------------
//RENDERIZAR CARRINHO COM OS ITENS 
const renderizarPaginaCarrinho = (req, res, next, frete, total = 0, cliente = {}, formaPagamento = [], produtos = [], cestas = [], enderecos = []) => {
  //res.send(enderecos);
  let logado = (req.session.user != undefined);
  
  res.render('carrinho', {
    logado,
    rotulo: 'Carrinho',
    frete,
    total,
    cliente,
    formaPagamento,
    produtos,
    cestas,
    enderecos,
    carrinhoVazio:false
  });
};
//------------------------------------------------------------------------------------------------------
// RENDERIZAR CARRINHO VAZIO 
const renderizarPaginaCarrinhoVazio = (req, res, next, frete=0, total = 0, cliente = {}, formaPagamento = [], produtos = [], cestas = [], enderecos = []) => {
  //res.send(enderecos);
  let logado = (req.session.user != undefined);
  
  res.render('carrinho', {
    logado,
    rotulo: 'Carrinho',
    frete,
    total,
    cliente,
    formaPagamento,
    produtos,
    cestas,
    enderecos,
    carrinhoVazio:true
  });
};
//------------------------------------------------------------------------------------------------------
const carregarIndex = (req, res, next) => {
  let produto = new Produto();
  let cesta = new Cesta();
  produto.produto_especial = 1;
  
  let plano = new PlanoModel();
  plano.status = 1;
  plano.excluido = 0;
  
  async function listar() {
    try {
      let cestas = await cesta.listarCestasAtivas(cesta);
      let produtos = await produto.listarProdutosEspeciaisAtivos(produto);
      let planos = await plano.listarPacotesPlanosAtivos(plano);
      renderizar(req, res, next, produtos, cestas, planos);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  }
  listar();
};
//------------------------------------------------------------------------------------------------------
const carregarMercearia = (req, res, next) => {
  let produto = new Produto();
  let cesta = new Cesta();
  produto.produto_especial = 1;
  produto.listarProdutosEspeciaisAtivos(produto).then(produtos => {
    cesta.listarCestasAtivas(cesta).then(cestas => {
      renderizarPaginaCestas(req, res, next, produtos, cestas);
    });
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const carregarCadastro = (req, res, next) => {
  let regiao = new Regioes();
  regiao.listarRegioesAtivas(regiao).then(regioes => {
    renderizarPaginaCadastroUsuario(req, res, next, regioes);
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const carregarPerfil = (req, res, next) => {
  let regiao = new Regioes();
  let cliente = new Cliente();

  cliente.id_usuario = req.session.user.id;

  regiao.listarRegioesAtivas(regiao).then(regioes => {
    cliente.selecionarClienteParaCarrinho(cliente).then(user => {
      
      res.render('dados-usuario', { logado: true, user: user[0], regioes });

    }).catch(err => {
      console.log(err);
      res.send(err.message);
    });
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const atualizarPerfil = (req, res, next) => {
  let cliente = new Cliente(req.session.user.id, req.body.phone, req.body.nome, req.body.cep,
    req.body.cidade, req.body.estado, req.body.endereco, req.body.codigo_ibge, req.body.id_regiao, req.body.bairro);

    cliente.atualizarCliente(cliente).then(user => {
      
      res.redirect('/perfil');

  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const listarCestaSelecionada = (req, res, next) => {
  let cesta = new Cesta();
  cesta.id = req.params.id;
  let produto = new Produto();
  let produtosDeCesta = new ProdutosDeCesta(null, cesta.id);
  cesta.listarCestaEspecifica(cesta).then(cesta => {
    produto.listarTodosProdutosAdicionais(produto).then(produtos => {
      produtosDeCesta.listarDescricaoProdutosDeUmaCestaEspecifica(produtosDeCesta).then(produtos_da_cesta => {
        renderizarPaginaCestaSelecionada(req, res, next, cesta[0], produtos, produtos_da_cesta);
      }).catch(err => {
        res.send(err.message);
      });
    }).catch(err => {
      res.send(err.message);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const exibirProdutoSelecionadoNaHome = (req, res, next) => {
  let produto = new Produto();
  produto.id = req.params.id;
  produto.listarProdutoSelecionado(produto).then(produtoSelecionado => {
    produto.abrirProdutosIndicados(produto).then(indicacoes => {
      renderizarPaginaProdutoSelecionado(req, res, next, produtoSelecionado[0], indicacoes);
      //res.send(produto);
    });
  }).catch(err => {
    res.send(err.message);
  });
};
//------------------------------------------------------------------------------------------------------
const iniciarCompra = (req, res, next) => {
  //let compra = new Compra(req.body.id_cliente);
  let usuarioLogado = (req.session.user != undefined);
  if (usuarioLogado) {
    if (req.session.user != undefined) {
      let compra = new Compra(req.session.user.id);
      compra.salvarCompra(compra).then(id_compra => {
        res.send(id_compra);
      }).catch(err => {
        res.send(err.message);
      });
    }
  }
};
//------------------------------------------------------------------------------------------------------
//Adicionar produto no carrinho 
const addProdutoNoCarrinho = (req, res, next) => {
  let produtoCompra = new ProdutoCompra(req.body._id_produto, req.body._id_compra, req.body._quantidade, req.body._preco_unitario);
  req.session.id_compra = req.body._id_compra;
  produtoCompra.salvarProdutoCompra(produtoCompra).then(resposta => {
    
    lancarSaidaDeEstoqueProduto(resposta, req, res, next).then(result => {
      
      // A função finaliza no lançamento de estoque
      
    }).catch(err => {
      res.send(err.message);
    });
    
  }).catch(err => {
    res.send(err.message);
  });
  
};
//------------------------------------------------------------------------------------------------------
const addCestaNoCarrinho = async (req, res, next) => {
  //id_cesta, id_compra, quantidade, preco_unitario, produtos
  let cestaCompra = new CestaCompra(req.body._id_cesta, req.body._id_compra, req.body._quantidade, req.body._preco_unitario, req.body._produtos);
  req.session.id_compra = req.body._id_compra;
  try {
   
    let resposta = await cestaCompra.salvarCestaCompra(cestaCompra);
    let result = await lancarSaidaDeEstoqueProdutosDeCesta(resposta, req, res, next);
    
    //A função finaliza no lançamento de estoque
  } catch (error) {
    
  }
};
//------------------------------------------------------------------------------------------------------
const sair = (req, res, next) => {
  //Realizar o logout do site
  req.session.user = undefined;
  req.body = {};
  res.redirect('/login');
};
//------------------------------------------------------------------------------------------------------
const verificarUsuarioLogado = (req, res, next) => {
  let usuarioLogado = (req.session.user != undefined);
  if (usuarioLogado) {
    if (isNaN(req.session.id)) {
      res.redirect('/login');  
    } else {
      return usuarioLogado;
    }
  } else {
    res.redirect('/login');
  }
};
//------------------------------------------------------------------------------------------------------
//CARREGAR CARRINHO 
const carregarCarrinhoDeCompras = (req, res, next) => {
  let usuarioLogado = (req.session.user != undefined);
  
  if (usuarioLogado) {
    
    let id_usuario = req.session.user.id;
    
    if (req.session.id_compra == undefined) {
      //Carrinho vazio 
      renderizarPaginaCarrinhoVazio(req, res, next);
      
    } else {
      
      let id_compra = req.session.id_compra;
      
      let formaPagamento = new FormasPagamento();
      let cliente = new Cliente();
      let loja = new Loja();
      let frete = new Frete();
      let cestaCompra = new CestaCompra();
      let produtoCompra = new ProdutoCompra();
      
      produtoCompra.id_compra = id_compra;
      cestaCompra.id_compra = id_compra;
      cliente.id_usuario = id_usuario;
      
      produtoCompra.listarProdutosDoCarrinho(produtoCompra, id_usuario).then(produtos => {
        cestaCompra.listarCestasDoCarrinho(cestaCompra, id_usuario).then(cestas => {
          formaPagamento.listarTiposPagamentoParaCarrinho(formaPagamento).then(formasPagamento => {
            cliente.selecionarClienteParaCarrinho(cliente).then(clientes => {
              frete.id_destino = clientes[0].id_regiao;
              loja.listarEnderecosDeLojasParaCarrinho(loja).then(enderecos => {
                frete.listarFretesParaCarrinho(frete).then(fretes => {
                  
                  const totalizar = (total, valor) => {
                    return total + parseFloat(valor.subtotal);
                  };
                  let total_produto = produtos.reduce(totalizar, 0);
                  let total_cesta = cestas.reduce(totalizar, 0);
                  //6.00 adicional cobrado por cada ecobag
                  let total = total_produto + total_cesta + parseFloat(fretes[0].preco) + 6;
                  total = total.toFixed(2);
                  
                  renderizarPaginaCarrinho(req, res, next, fretes[0], total, clientes[0], formasPagamento, produtos, cestas, enderecos, vazio = false);
                }).catch(err => {
                  console.log(err.message);
                  res.send(err.message);
                });
              }).catch(err => {
                console.log(err.message);
                res.send(err.message);
              });
            }).catch(err => {
              console.log(err.message);
              res.send(err.message);
            });
          }).catch(err => {
            console.log(err.message);
            res.send(err.message);
          });
        }).catch(err => {
          console.log(err.message);
          res.send(err.message);
        });
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    }
  } else {
    //Carrinho vazio
    renderizarPaginaCarrinhoVazio(req, res, next);
  }
};
//------------------------------------------------------------------------------------------------------
//id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, retirar_na_loja = 0, status = 1, total = 0
const salvarPedido = (req, res, next) => {
  if (req.session.user !== undefined) {

    //id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, retirar_na_loja = 0, status = 1, total = 0)
    let pedido = new Pedido(
      req.body._id_compras, req.body._ecobag_adicional, req.body._id_tipo_de_pagamento,
      req.body._anotacoes, req.body._retirar_na_loja, req.body._status, req.body._total);
    pedido.salvarPedido(pedido).then(result => {
      
      //Alterar status da compra para pedido fechado / tb_compra = pedido_aberto = 0
      let compra = new Compra(req.session.user.id);
      compra.id = req.session.id_compra;
      compra.pedido_aberto = 0;
      
      compra.atualizarCompra(compra).then(result => {
        
        
        req.session.id_compra = undefined;
        //Enviar email de confirmação para o usuário que realizou a compra
        enviarEmail(req.session.user.email, 'Confirmação de pedido', req.body._email);
        
        res.send(result);
        
        
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    }).catch(err => {
      console.log(err.message);
      res.send(err.message);
    });
  } else {
    res.redirect('/login');
  }
};

//---------------------------------------------------------------------------------------------------------------------
//Lançar saida de estoque 
const lancarSaidaDeEstoqueProdutosDeCesta = async (resposta, req, res, next) => {
  
  
  let id_compra = req.session.id_compra;
  let produtos = req.body._produtos;
  let quantidade = req.body._quantidade;
  
  let ids_produtos = produtos.split(',');
  let qry = ``;
  // Criar uma query para lançar saida de estoque
  for (let id_produto of ids_produtos) {
    qry += `INSERT INTO tb_estoque (id_compra, id_produto, entrada, quantidade) VALUES(${id_compra}, ${id_produto}, 0, ${quantidade});`;
  }
  
  const estoque = new Estoque();
  
  let result = await estoque.lancarSaidaDeEstoque(qry);
  
  //Retornar com o número do pedido
  res.send(resposta);
  
};
//---------------------------------------------------------------------------------------------------------------------
//Lançar saida de produto
const lancarSaidaDeEstoqueProduto = async (resposta, req, res, next) => {
  
  let id_compra = req.session.id_compra;
  let id_produto = req.body._id_produto;
  let quantidade = req.body._quantidade;
  
  let qry = ``;
  // Criar uma query para lançar saida de estoque
  qry += `INSERT INTO tb_estoque (id_compra, id_produto, entrada, quantidade) VALUES(${id_compra}, ${id_produto}, 0, ${quantidade});`;
  
  const estoque = new Estoque();
  
  await estoque.lancarSaidaDeEstoque(qry);
  
  //Retornar com o número do pedido
  res.send(resposta);
  
};
//---------------------------------------------------------------------------------------------------------------------
//Limpar carrinho de compras excluindo tudo que já foi salvo 
const limparCarrinho = (req, res, next) => {
  const ID_COMPRA = req.session.id_compra;
  req.session.id_compra = undefined;
  
  let compras = new Compra();
  
  let qry = `
  DELETE FROM tb_estoque WHERE id_compra = ${ID_COMPRA};
  DELETE FROM tb_cestas_compra WHERE id_compra = ${ID_COMPRA};
  DELETE FROM tb_produtos_compra WHERE id_compra = ${ID_COMPRA};
  DELETE FROM tb_compras WHERE id = ${ID_COMPRA};
  `;
  
  compras.limparCarrinhoDeCompras(qry).then(result => {
    res.send(result);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//---------------------------------------------------------------------------------------------------------------------

const verPlano = (req, res, next) => {
  let logado = (req.session.user !== undefined);
  let plano = new PlanoModel();
  plano.id = req.params.id;
  async function listar() {
    try {
      let plan = await plano.listarPacotePlanoSelecionado(plano);
      res.render('plano-selecionado', {
        logado,
        plan:plan[0],
        rotulo:'Plano Selecionado'
      });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
  listar();
};

//---------------------------------------------------------------------------------------------------------------------
const assinarPlano = (req, res, next) => {
  async function assinar() {
    try {
      //constructor (id_plano, id_usuario, quantidade, preco_unitario, data_compra, status = 1)
      let compra = new PlanoCompraModel(req.body.id_plano, req.session.user.id, req.body.quantidade, req.body.preco_unitario);
      let resultado = await compra.salvarPlanoCompra(compra);
      res.send(resultado);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  assinar();
};
//---------------------------------------------------------------------------------------------------------------------
const listarPedidosDeCliente = (req, res, next) => {
  async function assinar() {
    try {

      const cliente = new Cliente();
      cliente.id_usuario = req.session.user.id;
      const pedido = new Pedido();
      const pedidos = await pedido.listarPedidosPeloCliente(cliente);

      renderizarPaginaDePedidosDoCliente(req, res, pedidos);

    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  assinar();
};
//---------------------------------------------------------------------------------------------------------------------
const verPedidoDoCliente = (req, res, next) => {
  async function assinar() {
    try {

      const cliente = new Cliente();
      cliente.id_usuario = req.session.user.id;
      const pedido = new Pedido();
      pedido.id = req.params.id;
      const pedidos = await pedido.pedidoSelecionadoPeloCliente(pedido, cliente);

      renderizarPaginaDePedidoSelecionado(req, res, pedidos);

    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  assinar();
};
//---------------------------------------------------------------------------------------------------------------------
const listarPlanosDoCliente = (req, res, next) => {
  async function listar() {
    try {
      const cliente = new Cliente();
      const assinatura = new PlanoCompraModel();
      cliente.id_usuario = req.session.user.id;
      const assinaturas = await assinatura.listarPlanoCompraCliente(cliente);

      renderizarPaginaDeAssinaturasDoCliente(req, res, next, assinaturas);

    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  listar();
};
//---------------------------------------------------------------------------------------------------------------------
const listarEntregasDoPlanosDoCliente = (req, res, next) => {
  async function listar() {
    try {
      const cliente = new Cliente();
      const assinatura = new PlanoCompraModel();
      const observacao = new ObservacoesModel();
      assinatura.id = req.params.id;
      observacao.id_plano_compra = req.params.id;

      cliente.id_usuario = req.session.user.id;
      const plano = await assinatura.selecionarPlanoCompra(assinatura);
      const entregas = await assinatura.listarCestasDoPlano(assinatura);
      const observacoes = await observacao.listar(observacao);

      renderizarAssinaturaSelecionada(req, res, next, plano, entregas, observacoes);

    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  listar();
};
//---------------------------------------------------------------------------------------------------------------------
const salvarObservacao = (req, res, next) => {
  async function salvar() {
    try {
      const observacao = new ObservacoesModel(req.body.observacao, req.body.id_plano_compra, req.session.user.id);

      const observacoes = await observacao.salvar(observacao);

      res.redirect(`/minhas-assinaturas/${observacao.id_plano_compra}`);

    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  salvar();
};
//---------------------------------------------------------------------------------------------------------------------
module.exports = {
  inscrever,
  carregarIndex,
  carregarMercearia,
  carregarCadastro,
  listarCestaSelecionada,
  exibirProdutoSelecionadoNaHome,
  iniciarCompra,
  addProdutoNoCarrinho,
  addCestaNoCarrinho,
  sair,
  verificarUsuarioLogado,
  carregarCarrinhoDeCompras,
  salvarPedido,
  limparCarrinho,
  verPlano,
  assinarPlano,
  carregarPerfil,
  atualizarPerfil,
  listarPedidosDeCliente,
  verPedidoDoCliente,
  listarPlanosDoCliente,
  listarEntregasDoPlanosDoCliente,
  salvarObservacao
};