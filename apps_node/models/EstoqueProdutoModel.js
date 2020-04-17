const conect = require('./../config/CONECT_BD');
class EstoqueProdutoModel {
  constructor(id_produto, id_compra, entrada, quantidade) {
    this._id = null;
    this._id_produto = id_produto;
    this._id_compra = id_compra;
    this._entrada = entrada;
    this._quantidade = quantidade;
  }
  
  get id() {
    return this._id;
  }
  get id_produto() {
    return this._id_produto;
  }
  get id_compra() {
    return this._id_compra;
  }
  get entrada() {
    return this._entrada;
  }
  get quantidade() {
    return this._quantidade;
  }
  set id(value) {
    this._id = value;
  }  
  set id_produto(value) {
    this._id_produto = value;
  }
  set id_compra(value) {
    this._id_compra = value;
  }
  set entrada(value) {
    this._entrada = value;
  }
  set quantidade(value) {
    this._quantidade = value;
  }
  
  lancarSaidaDeEstoque(query) {
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
  
  
  lancarEstoqueAdmin(estoque) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_estoque (id_produto, quantidade, entrada, id_compra) VALUES(?, ?, ?, ?)`,
        [estoque._id_produto, estoque._quantidade, estoque._entrada, estoque._id_compra], (err, result) => {
        if (err) {
          console.log(err);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  
  
}

module.exports = EstoqueProdutoModel;