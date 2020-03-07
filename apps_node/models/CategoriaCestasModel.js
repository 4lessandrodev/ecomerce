const conect = require('./../config/CONECT_BD'); 

class CategoriaCestasModel {
  constructor (descricao, status = 1, categoria_c_excluida = 0) {
    this._id = null;
    this._descricao = descricao;
    this._status = status;
    this._categoria_c_excluida = categoria_c_excluida;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get descricao() {
    return this._descricao;
  }
  set descricao(value) {
    this._descricao = value;
  }
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }
  get categoria_c_excluida() {
    return this._categoria_excluida;
  }
  set categoria_c_excluida(value) {
    this._categoria_excluida = value;
  }

  salvarCategoriaCesta(categoria) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_categoria_cestas(descricao, status, categoria_excluida) VALUES(?,?,?)
        )`, [categoria._descricao, categoria._status, categoria._categoria_c_excluida], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarCategoriaCestas(categoria) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_categoria_cestas WHERE categoria_excluida = ? AND status = ?`, [
        categoria._categoria_c_excluida, categoria._status], (err, result) => {
          if (err) {
            console.log(err.message);
            reject(err.message);
          } else {
            resolve(result);
          }
        });
    });
  }

  atualizarCategoriaCesta(categoria) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_categoria SET descricao = ?, status = ?, categoria_excluida = ? WHERE id =?`, [
        categoria._descricao, categoria._status, categoria._categoria_c_excluida, categoria._id], (err, result) => {
          if (err) {
            console.log(err.message);
            reject(err.message);
          } else {
            resolve(result);
          }
        });
    });
  }


  desabilitarCategoriaCesta(categoria) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_categoria SET categoria_excluida = ? WHERE id =?`, [
        categoria._categoria_c_excluida, categoria._id], (err, result) => {
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


module.exports = CategoriaCestasModel;