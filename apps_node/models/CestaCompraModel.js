class CestaCompraModel {
  constructor (id_cesta, id_compra) {
    this._id = null;
    this._id_cesta = id_cesta;
    this._id_compra = id_compra;
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

  get id_compra() {
    return this._id_compra;
  }
  set id_compra(value) {
    this._id_compra = value;
  }
}

module.exports = CestaCompraModel;