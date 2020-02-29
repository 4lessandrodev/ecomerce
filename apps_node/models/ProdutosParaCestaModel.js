class ProdutosParaCestaModel {
  constructor (id, id_produto, id_cesta) {
    this._id = id;
    this._id_produto = id_produto;
    this._id_cesta = id_cesta;
  }
  get id_produto() {
    return this._id_produto;
  }
  set id_produto(value) {
    this._id_produto = value;
  }
  get id_cesta() {
    return this._id_cesta;
  }
  set id_cesta(value) {
    this._id_cesta = value;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
}
module.exports = ProdutosParaCestaModel;