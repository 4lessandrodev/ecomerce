const conect = require('../config/CONECT_BD'); 
class ContatoModel {
  constructor (nome, email, mensagem, data_envio = new Date(), mensagem_lida = 0) {
    this._id = null;
    this._nome = nome;
    this._email = email;
    this._mensagem = mensagem;
    this._data_envio = data_envio;
    this._mensagem_lida = mensagem_lida;
  }

  get id() {
    return this._id;
  }
  get nome() {
    return this._nome;
  }
  get email() {
    return this._email;
  }
  get mensagem() {
    return this._mensagem;
  }
  get mensagem_lida() {
    return this._mensagem_lida;
  }
  set id(value) {
    this._id = value;
  }
  set nome(value) {
    this._nome = value;
  }
  set email(value) {
    this._email = value;
  }
  set mensagem(value) {
    this._mensagem = value;
  }
  set mensagem_lida(value) {
    this._mensagem_lida = value;
  }


  //Metodo para salvar as mensagens dos usuários no portal 
  //-----------------------------------------------------------------------------------------------------
  enviarMensagem(mensagem) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_contatos(nome, email, mensagem, mensagem_lida) VALUES(?,?,?,?)`, [
        mensagem._nome, mensagem._email, mensagem._mensagem, mensagem._mensagem_lida
      ], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }
  //-----------------------------------------------------------------------------------------------------

  listarMensagens() {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_contatos`, (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  marcarComoLida(mensagem) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_contatos SET mensagem_lida = ?`, [mensagem._mensagem_lida, mensagem._id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  excluirMensagem(mensagem) {
    return new Promise((resolve, reject) => {
      conect.query(`DELETE FROM tb_contatos WHERE id = ?`, [mensagem._id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  //-----------------------------------------------------------------------------------------------------
}

module.exports = ContatoModel;