class CategoriaCestasModel {
  constructor (descricao, status, categoria_excluida = false) {
    this._id = null;
    this._descricao = descricao;
    this._status = status;
    this._categoria_excluida = categoria_excluida;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
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
  get categoria_excluida() {
    return this._categoria_excluida;
  }
  set categoria_excluida(value) {
    this._categoria_excluida = value;
  }

}

module.exports = CategoriaCestasModel;