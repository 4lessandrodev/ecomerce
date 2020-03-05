const conect = require('../config/CONECT_BD');
class ContatoModel {
  constructor (nome, email, mensagem, data_envio = new Date(), mensagem_lida = 0) {
    this._nome = nome;
    this._email = email;
    this._mensagem = mensagem;
    this._data_envio = data_envio;
    this._mensagem_lida = mensagem_lida;
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
      ], (err, results) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(results);
        }
      });
    });
  }
  //-----------------------------------------------------------------------------------------------------

  listarMensagens() {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_contatos`, (err, results) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(results);
        }
      });
    });
  }

  //-----------------------------------------------------------------------------------------------------
}

module.exports = ContatoModel;