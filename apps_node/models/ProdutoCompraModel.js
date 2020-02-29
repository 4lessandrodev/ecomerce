class ProdutoCompraModel {
  constructor (id_produto, id_compra) {
    this._id = null;
    this._id_produto = id_produto;
    this._id_compra = id_compra;
  }
  get id_produto() {
    return this._id_produto;
  }
  set id_produto(value) {
    this._id_produto = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get id_compra() {
    return this._id_compra;
  }
  set id_compra(value) {
    this._id_compra = value;
  }
}

module.exports = ProdutoCompraModel;