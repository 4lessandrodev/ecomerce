const conect = require('./../config/CONECT_BD');
class FreteModel {
  constructor (origem, destino, preco, data_cadastro = new Date()) {
    this._id = null;
    this._origem = origem;
    this._destino = destino;
    this._preco = preco;
    this._data_cadastro = data_cadastro;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get origem() {
    return this._origem;
  }
  set origem(value) {
    this._origem = value;
  }
  get destino() {
    return this._destino;
  }
  set destino(value) {
    this._destino = value;
  }
  get preco() {
    return this._preco;
  }
  set preco(value) {
    this._preco = value;
  }
  get data_cadastro() {
    return this._data_cadastro;
  }
  set data_cadastro(value) {
    this._data_cadastro = value;
  }

  salvarFrete(frete) {
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


  listarFretes(frete) {
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

  atualizarFrete(frete) {
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


  desabilitarFrete(frete) {
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

module.exports = FreteModel;