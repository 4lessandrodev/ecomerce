const conect = require('./../config/CONECT_BD');
class ProdutoCompraModel {
  constructor (id_produto, id_compra) {
    this._id = null;
    this._id_produto = id_produto;
    this._id_compra = id_compra;
  }
  get id_produto() {
    return this._id_produto;
  }
  set id_produto(value) {
    this._id_produto = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get id_compra() {
    return this._id_compra;
  }
  set id_compra(value) {
    this._id_compra = value;
  }

  salvarProdutoCompra(produtoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_produtos_compra(id_produto, id_compra) VALUES(?,?)`, [
        produtoCompra._id_cesta, produtoCompra._id_compra
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


  listarProdutoCompra(produtoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT cc.id AS 'codigo_produto', pedido.id_compras AS 'codigo_pedido', cliente.nome AS 'nome_cliente', produto.descricao AS 'descricao_produto', pedido.ecobag_adicional AS 'Ecobag', pedido.status AS 'Status_pedido', pg.descricao AS 'Tipo_pagamento', produto.preco_venda
FROM tb_produtos_compra AS cc, tb_compras AS compra, tb_pedidos AS pedido, tb_produtos AS produto, tb_clientes AS cliente, tb_tipos_pagamento AS pg
WHERE produto.id = cc.id_produto AND pedido.id_compras = cc.id_compra AND cliente.id = compra.id_cliente AND pedido.id_tipo_de_pagamento = pg.id GROUP BY cc.id_produto;
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

  atualizarProdutoCompra(produtoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_produtos_compra SET id_cesta = ?, id_compra = ? WHERER id = ?`, [
        cestaCompra._id_cesta, cestaCompra._id_compra, cestaCompra._id
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


  excluirProdutoCompra(produtoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_produtos_compra WHERE id = ?`, [
        produtoCompra._id
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


}

module.exports = ProdutoCompraModel;