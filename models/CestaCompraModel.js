const conect = require('./../config/CONECT_BD');
class CestaCompraModel {
     constructor(id_cesta, id_compra, quantidade, preco_unitario, produtos) {
          this._id = null;
          this._id_cesta = id_cesta;
          this._id_compra = id_compra;
          this._quantidade = quantidade;
          this._preco_unitario = preco_unitario;
          this._produtos = produtos;
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

     get quantidade() {
          return this._quantidade;
     }
     get preco_unitario() {
          return this._preco_unitario;
     }
     get produtos() {
          return this._produtos;
     }
     set quantidade(value) {
          this._quantidade = value;
     }
     set preco_unitario(value) {
          this._preco_unitario = value;
     }
     set produtos(value) {
          this._produtos = value;
     }

     salvarCestaCompra(cestaCompra) {
          return new Promise((resolve, reject) => {
               conect.query(
                    `INSERT INTO tb_cestas_compra(id_cesta, id_compra, quantidade, preco_unitario, produtos) VALUES(?,?,?,?,?)`,
                    [
                         cestaCompra._id_cesta,
                         cestaCompra._id_compra,
                         cestaCompra._quantidade,
                         cestaCompra._preco_unitario,
                         cestaCompra._produtos,
                    ],
                    (err, result) => {
                         if (err) {
                              console.log(err.message);
                              reject(err.message);
                         } else {
                              resolve(result);
                         }
                    },
               );
          });
     }

     listarCestaCompra(cestaCompra) {
          return new Promise((resolve, reject) => {
               conect.query(
                    `SELECT cc.id AS 'codigo_cesta', pedido.id_compras AS 'codigo_pedido', cliente.nome AS 'nome_cliente', cesta.descricao AS 'descricao_cesta', pedido.ecobag_adicional AS 'Ecobag', pedido.status AS 'Status_pedido', pg.descricao AS 'Tipo_pagamento', cesta.preco
FROM tb_cestas_compra AS cc, tb_compras AS compra, tb_pedidos AS pedido, tb_cestas AS cesta, tb_clientes AS cliente, tb_tipos_pagamento AS pg
WHERE cesta.id = cc.id_cesta AND pedido.id_compras = cc.id_compra AND cliente.id = compra.id_cliente AND pedido.id_tipo_de_pagamento = pg.id GROUP BY cc.id_cesta;
      `,
                    (err, result) => {
                         if (err) {
                              console.log(err.message);
                              reject(err.message);
                         } else {
                              resolve(result);
                         }
                    },
               );
          });
     }

     atualizarCestaCompra(cestaCompra) {
          return new Promise((resolve, reject) => {
               conect.query(
                    `UPDATE tb_cestas_compra SET id_cesta = ?, id_compra = ?, quantidade = ?, preco_unitario = ?, produtos = ? WHERER id = ?`,
                    [
                         cestaCompra._id_cesta,
                         cestaCompra._id_compra,
                         cestaCompra._quantidade,
                         cestaCompra._preco_unitario,
                         cestaCompra._produtos,
                         cestaCompra._id,
                    ],
                    (err, result) => {
                         if (err) {
                              console.log(err.message);
                              reject(err.message);
                         } else {
                              resolve(result);
                         }
                    },
               );
          });
     }

     excluirCestaCompra(cestaCompra) {
          return new Promise((resolve, reject) => {
               conect.query(
                    `DELETE FROM tb_cestas_compra WHERE id = ?`,
                    [cestaCompra._id],
                    (err, result) => {
                         if (err) {
                              console.log(err.message);
                              reject(err.message);
                         } else {
                              resolve(result);
                         }
                    },
               );
          });
     }

     listarCestasDoCarrinho(cestaCompra, id_usuario) {
          return new Promise((resolve, reject) => {
               conect.query(
                    `SELECT ces.id, ces.imagem, ces.descricao, cescom.preco_unitario, cescom.quantidade, (cescom.preco_unitario * cescom.quantidade) AS subtotal
FROM tb_compras AS com, tb_cestas_compra AS cescom, tb_cestas AS ces
WHERE ces.id = cescom.id_cesta AND cescom.id_compra = ? AND com.id_usuario = ? GROUP BY ces.id`,
                    [cestaCompra._id_compra, id_usuario],
                    (err, result) => {
                         if (err) {
                              console.log(err.message);
                              reject(err.message);
                         } else {
                              resolve(result);
                         }
                    },
               );
          });
     }
}

module.exports = CestaCompraModel;
