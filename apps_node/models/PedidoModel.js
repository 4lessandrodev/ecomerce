const conect = require('./../config/CONECT_BD');
class PedidoModel {
  constructor (id_compras, ecobag_adicional, id_tipo_pagamento, anotacoes, status = 1, retirar_na_loja = 0) {
    this._id = null;
    this._id_compras = id_compras;
    this._ecobag_adicional = ecobag_adicional;
    this._id_tipo_pagamento = id_tipo_pagamento;
    this._retirar_na_loja = retirar_na_loja;
    this._anotacoes = anotacoes;
    this._status = status;
  }
  get id_compras() {
    return this._id_compras;
  }
  get ecobag_adicional() {
    return this._ecobag_adicional;
  }
  get id_tipo_pagamento() {
    return this._id_tipo_pagamento;
  }
  get retirar_na_loja() {
    return this._retirar_na_loja;
  }
  get anotacoes() {
    return this._anotacoes;
  }
  get status() {
    return this._status;
  }

  set id_compras(value) {
    this._id_compras = value;
  }
  set ecobag_adicional(value) {
    this._ecobag_adicional = value;
  }
  set id_tipo_pagamento(value) {
    this._id_tipo_pagamento = value;
  }
  set retirar_na_loja(value) {
    this._retirar_na_loja = value;
  }
  set anotacoes(value) {
    this._anotacoes = value;
  }
  set status(value) {
    this._status = value;
  }

  salvarPedido(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`
      INSERT INTO tb_pedidos(ecobag_adicional, id_tipo_de_pagamento, retirar_na_loja, anotacoes, status, id_compras) 
      VALUES(?,?,?,?,?,?)`,
        [
          pedido._ecobag_adicional, pedido._id_tipo_pagamento, pedido._retirar_na_loja, pedido._anotacoes, pedido._anotacoes, pedido.status, pedido._id_compras
        ], (err, result) => {
          if (err) {
            console.log(err.message);
            reject(err.message);
          } else {
            resolve(result);
          }
        });
    });
  }


  listarPedidos(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`
      SELECT pedido.id,cliente.nome, compra.pedido_aberto, compra.data_compra, cesta.descricao AS 'descricao_cesta', produto.descricao AS 'descricao_produto'
FROM tb_pedidos AS pedido, tb_compras AS compra, tb_clientes AS cliente, tb_produtos_compra AS prd, tb_planos_compra AS plano, tb_cestas_compra AS cp, tb_cestas AS cesta, tb_produtos AS produto
WHERE pedido.id_compras = compra.id AND produto.id = prd.id_produto AND cesta.id = cp.id_cesta AND plano.id_compra = compra.id AND cliente.id = compra.id_cliente GROUP BY compra.id
      `, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarPedido(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`
      UPDATE tb_pedidos SET ecobag_adicional = ?, id_tipo_de_pagamento = ?, retirar_na_loja = ?, anotacoes = ?, status = ?, id_compras = ? WHERE id = ?`,
        [
          pedido._ecobag_adicional, pedido._id_tipo_pagamento, pedido._retirar_na_loja, pedido._anotacoes, pedido._anotacoes, pedido.status, pedido._id_compras, pedido._id
        ], (err, result) => {
          if (err) {
            console.log(err.message);
            reject(err.message);
          } else {
            resolve(result);
          }
        });
    });
  }


  excluirPedido(pedido) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_pedidos WHERE id = ?`, [pedido._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


}