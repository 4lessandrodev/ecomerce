class ProdutoModel {
  constructor (imagem, descricao, id_categoria_produto, preco_venda, unidade_medida, status, info_nutricional, produto_excluido = 0, produto_especial = false, fator_multiplicador = 1, data_cadastro = new Date()) {
    this._id = null;
    this._imagem = imagem;
    this._descricao = descricao;
    this._id_categoria_produto = id_categoria_produto;
    this._preco_venda = preco_venda;
    this._produto_excluido = produto_excluido;
    this._unidade_medida = unidade_medida;
    this._data_cadastro = data_cadastro;
    this._status = status;
    this._info_nutricional = info_nutricional;
    this._produto_especial = produto_especial;
    this._fator_multiplicador = fator_multiplicador;
  }

  get id() {
    return this._id;
  }
  get imagem() {
    return this._imagem;
  }
  get descricao() {
    return this._descricao;
  }
  get id_categoria_produto() {
    return this._id_categoria_produto;
  }
  get preco_venda() {
    return this._preco_venda;
  }
  get data_cadastro() {
    return this._data_cadastro;
  }
  get unidade_medida() {
    return this._unidade_medida;
  }
  get status() {
    return this._status;
  }
  get info_nutricional() {
    return this._info_nutricional;
  }
  get produto_especial() {
    return this._produto_especial;
  }
  get fator_multiplicador() {
    return this._fator_multiplicador;
  }
  set id(value) {
    this._id = value;
  }
  set imagem(value) {
    this._imagem = value;
  }
  set descricao(value) {
    this._descricao = value;
  }
  set id_categoria_produto(value) {
    this._id_categoria_produto = value;
  }
  set preco_venda(value) {
    this._preco_venda = value;
  }
  set data_cadastro(value) {
    this._data_cadastro = value;
  }
  set unidade_medida(value) {
    this._unidade_medida = value;
  }
  set status(value) {
    this._status = value;
  }
  set info_nutricional(value) {
    this._info_nutricional = value;
  }
  set produto_especial(value) {
    this._produto_especial = value;
  }
  set fator_multiplicador(value) {
    this._fator_multiplicador = value;
  }
  get produto_excluido() {
    return this._produto_excluido;
  }
  set produto_excluido(value) {
    this._produto_excluido = value;
  }

}

module.exports = ProdutoModel;