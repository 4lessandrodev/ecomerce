const Pedido = require('./../models/PedidoModel');
const FormasPagamento = require('./../models/FormaDePagamentoModel');
const Cliente = require('./../models/ClienteModel');
const Loja = require('./../models/LojaModel');
const Frete = require('./../models/FreteModel');
const CestaCompra = require('./../models/CestaCompraModel');
const ProdutoCompra = require('./../models/ProdutoCompraModel');




const renderizarPaginaDePedidos = (req, res, next, cestas = [], produtos=[]) => {
  let logado = (req.session.user != undefined);
  res.render('admin/pedidos', {
    logado,
    data: '',
    navbar: true,
    pagina: 'Pedidos',
    btnLabel: 'Exportar',
    local: 'http://localhost:3000',
    cestas,
    produtos,
    
    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//-------------------------------------------------------------------------------------
//Renderizar pedido selecionado 
const renderizarPaginaDePedidoSelecionado = (req, res, next, frete = 0, total = 0, cliente = [], formaPagamento = [], produtosDaCesta=[], cestas=[], enderecos=[], produtos=[]) => {
  let logado = (req.session.user != undefined);
  res.render('admin/pedido-selecionado', {
    logado,
    data: '',
    navbar: true,
    pagina: 'Pedidos',
    btnLabel: 'Exportar',
    local: 'http://localhost:3000',
    cestas,
    produtos,
    cliente,
    frete,
    formaPagamento,
    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: '',
      caminho: '/admin'
    }
  });
};
//-------------------------------------------------------------------------------------
//id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, retirar_na_loja = 0, status = 1
const salvarPedido = (req, res, next) => {
  let pedido = new Pedido(req.body.id_compras, req.body.ecobag_adicional, req.body.id_tipo_pagamento, req.body.anotacoes, req.body.retirar_na_loja, req.body.status);
  pedido.salvarPedido(pedido).then(pedido => {
    res.send(pedido);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------
const editarPedido = (req, res, next) => {
  let pedido = new Pedido(req.body.id_compras, req.body.ecobag_adicional, req.body.id_tipo_pagamento, req.body.anotacoes, req.body.retirar_na_loja, req.body.status);
  pedido.id = req.body.id;
  pedido.atualizarPedido(pedido).then(pedido => {
    res.send(pedido);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------
const excluirPedido = (req, res, next) => {
  let pedido = new Pedido(req.body.id_compras, req.body.ecobag_adicional, req.body.id_tipo_pagamento, req.body.anotacoes, req.body.retirar_na_loja, req.body.status);
  pedido.id = req.body.id;
  pedido.excluirPedido(pedido).then(pedido => {
    res.send(pedido);
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------
const listarPedidos = (req, res, next) => {
  let pedido = new Pedido();
  pedido.listarResumoCestasVendidas(pedido).then(cestas => {
    pedido.listarResumoProdutosVendidos(pedido).then(produtos => {
      
      renderizarPaginaDePedidos(req, res, next, cestas, produtos);
      
    }).catch(err => {
      console.log(err.message);
      res.send(err.message);
    });
  }).catch(err => {
    console.log(err.message);
    res.send(err.message);
  });
};
//-------------------------------------------------------------------------------------
const listarPedidoEspecifico = (req, res, next) => {
  
  let formaPagamento = new FormasPagamento();
  let cliente = new Cliente();
  let loja = new Loja();
  let frete = new Frete();
  let cestaCompra = new CestaCompra();
  let produtoCompra = new ProdutoCompra();
  let pedido = new Pedido();
  let total;
  let endereco;

  pedido.id = req.params.id;
  pedido.selecionarIdsDosProdutosDeUmaCesta(pedido).then(result => {
    pedido.listarResumoCestasVendidas(pedido).then(cestas => {
      pedido.listarResumoProdutosVendidos(pedido).then(produtos => {
        let arrayDeCodigos = [];
        for (let r of result) {
          arrayDeCodigos.push(r.codigos);
        }
        let arrayDeCodigosString = arrayDeCodigos.toString();
        let arrayDeCodigosAux = arrayDeCodigosString.split();
        if (arrayDeCodigos == []) {
          renderizarPaginaDePedidoSelecionado(req, res, next, frete, total, clientes, formaPagamento, produtosDaCesta, cestas, endereco, produtos);
        } else {
          pedido.selecionarProdutosDeUmaCestaComprada(arrayDeCodigosString).then(produtosDaCesta => {
            renderizarPaginaDePedidoSelecionado(req, res, next, frete, total, cliente, formaPagamento, produtosDaCesta, cestas, endereco, produtos);
          });
        }
        // renderizarPaginaDePedidos(req, res, next, cestas, produtos);
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
};
//-------------------------------------------------------------------------------------


module.exports = { listarPedidoEspecifico, salvarPedido, editarPedido, excluirPedido, listarPedidos };