const conect = require('./../config/CONECT_BD');
class PacotesPlanosModel {
  constructor (descricao, titulo, id_cesta, preco, quantidade_cestas, status = 1, plano_excluido = 0) {
    this._id = null;
    this._descricao = descricao;
    this._titulo = titulo;
    this._status = status;
    this._id_cesta = id_cesta;
    this._preco = preco;
    this._quantidade_cestas = quantidade_cestas;
    this._plano_excluido = plano_excluido;
  }
  get id() {
    return this._id;
  }
  get descricao() {
    return this._descricao;
  }
  get titulo() {
    return this._titulo;
  }
  get status() {
    return this._status;
  }
  get id_cesta() {
    return this._id_cesta;
  }
  get preco() {
    return this._preco;
  }
  get quantidade_cestas() {
    return this._quantidade_cestas;
  }
  set id(value) {
    this._id = value;
  }
  set descricao(value) {
    this._descricao = value;
  }
  set titulo(value) {
    this._titulo = value;
  }
  set status(value) {
    this._status = value;
  }
  set id_cesta(value) {
    this._id_cesta = value;
  }
  set preco(value) {
    this._preco = value;
  }
  set quantidade_cestas(value) {
    this._quantidade_cestas = value;
  }
  get plano_excluido() {
    return this._plano_excluido;
  } set plano_excluido(value) {
    this._plano_excluido = value;
  }

  salvarPacotePlano(pacotePlano) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_pacotes_planos(quantidade_cestas, id_cesta, preco, descricao, titulo, status) VALUES(?,?,?,?,?,?)`, [
        pacotePlano.quantidade_cestas, pacotePlano._id_cesta, pacotePlano._preco, pacotePlano._descricao, pacotePlano._titulo, pacotePlano._status
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


  listarPacotesPlanos(pacotePlano) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_pacotes_planos WHERE id = ?`, [pacotePlano._plano_excluido], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarPacotePlano(pacotePlano) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_pacotes_planos SET quantidade_cestas = ?, id_cesta = ?, preco = ?, descricao = ?, titulo = ?, status = ? WHERE id = ?`, [
        pacotePlano.quantidade_cestas, pacotePlano._id_cesta, pacotePlano._preco, pacotePlano._descricao, pacotePlano._titulo, pacotePlano._status, pacotePlano._id
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


  desabilitarPacotePlano(pacotePlano) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_pacotes_planos SET plano_excluido = ? WHERE id = ?`, [
        pacotePlano.plano_excluido, pacotePlano._id
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

module.exports = PacotesPlanosModel;