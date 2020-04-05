const conect = require('./../config/CONECT_BD');
class CompraModel {
  constructor (id_usuario, data_compra = new Date(), pedido_aberto = 1) {
    this.id = null;
    this._id_usuario = id_usuario;
    this._data_compra = data_compra;
    this._pedido_aberto = pedido_aberto;
  }

  get id_usuario() {
    return this._id_usuario;
  }
  set id_usuario(value) {
    this._id_usuario = value;
  }
  get data_compra() {
    return this._data_compra;
  }
  set data_compra(value) {
    this._data_compra = value;
  }
  get pedido_aberto() {
    return this._pedido_aberto;
  }
  set pedido_aberto(value) {
    this._pedido_aberto = value;
  }
  get id() {
    return this_.id;
  }
  set id(value) {
    this._id = value;
  }

  salvarCompra(compra) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_compras(id_usuario, pedido_aberto) VALUES(?,?)`, [
        compra._id_usuario, compra._pedido_aberto
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


  listarCompra(compra) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_compras`, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarCompra(compra) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_compras SET id_usuario = ?, pedido_aberto = ? WHERE id = ?`, [
        compra._id_usuario, compra._pedido_aberto, compra._id
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


  excluirCompra(compra) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_compras WHERE id = ?`, [compra._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  limparCarrinhoDeCompras(query) {
    return new Promise((resolve, reject) => {
      conect.query(query, (err, result) => {
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

module.exports = CompraModel;