const conect = require('./../config/CONECT_BD');
class PlanoCompraModel {
  constructor (id_plano, id_usuario, quantidade, preco_unitario, data_compra, status) {
    this._id = null;
    this._id_plano = id_plano;
    this._id_usuario = id_usuario;
    this._quantidade = quantidade;
    this._preco_unitatio = preco_unitario;
    this._data_compra = data_compra;
    this._status = status;
  }
  get id_plano() {
    return this._id_plano;
  }
  get id() {
    return this._id;
  }
  get id_usuario() {
    return this._id_usuario;
  }
  get quantidade() {
    return this._quantidade;
  }
  get preco_unitario() {
    return this._preco_unitatio;
  }
  get data_compra() {
    return this._data_compra;
  }
  get status() {
    return this._status;
  }
  
  set id_plano(value) {
    this._id_plano = value;
  }
  
  set id(value) {
    this._id = value;
  }
  set id_usuario(value) {
    this._id_usuario = value;
  }
  set quantidade(value) {
    this._quantidade = value;
  }
  set preco_unitario(value) {
    this._preco_unitatio = value;
  }
  set data_compra(value) {
    this._data_compra = value;
  }
  set status(value) {
    this._status = value;
  }
  
  salvarPlanoCompra(planoCompra) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_planos_compra(id_lano, id_compra) VALUES(?,?)`, [
        planoCompra._id_cesta, planoCompra._id_usuario
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
        planoCompra._id_plano, planoCompra._id_usuario, planoCompra._id
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
module.exports = PlanoCompraModel;