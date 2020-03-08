const conect = require('./../config/CONECT_BD');
class LojaModel {
  constructor (razao_social, nome_fantasia, cnpj_cpf, cep, cidade, estado, endereco, phone, email, id_regiao, bairro, status = 1, loja_excluida = 0) {
    this._id = null;
    this._razao_social = razao_social;
    this._nome_fantasia = nome_fantasia;
    this._cnpj_cpf = cnpj_cpf;
    this._cep = cep;
    this._cidade = cidade;
    this._estado = estado;
    this._endereco = endereco;
    this._loja_excluida = loja_excluida;
    this._phone = phone;
    this._email = email;
    this._status = status;
    this._id_regiao = id_regiao;
    this._bairro = bairro;
  }
  get razao_social() {
    return this._razao_social;
  }
  get cnpj_cpf() {
    return this._cnpj_cpf;
  }
  get cep() {
    return this._cep;
  }
  get cidade() {
    return this._cidade;
  }
  get estado() {
    return this._estado;
  }
  get endereco() {
    return this._endereco;
  }
  get loja_excluida() {
    return this._loja_excluida;
  }
  get phone() {
    return this._phone;
  }
  get email() {
    return this._email;
  }
  get status() {
    return this._status;
  }

  set razao_social(value) {
    this._razao_social = value;
  }
  set cnpj_cpf(value) {
    this._cnpj_cpf = value;
  }
  set cep(value) {
    this._cep = value;
  }
  set cidade(value) {
    this._cidade = value;
  }
  set estado(value) {
    this._estado = value;
  }
  set endereco(value) {
    this._endereco = value;
  }
  set loja_excluida(value) {
    this._loja_excluida = value;
  }
  set phone(value) {
    this._phone = value;
  }
  set email(value) {
    this._email = value;
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
  get nome_fantasia() {
    return this._nome_fantasia;
  }
  set nome_fantasia(value) {
    this._nome_fantasia = value;
  }
  get id_regiao() {
    return this._id_regiao;
  }
  set id_regiao(value) {
    this._id_regiao = value;
  }

  salvarLoja(loja) {
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO tb_lojas(razao_social, nome_fantasia, cnpj_cpf, cep, cidade, estado, endereco,
        phone, email, status, bairro, id_regiao) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, [
        loja._razao_social, loja._nome_fantasia, loja._cnpj_cpf, loja._cep, loja._cidade, loja._estado,
        loja._endereco, loja._phone, loja._email, loja._status, loja._bairro, loja._id_regiao
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


  listarTodasLojas(loja) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_lojas WHERE loja_excluida = ?`, [loja._loja_excluida], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  listarLojasAtivas(loja) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT * FROM tb_lojas WHERE loja_excluida = ? AND status = ?`, [loja._loja_excluida, loja._status], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarLojasAtivasParaFrete(loja) {
    return new Promise((resolve, reject) => {
      conect.query(`SELECT l.id, l.razao_social, l.endereco FROM tb_lojas AS l WHERE loja_excluida = ? AND status = ?`, [loja._loja_excluida, loja._status], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  atualizarLoja(loja) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_lojas SET razao_social = ?, nome_fantasia = ?, cnpj_cpf = ?, cep = ?, cidade = ?, estado = ?, endereco = ?,
        phone = ?, email = ?, status = ?, bairro = ?, id_regiao = ? WHERE id = ?`, [
        loja._razao_social, loja._nome_fantasia, loja._cnpj_cpf, loja._cep, loja._cidade, loja._estado,
        loja._endereco, loja._phone, loja._email, loja._status, loja._bairro, loja._id_regiao, loja._id
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


  desabilitarLoja(loja) {
    return new Promise((resolve, reject) => {
      conect.query(`UPDATE tb_lojas SET loja_excluida = ? WHERE id = ?`, [
        loja._loja_excluida, loja._id
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

module.exports = LojaModel;