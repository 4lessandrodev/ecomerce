const conect = require('./../config/CONECT_BD');
class CompraModel {
  constructor (id_cliente, data_compra = new Date(), pedido_aberto = 1) {
    this.id = null;
    this._id_cliente = id_cliente;
    this._data_compra = data_compra;
    this._pedido_aberto = pedido_aberto;
  }

  get id_cliente() {
    return this._id_cliente;
  }
  set id_cliente(value) {
    this._id_cliente = value;
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
      conect.query(``, [], (err, result) => {
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
      conect.query(`sql`, (err, result) => {
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
      conect.query(`sql`, [], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  desabilitarCompra(compra) {
    return new Promise((resolve, reject) => {
      conect.query(`sql`, [], (err, result) => {
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