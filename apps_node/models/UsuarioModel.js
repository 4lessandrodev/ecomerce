const conect = require('./../config/CONECT_BD');
class UsuarioModel {
  constructor (email = null, senha = null, data_cadastro = new Date(), usuario_excluido = 0, admin = 0) {
    this._id = null;
    this._email = (email != '' && email != null) ? email.toLowerCase() : '';
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
    this._email = (value != '' && value != null) ? value.toLowerCase() : '';
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
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(results);
        }
      });
    });
  }

  entrar(usuario) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT id, email, admin FROM tb_usuarios AS user WHERE user.email = ? AND user.senha = ?`, [usuario._email, usuario._senha], (err, results) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
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
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(results);
        }
      });
    });
  }


  //USANDO O NOT IN PARA SELECIONAR UM INTERVALO DE DADOS NO BANCO 
  selecionarIntervaloInverso(array) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_usuarios WHERE id NOT IN(${array})`, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   SELECT código_empregado, nome, data_nascimento, cidade
  FROM empregados
  WHERE codigo_empregado in(3,7,9,11,14);
  --------------------
  SELECT código_empregado, nome, data_nascimento, cidade
  FROM empregados
  WHERE codigo_empregado not in(3,7,9,11,14)
   */

  //USANDO O IN PARA SELECIONAR UM INTERVALO DE DADOS NO BANCO 
  selecionarIntervalo(array) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_usuarios WHERE id IN(${array})`, (err, result) => {
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

module.exports = UsuarioModel;