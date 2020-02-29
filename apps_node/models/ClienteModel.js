class ClienteModel {
  constructor (id_usuario, phone, nome, cep, cidade, estado, endereco, codigo_ibge, regiao, bairro, regiao_atendida = false, cliente_excluido = false) {
    this._id = null;
    this._id_usuario = id_usuario;
    this._phone = phone;
    this._nome = nome;
    this._cep = cep;
    this._cidade = cidade;
    this._estado = estado;
    this._endereco = endereco;
    this._bairroer = bairro;
    this._codigo_ibge = codigo_ibge;
    this._regiao = regiao;
    this._regiao_atendida = regiao_atendida;
    this._cliente_excluido = cliente_excluido;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get id_usuario() {
    return this._id_usuario;
  }
  set id_usuario(value) {
    this._id_usuario = value;
  }
  get phone() {
    return this._phone;
  }
  set phone(value) {
    this._phone = value;
  }
  get nome() {
    return this._nome;
  }
  set nome(value) {
    this._nome = value;
  }
  get cep() {
    return this._cep;
  }
  set cep(value) {
    this._cep = value;
  }
  get cidade() {
    return this._cidade;
  }
  set cidade(value) {
    this._cidade = value;
  }
  get estado() {
    return this._estado;
  }
  set estado(value) {
    this._estado = value;
  }
  get endereco() {
    return this._endereco;
  }
  set endereco(value) {
    this._endereco = value;
  }
  get bairro() {
    return this._bairro;
  }
  get codigo_ibge() {
    return this._codigo_ibge;
  }
  set codigo_ibge(value) {
    this._codigo_ibge = value;
  }
  get regiao() {
    return this._regiao;
  }
  set regiao(value) {
    this._regiao = value;
  }
  get regiao_atendida() {
    return this._regiao_atendida;
  }
  set regiao_atendida(value) {
    this._regiao_atendida = value;
  }
  set bairro(value) {
    this._bairro = value;
  }
  get cliente_excluido() {
    return this._cliente_excluido;
  }
  set cliente_excluido(value) {
    this._cliente_excluido = value;
  }

}

module.exports = ClienteModel;