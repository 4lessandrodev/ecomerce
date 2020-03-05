const conect = require('./DB');
class UsuarioModel {
  constructor (email, senha, data_cadastro = new Date(), usuario_excluido = 0, admin = 0) {
    this._id = null;
    this._email = email;
    this._senha = senha;
    this._data_cadastro = data_cadastro;
    this._usuario_excluido = usuario_excluido;
    this._admin = admin;
  }
  get id() {
    return this._id;
  }
  get email() {
    return this._email;
  }
  get senha() {
    return this._senha;
  }
  get data_cadastro() {
    return this._data_cadastro;
  }
  set id(value) {
    this._id = value;
  }
  set email(value) {
    this._email = value;
  }
  set senha(value) {
    this._senha = value;
  }
  set data_cadastro(value) {
    this._data_cadastro = value;
  }
  get usuario_excluido() {
    return this._usuario_excluido;
  }
  set usuario_excluido(value) {
    this._usuario_excluido = value;
  }
  get admin() {
    return this._admin;
  }
  set admin(value) {
    this._admin = value;
  }


  cadastrarNovoUsuario(usuario) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_usuarios(email, senha, usuario_excluido) VALUES(?,?,?)`, [
        usuario._email, usuario._senha, usuario._usuario_excluido
      ], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  entrar(usuario) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_usuarios AS user WHERE user.email = ? AND user.senha = ?`, [usuario._email, usuario._senha], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  alterarSenha(usuario) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_usuario SET senha = ? WHERE email = ?`, [usuario._senha, usuario._email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

}

module.exports = UsuarioModel;