const conect = require('./../config/CONECT_BD');
class CestaCompraModel {
  constructor (id_cesta, id_compra) {
    this._id = null;
    this._id_cesta = id_cesta;
    this._id_compra = id_compra;
  }
  get id_cesta() {
    return this._id_cesta;
  }
  set id_cesta(value) {
    this._id_cesta = value;
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


  salvarCestaCompra(cestaCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_cestas_compra(id_cesta, id_compra) VALUES(?,?)`, [
        cestaCompra._id_cesta, cestaCompra._id_compra
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


  listarCestaCompra(cestaCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT cc.id AS 'codigo_cesta', pedido.id_compras AS 'codigo_pedido', cliente.nome AS 'nome_cliente', cesta.descricao AS 'descricao_cesta', pedido.ecobag_adicional AS 'Ecobag', pedido.status AS 'Status_pedido', pg.descricao AS 'Tipo_pagamento', cesta.preco
FROM tb_cestas_compra AS cc, tb_compras AS compra, tb_pedidos AS pedido, tb_cestas AS cesta, tb_clientes AS cliente, tb_tipos_pagamento AS pg
WHERE cesta.id = cc.id_cesta AND pedido.id_compras = cc.id_compra AND cliente.id = compra.id_cliente AND pedido.id_tipo_de_pagamento = pg.id GROUP BY cc.id_cesta;
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

  atualizarCestaCompra(cestaCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_cestas_compra SET id_cesta = ?, id_compra = ? WHERER id = ?`, [
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


  excluirCestaCompra(cestaCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_cestas_compra WHERE id = ?`, [
        cestaCompra._id
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

module.exports = CestaCompraModel;