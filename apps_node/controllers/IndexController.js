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





//------------------------------------------------------------------------------------------------------
const renderizar = (req, res, next, produtos = [], cestas = []) => {
  let logado = (req.session.user != undefined);
  res.render('index', {
    logado,
    produtos,
    cestas,
    
    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
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
  //res.send(cesta);
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
  produto.listarProdutosEspeciaisAtivos(produto).then(produtos => {
    cesta.listarCestasAtivas(cesta).then(cestas => {
      renderizar(req, res, next, produtos, cestas);
    });
  }).catch(err => {
    console.log(err);
    res.send(err.message);
  });
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
const listarCestaSelecionada = (req, res, next) => {
  let cesta = new Cesta();
  cesta.id = req.params.id;
  let produto = new Produto();
  let produtosDeCesta = new ProdutosDeCesta(null, cesta.id);
  cesta.listarCestaEspecifica(cesta).then(cesta => {
    produto.listarTodosProdutos(produto).then(produtos => {
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
    res.send(resposta);
  }).catch(err => {
    res.send(err.message);
  });
  
};
//------------------------------------------------------------------------------------------------------
const addCestaNoCarrinho = (req, res, next) => {
  //id_cesta, id_compra, quantidade, preco_unitario, produtos
  
  let cestaCompra = new CestaCompra(req.body._id_cesta, req.body._id_compra, req.body._quantidade, req.body._preco_unitario, req.body._produtos);
  req.session.id_compra = req.body._id_compra;
  cestaCompra.salvarCestaCompra(cestaCompra).then(resposta => {
    res.send(resposta);
  }).catch(err => {
    res.send(err.message);
  });
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
  
  console.log(usuarioLogado);
  
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
                  //5.00 adicional cobrado por cada ecobag
                  let total = total_produto + total_cesta + parseFloat(fretes[0].preco) + 5;
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
//id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, retirar_na_loja = 0, status = 1
const salvarPedido = (req, res, next) => {
  if (req.session.user !== undefined) {
    let pedido = new Pedido(req.body._id_compras, req.body._ecobag_adicional, req.body._id_tipo_de_pagamento, req.body._anotacoes, req.body._retirar_na_loja, req.body._status);
    pedido.salvarPedido(pedido).then(result => {
      req.session.id_compra = undefined;
      res.send(result);
    }).catch(err => {
      console.log(err.message);
      res.send(err.message);
    });
  } else {
    res.redirect('/login');
  }
};

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
  salvarPedido
};