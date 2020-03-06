const conect = require('./../config/CONECT_BD');
class CategoriaProdutoModel {
  constructor (descricao, status = 1, categoria_p_excluida = 0) {
    this._id = null;
    this._descricao = descricao;
    this._status = status;
    this._categoria_p_excluida = categoria_p_excluida;
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
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get categoria_p_excluida() {
    return this._categoria_p_excluida;
  }
  set categoria_p_excluida(value) {
    this._categoria_p_excluida = value;
  }

  salvarCategoria(categoria) {
    return new Promise((resolve, reject) => {
      conect.query(`
    INSERT INTO tb_categoria_produtos(descricao, status, categoria_excluida) VALUES(?,?,?)
    `, [categoria._descricao, categoria._status, categoria._categoria_p_excluida], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarCategoria(categoria) {
    return new Promise((resolve, reject) => {
      conect.query(`
    UPDATE tb_categoria_produtos SET descricao = ?, status = ?, categoria_p_excluida = ? WHERE id = ?
    `, [categoria._descricao, categoria._status, categoria._categoria_p_excluida, categoria._id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  listarCategorias(categoria) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_categoria_produtos WHERE categoria_p_excluida = ? AND status = ?`, [
        categoria._categoria_p_excluida, categoria._status], (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result);
          }
        });
    });
  }




}

module.exports = CategoriaProdutoModel;

