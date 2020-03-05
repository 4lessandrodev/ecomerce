const conect = require('./../config/CONECT_BD');
class RegiaoModel {
  constructor (descricao, status = 1, regiao_excluida = 0) {
    this._id = null;
    this._descricao = descricao;
    this._status = status;
    this._regiao_excluida = regiao_excluida;
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
  get regiao_excluida() {
    return this._regiao_excluida;
  }
  set regiao_excluida(value) {
    this._regiao_excluida = value;
  }

  salvarRegiao(regiao) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_regioes(descricao, status, regiao_excluida)`, [regiao._descricao, regiao._status, regiao._regiao_excluida], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarRegiao(regiao) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_regioes WHERE regiao_excluida = ?`, [regiao._regiao_excluida], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarRegiao(regiao) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_regioes SET descricao = ?, status = ?, regiao_excluida = ? WHERE id = ?`, [regiao._descricao, regiao._status, regiao._regiao_excluida, regiao._id], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  desabilitarRegiao(regiao) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_regioes SET regiao_excluida = ? WHERE id = ?`, [regiao._regiao_excluida, regiao._id], (err, result) => {
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

module.exports = RegiaoModel;