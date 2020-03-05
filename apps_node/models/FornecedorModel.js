const conect = require('./../config/CONECT_BD');
class FornecedorModel {
  constructor (razao_social, cnpj, cep, cidade, estado, endereco, phone, email, bairro, nome_fantasia, fornecedor_excluido = 0, status = 1) {
    this._id = null;
    this._razao_social = razao_social;
    this._nome_fantasia = nome_fantasia;
    this._cnpj = cnpj;
    this._cep = cep;
    this._cidade = cidade;
    this._estado = estado;
    this._endereco = endereco;
    this._fornecedor_excluido = fornecedor_excluido;
    this._phone = phone;
    this._email = email;
    this._status = status;
    this._bairro = bairro;
  }
  get razao_social() {
    return this._razao_social;
  }
  get nome_fantasia() {
    return this._fatansyName;
  }
  get cnpj() {
    return this._cnpj;
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
  get fornecedor_excluido() {
    return this._fornecedor_excluido;
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

  get bairro() {
    return this._bairro;
  }

  set razao_social(value) {
    this._razao_social = value;
  }
  set cnpj(value) {
    this._cnpj = value;
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
  set fornecedor_excluido(value) {
    this._fornecedor_excluido = value;
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
  set bairro(value) {
    this._bairro = value;
  }
  set nome_fantasia(value) {
    this._fatansyName = value;
  }

  salvarFornecedor(fornecedor) {
    return new Promise((resolve, reject) => {
      conect.query(``, [], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  listarFornecedores(fornecedor) {
    return new Promise((resolve, reject) => {
      conect.query(`sql`, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }

  atualizarFornecedor(fornecedor) {
    return new Promise((resolve, reject) => {
      conect.query(`sql`, [], (err, result) => {
        if (err) {
          console.log(err.message);
          reject(err.message);
        } else {
          resolve(result);
        }
      });
    });
  }


  desabilitarFornecedor(fornecedor) {
    return new Promise((resolve, reject) => {
      conect.query(`sql`, [], (err, result) => {
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

module.exports = FornecedorModel;