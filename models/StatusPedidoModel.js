const conect = require('./../config/CONECT_BD');
class StatusPedidoModel {
  constructor (descricao) {
    this._id = null;
    this._descricao = descricao;
  }

  get id() {
    return this._id;
  }

  get descricao() {
    return this._descricao;
  }

  set id(value) {
    this._id = value;
  }

  set descricao(value) {
    this._descricao = value;
  }

  listarStatus() {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_status_pedido`, (err, result) => {
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

module.exports = StatusPedidoModel;