const Pedido = require('./../models/PedidoModel');
const FormasPagamento = require('./../models/FormaDePagamentoModel');
const Cliente = require('./../models/ClienteModel');
const Loja = require('./../models/LojaModel');
const Frete = require('./../models/FreteModel');
const CestaCompra = require('./../models/CestaCompraModel');
const ProdutoCompra = require('./../models/ProdutoCompraModel');
const enviarEmail = require('./../services/enviarEmail');
const StatusPedido = require('./../models/StatusPedidoModel');
const moment = require('moment');




const renderizarPaginaDePedidos = (req, res, next, dataInicialPedido, dataFinalPedido, numeroPedido, statusPedido = '0', cestas = [], produtos=[], listaDeStatus = []) => {
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
    dataInicialPedido, 
    dataFinalPedido, 
    numeroPedido:(numeroPedido == '%')?numeroPedido = '': numeroPedido=numeroPedido,
    statusPedido,
    listaDeStatus,
    btn: {
      label: 'Voltar',
      classe: 'display-none',
      classe2: 'display-none',
      caminho: '/admin'
    }
  });
};
//-------------------------------------------------------------------------------------
//Renderizar pedido selecionado 
// renderizarPaginaDePedidoSelecionado(req, res, next, numeroPedido, total, produtosDaCesta, produtos, dadosGerais);
const renderizarPaginaDePedidoSelecionado = (req, res, next, pedido, total = 0, produtosDaCesta=[], produtos=[], dadosGerais = [], statusPedido = []) => {
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
    total: total.toFixed(2),
    statusPedido,
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
  let pedido = new Pedido(req.body.id_compras, req.body.ecobag_adicional, req.body.id_tipo_pagamento, req.body.anotacoes, req.body.retirar_na_loja, req.body._status, req.body._total);
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
  
  let data_inicial = req.params.data_inicial;
  let data_final = req.params.data_final;
  let numero_pedido = req.params.numero_pedido;
  let status_pedido = req.params.status_pedido;
  
  
  let pedido = new Pedido();
  let statusPedidos = new StatusPedido();
  
  let dataAtual = moment().format("YYYY-MM-DD HH:MM:S");
  let dataInicial = moment().day(-1).format("YYYY-MM-DD HH:MM:S");
  
  //-----------------
  //Criar filtro de status 
  let statusPedido;
  let numeroPedido;
  
  let dataFinalPedido;
  let dataInicialPedido;
  
  (data_inicial != undefined) ? dataInicialPedido = `${data_inicial} 00:00:00` : dataInicialPedido = dataInicial;
  (data_final != undefined) ? dataFinalPedido = `${data_final} 00:00:00` : dataFinalPedido = dataAtual;
  (numero_pedido != undefined) ? numeroPedido = numero_pedido : numeroPedido = "%";
  
  if (status_pedido == undefined || status_pedido == null) {
    statusPedido = "1%";
  } else if (status_pedido == 0) { 
    statusPedido = '%';
  }else{
    statusPedido = status_pedido;
  } 
  
  
  pedido.listarResumoCestasVendidasComFiltros(statusPedido, numeroPedido, dataInicialPedido, dataFinalPedido).then(cestas => {
    pedido.listarResumoProdutosVendidosComFiltros(statusPedido, numeroPedido, dataInicialPedido, dataFinalPedido).then(produtos => {
      statusPedidos.listarStatus().then(listaDeStatus =>{
        
        renderizarPaginaDePedidos(req, res, next, dataInicialPedido, dataFinalPedido, numeroPedido, status_pedido, cestas, produtos, listaDeStatus);
        
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
const listarPedidoEspecifico = (req, res, next) => {
  
  let pedido = new Pedido();
  let statusPedido = new StatusPedido();
  let total = 0;
  let numeroPedido = req.params.id;
  
  pedido.id = req.params.id;
  pedido.selecionarIdsDosProdutosDeUmaCesta(pedido).then(result => {
    pedido.listarProdutosVendidoSelecionado(pedido).then(produtos => {
      pedido.listarDadosGeraisDoPedido(pedido).then(dadosGerais => {
        pedido.calcularTotalDeCestasVendidasNoPedido(pedido).then(totalCesta => {
          pedido.calcularTotalDeProdutoVendidoNoPedido(pedido).then(totalProduto => {
            statusPedido.listarStatus().then(statusPedido=>{
              
              
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
                      renderizarPaginaDePedidoSelecionado(req, res, next, numeroPedido, total, produtosDaCesta, produtos, dadosGerais, statusPedido);
                      //----------------------------------------------------------------------------
                      //Fim da consulta dos produtos da cesta 
                      
                      
                    }).catch(err => {
                      console.log(err.message);
                      res.send(err.message);
                    });
                    
                  } else {
                    
                    renderizarPaginaDePedidoSelecionado(req, res, next, numeroPedido, total, produtosDaCesta=[], produtos, dadosGerais, statusPedido);
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
    const alterarStatusPedidos = (req, res, next) => {
      let pedido = new Pedido();
      listaDePedidos = req.body.listaPedidos;
      let status = req.body.id_status;
      let qry = ``;
      for (let id of listaDePedidos) {
        qry += `UPDATE tb_pedidos SET status = '${status}' WHERE id = '${id}';`;
      }
      pedido.alterarStatusDosPedidos(qry).then(pedido => {
        res.send(pedido);
      }).catch(err => {
        console.log(err.message);
        res.send(err.message);
      });
    };
    
    //-------------------------------------------------------------------------------------
    
    
    module.exports = { listarPedidoEspecifico, salvarPedido, editarPedido, excluirPedido, listarPedidos, alterarStatusPedido, alterarStatusPedidos };