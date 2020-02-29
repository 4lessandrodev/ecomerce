class CestaModel {
  constructor (imagem, descricao, id_categoria_cesta, status, preco, informacoes_nutricionais, alteracoes_permitidas, cesta_excluida = false, data_cadastro = new Date()) {
    this._id = null;
    this._imagem = imagem;
    this._descricao = descricao;
    this._id_categoria_cesta = id_categoria_cesta;
    this._status = status;
    this._preco = preco;
    this.__informacoes_nutricionais = informacoes_nutricionais;
    this._alteracoes_permitidas = alteracoes_permitidas;
    this._cesta_excluida = cesta_excluida;
    this._data_cadastro = data_cadastro;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  get imagem() {
    return this._imagem;
  }
  get descricao() {
    return this._descricao;
  }
  get id_categoria_cesta() {
    return this._id_categoria_cesta;
  }
  get status() {
    return this._status;
  }
  get preco() {
    return this._preco;
  }
  get informacoes_nutricionais() {
    return this._informacoes_nutricionais;
  }

  get alteracoes_permitidas() {
    return this._alteracoes_permitidas;
  }
  set alteracoes_permitidas(value) {
    this._alteracoes_permitidas = value;
  }
  set imagem(value) {
    this._imagem = value;
  }
  set descricao(value) {
    this._descricao = value;
  }
  set id_categoria_cesta(value) {
    this._id_categoria_cesta = value;
  }
  set status(value) {
    this._status = value;
  }
  set preco(value) {
    this._preco = value;
  }
  set informacoes_nutricionais(value) {
    this._informacoes_nutricionais = value;
  }
  get cesta_excluida() {
    return this._cesta_excluida;
  }
  set cesta_excluida(value) {
    this._cesta_excluida = value;
  }
  get data_cadastro() {
    return this._data_cadastro;
  }
  set data_cadastro(value) {
    this._data_cadastro = value;
  }
}

module.exports = CestaModel;