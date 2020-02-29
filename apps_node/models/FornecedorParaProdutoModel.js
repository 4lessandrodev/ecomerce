class id_fornecedorParaProdutoModel {
  constructor (id_fornecedor, id_produto) {
    this._id_fornecedor = id_fornecedor;
    this._id_produto = id_produto;
  }
  get id_fornecedor() {
    return this._id_fornecedor;
  }
  set id_fornecedor(value) {
    this._id_fornecedor = value;
  }
  get id_produto() {
    return this._id_produto;
  }
  set id_produto(value) {
    this._id_produto = value;
  }
}

module.exports = FornecedorParaProdutoModel;