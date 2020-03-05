const conect = require('./../config/CONECT_BD');
class UnidadeMedidaModel {
  constructor (descricao, status = 1, categoria_excluida = 0) {
    this._id = null;
    this._descricao = descricao;
    this._status = status;
    this._categoria_excluida = categoria_excluida;
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
  get categoria_excluida() {
    return this._categoria_excluida;
  }
  set categoria_excluida(value) {
    this._categoria_excluida = value;
  }

  salvarUnidadeMedida(unidadeMedida) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_und_medidas(descricao, status, categoria_excluida) VALUES(?,?,?)`, [unidadeMedida._descricao, unidadeMedida._status, unidadeMedida.categoria_excluida], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarUnidadesMedida(unidadeMedida) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_und_medidas WHERE categoria_excluida = ? AND status = ?`, [unidadeMedida._categoria_excluida, unidadeMedida._status], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarUnidadeMedida(unidadeMedida) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_und_medidas SET descricao = ?, status = ?, categoria_excluida = ? WHERE id = ?`, [unidadeMedida._descricao, unidadeMedida._status, unidadeMedida._categoria_excluida, unidadeMedida._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  desabilitarUnidadeMedida(unidadeMedida) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_und_medidas SET categoria_excluida = ? WHERE id = ?`, [unidadeMedida._categoria_excluida, unidadeMedida._id], (err, result) => {
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

module.exports = UnidadeMedidaModel;