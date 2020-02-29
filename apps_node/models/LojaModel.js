class LojaModel {
  constructor (razao_social, nome_fantasia, cnpj_cpf, cep, cidade, estado, endereco, loja_excluida, phone, email, status, regiao) {
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
    this._regiao = regiao;
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
  get regiao() {
    return this._regiao;
  }
  set regiao(value) {
    this._regiao = value;
  }
}

module.exports = LojaModel;