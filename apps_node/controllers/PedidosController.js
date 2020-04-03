const Pedido = require('./../models/PedidoModel');
const FormasPagamento = require('./../models/FormaDePagamentoModel');
const Cliente = require('./../models/ClienteModel');
const Loja = require('./../models/LojaModel');
const Frete = require('./../models/FreteModel');
const CestaCompra = require('./../models/CestaCompraModel');
const ProdutoCompra = require('./../models/ProdutoCompraModel');
const enviarEmail = require('./../services/enviarEmail');




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
// renderizarPaginaDePedidoSelecionado(req, res, next, numeroPedido, total, produtosDaCesta, produtos, dadosGerais);
const renderizarPaginaDePedidoSelecionado = (req, res, next, pedido, total = 0, produtosDaCesta=[], produtos=[], dadosGerais = []) => {
  let logado = (req.session.user != undefined);
  
  res.render('admin/pedido-selecionado', {
    logado,
    data: '',
    navbar: true,
    pagina: 'Pedidos',
    btnLabel: 'Exportar',
    local: 'http://localhost:3000',
    produtos,
    dadosGerais: dadosGerais[0],
    pedido,
    produtosDaCesta,
    total:total.toFixed(2),
    btn: {
      label: 'Voltar',
      classe: '',
      classe2: 'display-none',
      caminho: '/admin/pedido'
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
  
  let pedido = new Pedido();
  let total = 0;
  let numeroPedido = req.params.id;
  
  pedido.id = req.params.id;
  pedido.selecionarIdsDosProdutosDeUmaCesta(pedido).then(result => {
    pedido.listarProdutosVendidoSelecionado(pedido).then(produtos => {
      pedido.listarDadosGeraisDoPedido(pedido).then(dadosGerais => {
        pedido.calcularTotalDeCestasVendidasNoPedido(pedido).then(totalCesta => {
          pedido.calcularTotalDeProdutoVendidoNoPedido(pedido).then(totalProduto => {
            
            let totalcesta = (totalCesta[0].total_cesta == null) ? 0 : parseFloat(totalCesta[0].total_cesta);
            let totalproduto = (totalProduto[0].total_produto == null) ? 0 : parseFloat(totalProduto[0].total_produto);
            let totalFrete = (dadosGerais[0].retirar_na_loja == 0) ? parseFloat(dadosGerais[0].frete) : 0;
            
            //TOTAL 6.00 REFERE-SE AO PRECO DA ECOBAG
            total = totalcesta + totalproduto + totalFrete + 6;
            
            //Consultar produtos da cesta 
            //----------------------------------------------------------------------------
            let arrayDeCodigos = [];
            for (let r of result) {
              arrayDeCodigos.push(r.codigos);
            }

            let arrayDeCodigosString = arrayDeCodigos.toString();
            let arrayDeCodigosAux = [];

            arrayDeCodigosString = arrayDeCodigosString.split(',');
            for (let id of arrayDeCodigosString) {
              if (!isNaN(id)) {
                arrayDeCodigosAux.push(parseInt(id));
              }
            }


            // Verificar se existem produtos em alguma cesta que o cliente comprou
            if (result[0] != undefined){
              pedido.selecionarProdutosDeUmaCestaComprada(arrayDeCodigosString).then(retorno => {
                
                let resultado = [];

                for (let id of arrayDeCodigosAux) {
                  for (let item of retorno) {
                    if (id === item.id) {
                      if (item.qtd_venda == null) {
                        item.qtd_venda = 1;
                        resultado.push(
                          {
                            id: item.id,
                            descricao: item.descricao,
                            categoria: item.categoria,
                            preco_unitario: item.preco_unitario,
                            qtd_venda: item.qtd_venda
                          }
                          );
                        } else {
                          item.qtd_venda = item.qtd_venda++;
                          resultado.push(
                            {
                              id:item.id,
                              descricao:item.descricao,
                              categoria:item.categoria,
                              preco_unitario:item.preco_unitario,
                              qtd_venda:item.qtd_venda
                            }
                            );
                          }
                        }
                      }
                    }
                    
                    //Calcular total de itens na cesta 
                    let produtosDaCesta = [];
                    for (let item of resultado) {
                      if (produtosDaCesta.indexOf(item) == -1) {
                        produtosDaCesta.push(item);
                      } else {
                        produtosDaCesta[produtosDaCesta.indexOf(item)].qtd_venda += 1;
                        produtosDaCesta[produtosDaCesta.indexOf(item)].subtotal = (produtosDaCesta[produtosDaCesta.indexOf(item)].qtd_venda * parseFloat(produtosDaCesta[produtosDaCesta.indexOf(item)].preco_unitario)).toFixed(2);
                      }
                    }
                    
                    //res.send(produtosDaCesta);
                    renderizarPaginaDePedidoSelecionado(req, res, next, numeroPedido, total, produtosDaCesta, produtos, dadosGerais);
                    //----------------------------------------------------------------------------
                    //Fim da consulta dos produtos da cesta 
                    
                    
                  }).catch(err => {
                    console.log(err.message);
                    res.send(err.message);
                  });
                  
                } else {
                  
                  renderizarPaginaDePedidoSelecionado(req, res, next, numeroPedido, total, produtosDaCesta=[], produtos, dadosGerais);
                  //----------------------------------------------------------------------------
                  //Renderizar pagina sem os produtos da cesta                
                  //res.send('Vazio');
                }
                
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
    };
    
    //-------------------------------------------------------------------------------------
    const alterarStatusPedido = (req, res, next) => {
      let pedido = new Pedido();
      pedido.id = req.params.id;
      pedido.status = req.params.status;
      pedido.alterarStatusDoPedido(pedido).then(pedido => {
        res.send(pedido);
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    };
    
    //-------------------------------------------------------------------------------------
    
    
    module.exports = { listarPedidoEspecifico, salvarPedido, editarPedido, excluirPedido, listarPedidos, alterarStatusPedido };