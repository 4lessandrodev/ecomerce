const conect = require('./../config/CONECT_BD');
class PlanoCompraModel {
  constructor (id_plano, id_compra) {
    this._id = null;
    this._id_plano = id_plano;
    this._id_compra = id_compra;
  }
  get id_plano() {
    return this._id_plano;
  }
  set id_plano(value) {
    this._id_plano = value;
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

  salvarPlanoCompra(planoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_planos_compra(id_lano, id_compra) VALUES(?,?)`, [
        planoCompra._id_cesta, planoCompra._id_compra
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


  listarPlanoCompra(planoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`
      SELECT cc.id AS 'codigo_plano', pedido.id_compras AS 'codigo_pedido', cliente.nome AS 'nome_cliente', 
      plano.descricao AS 'descricao_plano', pedido.ecobag_adicional AS 'Ecobag', pedido.status AS 'Status_pedido', 
      pg.descricao AS 'Tipo_pagamento', plano.preco FROM tb_planos_compra AS cc, tb_compras AS compra, tb_pedidos AS pedido, tb_pacotes_planos AS plano, tb_clientes AS cliente, 
tb_tipos_pagamento AS pg WHERE plano.id = cc.id_plano AND pedido.id_compras = cc.id_compra AND cliente.id = compra.id_cliente 
AND pedido.id_tipo_de_pagamento = pg.id GROUP BY cc.id_plano;
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

  atualizarPlanoCompra(planoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_planos_compra SET id_plano = ?, id_compra = ? WHERER id = ?`, [
        planoCompra._id_plano, planoCompra._id_compra, planoCompra._id
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


  excluirPlanoCompra(planoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_planos_compra WHERE id = ?`, [
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