class RegiaoModel {
  constructor (descricao, status, regiao_excluida) {
    this._id = null;
    this._descricao = descricao;
    this._status = status;
    this._regiao_excluida = regiao_excluida;
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
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get regiao_excluida() {
    return this._regiao_excluida;
  }
  set regiao_excluida(value) {
    this._regiao_excluida = value;
  }
}

module.exports = RegiaoModel;